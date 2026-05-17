import { NextRequest, NextResponse } from 'next/server';
import { generateSolutionRecommendations } from '@/lib/gemini';

// POST /api/ai/recommend - Get AI-powered solution recommendations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { problemDescription, userProfile } = body;

    if (!problemDescription) {
      return NextResponse.json(
        { success: false, error: 'Problem description is required' },
        { status: 400 }
      );
    }

    const recommendations = await generateSolutionRecommendations(
      problemDescription,
      userProfile
    );

    return NextResponse.json({
      success: true,
      data: recommendations,
    });
  } catch (error: any) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}

// Made with Bob
