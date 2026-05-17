import { NextRequest, NextResponse } from 'next/server';
import { chatWithAssistant } from '@/lib/gemini';

// POST /api/ai/chat - Chat with AI assistant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = await chatWithAssistant(
      message,
      conversationHistory || []
    );

    return NextResponse.json({
      success: true,
      data: { response },
    });
  } catch (error: any) {
    console.error('Error in AI chat:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to get AI response' },
      { status: 500 }
    );
  }
}

// Made with Bob
