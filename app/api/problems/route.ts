import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Problem from '@/models/Problem';
import { analyzeProblem } from '@/lib/gemini';

// GET /api/problems - Get all problems with filters
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const isSolved = searchParams.get('isSolved');
    const isHighPotential = searchParams.get('isHighPotential');
    const sortBy = searchParams.get('sortBy') || 'trending';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query
    const query: any = {};
    if (category && category !== 'all') query.category = category;
    if (difficulty && difficulty !== 'all') query.difficulty = difficulty;
    if (isSolved !== null) query.isSolved = isSolved === 'true';
    if (isHighPotential !== null) query.isHighPotential = isHighPotential === 'true';

    // Build sort
    let sort: any = {};
    switch (sortBy) {
      case 'recent':
        sort = { createdAt: -1 };
        break;
      case 'popular':
        sort = { upvotes: -1 };
        break;
      case 'opportunity':
        sort = { 'aiOpportunityScore.overall': -1 };
        break;
      case 'views':
        sort = { views: -1 };
        break;
      default:
        sort = { upvotes: -1, views: -1 };
    }

    const skip = (page - 1) * limit;

    const problems = await Problem.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('submittedBy', 'name avatar')
      .lean();

    const total = await Problem.countDocuments(query);

    // Provide realistic demo data if DB is empty
    if (total === 0) {
      return NextResponse.json({
        success: true,
        data: [
          {
            _id: 'mock-1',
            title: 'AI-Powered Legacy Code Migration Tool',
            description: 'Companies spend millions refactoring legacy systems (e.g., COBOL, old Java) to modern stacks. Current tools are too manual and error-prone.',
            category: 'Developer Tools',
            industry: 'Enterprise Software',
            difficulty: 'Expert',
            aiOpportunityScore: { overall: 94, startupPotential: 96, marketDemand: 98, technicalComplexity: 85 },
            estimatedMVPTime: '6-8 weeks',
            suggestedTeamSize: '3-5 developers',
            revenuePotential: 'High ($500k+ ARR)',
            realWorldImpact: 'Reduces enterprise modernization costs by 70%.',
            targetAudience: 'Enterprise CTOs',
            bounty: '$10,000 Hackathon Prize',
            interestedDevelopers: 342,
            teamsBuilding: 14,
            views: 4520,
            upvotes: 890,
            createdAt: new Date().toISOString()
          },
          {
            _id: 'mock-2',
            title: 'Hyper-Local Supply Chain Predictor for Retail',
            description: 'Small retailers struggle with inventory prediction during micro-trend shifts. Existing tools are designed only for massive retail chains.',
            category: 'AI/ML',
            industry: 'Retail Tech',
            difficulty: 'Medium',
            aiOpportunityScore: { overall: 89, startupPotential: 92, marketDemand: 85, technicalComplexity: 65 },
            estimatedMVPTime: '3-5 weeks',
            suggestedTeamSize: '2-3 developers',
            revenuePotential: 'Medium ($100k ARR)',
            realWorldImpact: 'Helps local businesses compete with Amazon logistics.',
            targetAudience: 'Small Retailers',
            bounty: 'Startup Accelerator Grant',
            interestedDevelopers: 215,
            teamsBuilding: 8,
            views: 2100,
            upvotes: 450,
            createdAt: new Date().toISOString()
          },
          {
            _id: 'mock-3',
            title: 'Automated Regulatory Compliance API for FinTech',
            description: 'FinTech startups spend 30% of their seed funding just on legal and compliance tech. We need a Stripe-like API for regulatory clearance.',
            category: 'FinTech',
            industry: 'Finance',
            difficulty: 'Hard',
            aiOpportunityScore: { overall: 96, startupPotential: 98, marketDemand: 95, technicalComplexity: 90 },
            estimatedMVPTime: '8-12 weeks',
            suggestedTeamSize: '4-6 developers',
            revenuePotential: 'Massive ($1M+ ARR)',
            realWorldImpact: 'Lowers the barrier to entry for financial innovation.',
            targetAudience: 'FinTech Founders',
            bounty: 'VC Seed Opportunity',
            interestedDevelopers: 512,
            teamsBuilding: 24,
            views: 8900,
            upvotes: 1205,
            createdAt: new Date().toISOString()
          }
        ],
        pagination: { page: 1, limit: 10, total: 3, pages: 1 },
      });
    }

    return NextResponse.json({
      success: true,
      data: problems,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching problems:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/problems - Create a new problem
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, description, category, tags, industry, submittedBy } = body;

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Duplicate detection
    const existingProblem = await Problem.findOne({
      $or: [
        { title: { $regex: title, $options: 'i' } },
        { description: { $regex: description, $options: 'i' } },
      ],
    });

    if (existingProblem) {
      return NextResponse.json({
        success: false,
        isDuplicate: true,
        error: 'A similar problem already exists. Please consider upvoting or collaborating on it.',
        existingProblem,
      }, { status: 409 });
    }

    // Use AI to analyze the problem
    let aiAnalysis;
    try {
      aiAnalysis = await analyzeProblem(description);
    } catch (aiError) {
      console.error('AI analysis failed:', aiError);
      // Continue without AI analysis
      aiAnalysis = {
        category: category || 'General',
        tags: tags || [],
        difficulty: 'medium',
        aiOpportunityScore: {
          seriousness: 50,
          uniqueness: 50,
          startupPotential: 50,
          marketDemand: 50,
          technicalComplexity: 50,
          implementationFeasibility: 50,
          innovationLevel: 50,
          overall: 50,
        },
        whyExistingSolutionsFail: {
          analysis: 'AI analysis failed.',
          userFrustrations: [],
          missingFeatures: [],
          underservedAudiences: [],
          marketGaps: [],
        },
      };
    }

    // Create problem
    const problem = await Problem.create({
      title,
      description,
      category: aiAnalysis.category || category,
      tags: aiAnalysis.tags || tags || [],
      difficulty: aiAnalysis.difficulty || 'medium',
      industry: industry || 'Technology',
      estimatedMVPTime: aiAnalysis.estimatedMVPTime || '2-4 weeks',
      suggestedTeamSize: aiAnalysis.suggestedTeamSize || '1-3 developers',
      revenuePotential: aiAnalysis.revenuePotential || 'Moderate',
      realWorldImpact: aiAnalysis.realWorldImpact || '',
      targetAudience: aiAnalysis.targetAudience || '',
      bounty: aiAnalysis.bounty || 'Community Challenge',
      aiOpportunityScore: aiAnalysis.aiOpportunityScore,
      whyExistingSolutionsFail: aiAnalysis.whyExistingSolutionsFail,
      submittedBy,
      isHighPotential: aiAnalysis.aiOpportunityScore?.overall >= 80,
    });

    return NextResponse.json(
      { success: true, data: problem },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating problem:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Made with Bob
