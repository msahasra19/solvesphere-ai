import { NextRequest, NextResponse } from 'next/server';
import { analyzeProblem } from '@/lib/gemini';

// POST /api/ai/analyze - Analyze a problem using AI
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { problemDescription } = body;

    if (!problemDescription) {
      return NextResponse.json(
        { success: false, error: 'Problem description is required' },
        { status: 400 }
      );
    }

    const analysis = await analyzeProblem(problemDescription);

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error: any) {
    console.error('Error analyzing problem:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to analyze problem' },
      { status: 500 }
    );
  }
}

// Made with Bob
