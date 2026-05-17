import { NextRequest, NextResponse } from 'next/server';
import { generateProjectIdea } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { problemDescription, userType = 'developer' } = body;

    if (!problemDescription) {
      return NextResponse.json(
        { success: false, error: 'Problem description is required' },
        { status: 400 }
      );
    }

    const projectIdea = await generateProjectIdea(problemDescription, userType);

    return NextResponse.json({ success: true, data: projectIdea });
  } catch (error: any) {
    console.error('Error generating project idea:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate project idea' },
      { status: 500 }
    );
  }
}
