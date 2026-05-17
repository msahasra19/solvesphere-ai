import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Solution from '@/models/Solution';
import Problem from '@/models/Problem';
import { analyzeProblem, searchRealSolutions } from '@/lib/gemini';

// POST /api/search - Smart search for solutions or create problem
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Step 1: Search for existing solutions
    const solutions = await Solution.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
        { category: { $regex: query, $options: 'i' } },
      ],
    })
      .sort({ rating: -1, workedForMe: -1 })
      .limit(10);

    // Step 2: If solutions found, return them
    if (solutions.length > 0) {
      return NextResponse.json({
        success: true,
        type: 'solutions_found',
        data: {
          solutions,
          count: solutions.length,
          message: `Found ${solutions.length} solution(s) for "${query}"`,
        },
      });
    }

    // Step 3: No solutions in database - search for real solutions using AI
    console.log('No solutions in database, searching for real solutions...');
    const realSolutionsResult = await searchRealSolutions(query);
    
    if (realSolutionsResult.foundSolutions && realSolutionsResult.solutions.length > 0) {
      return NextResponse.json({
        success: true,
        type: 'real_solutions_found',
        data: {
          solutions: realSolutionsResult.solutions,
          count: realSolutionsResult.solutions.length,
          message: `Found ${realSolutionsResult.solutions.length} real-world solution(s) for "${query}"`,
          note: 'These are existing tools/platforms that solve this problem',
        },
      });
    }

    // Step 4: No real solutions found - check if problem already exists
    const existingProblem = await Problem.findOne({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    if (existingProblem) {
      return NextResponse.json({
        success: true,
        type: 'problem_exists',
        data: {
          problem: existingProblem,
          message: `No solutions yet, but this problem already exists in our marketplace`,
        },
      });
    }

    // Step 5: Create new problem with AI analysis
    console.log('Creating new problem with AI analysis...');
    const analysis = await analyzeProblem(query);

    const newProblem = await Problem.create({
      title: query,
      description: `Looking for solutions related to: ${query}`,
      category: analysis.category,
      tags: analysis.tags,
      difficulty: analysis.difficulty,
      aiOpportunityScore: analysis.aiOpportunityScore,
      whyExistingSolutionsFail: analysis.whyExistingSolutionsFail,
      suggestedSolutions: analysis.suggestedSolutions,
      industry: 'Technology',
      marketDemand: analysis.aiOpportunityScore.marketDemand,
      urgency: 'medium',
      businessPotential: analysis.aiOpportunityScore.startupPotential,
      solutions: [],
      upvotes: 0,
      downvotes: 0,
      views: 1,
      comments: [],
      isSolved: false,
      isHighPotential: analysis.aiOpportunityScore.overall >= 80,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      type: 'problem_created',
      data: {
        problem: newProblem,
        analysis,
        message: `No existing solutions found. We've added this as a problem in our marketplace!`,
        suggestion: `This could be a great opportunity! AI Opportunity Score: ${analysis.aiOpportunityScore.overall}/100`,
      },
    });
  } catch (error: any) {
    console.error('Error in smart search:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Search failed' },
      { status: 500 }
    );
  }
}

// Made with Bob
