import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export interface ProblemAnalysis {
  category: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  aiOpportunityScore: {
    startupPotential: number;
    marketDemand: number;
    technicalDifficulty: number;
    monetizationChances: number;
    innovationLevel: number;
    overall: number;
  };
  suggestedSolutions: string[];
  explanation: string;
}

export interface SolutionRecommendation {
  title: string;
  type: string;
  explanation: string;
  pros: string[];
  cons: string[];
  bestUseCases: string[];
  implementationDifficulty: string;
}

export async function analyzeProblem(problemDescription: string): Promise<ProblemAnalysis> {
  try {
    const prompt = `Analyze this problem and provide a detailed assessment:

Problem: ${problemDescription}

Provide a JSON response with:
1. category (e.g., "AI/ML", "Web Development", "Mobile", "DevOps", etc.)
2. tags (array of relevant tags)
3. difficulty (easy, medium, hard, or expert)
4. aiOpportunityScore with scores 0-100 for:
   - startupPotential
   - marketDemand
   - technicalDifficulty
   - monetizationChances
   - innovationLevel
   - overall (average of above)
5. suggestedSolutions (array of solution types)
6. explanation (why this problem matters and potential approaches)`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert problem analyzer for a tech platform. Provide detailed, accurate assessments in JSON format.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content || '{}');
  } catch (error) {
    console.error('Error analyzing problem:', error);
    throw error;
  }
}

export async function generateSolutionRecommendations(
  problemDescription: string,
  userProfile?: {
    role: string;
    skillLevel: string;
    budget?: string;
  }
): Promise<SolutionRecommendation[]> {
  try {
    const userContext = userProfile
      ? `User Profile: ${userProfile.role}, Skill Level: ${userProfile.skillLevel}, Budget: ${userProfile.budget || 'Not specified'}`
      : '';

    const prompt = `Generate solution recommendations for this problem:

Problem: ${problemDescription}
${userContext}

Provide a JSON array of 3-5 solution recommendations, each with:
1. title (name of the solution/tool/approach)
2. type (app, website, tool, workflow, ai-solution, automation, api, tutorial)
3. explanation (why this solution works)
4. pros (array of advantages)
5. cons (array of disadvantages)
6. bestUseCases (array of scenarios where this excels)
7. implementationDifficulty (easy, medium, hard, expert)

Consider the user's profile when making recommendations.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert solution architect. Provide practical, actionable recommendations in JSON format.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    const parsed = JSON.parse(content || '{}');
    return parsed.recommendations || [];
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
}

export async function generateProjectIdea(
  problem: string,
  userType: string
): Promise<{
  title: string;
  description: string;
  techStack: string[];
  difficulty: string;
  estimatedTime: string;
  resumeImpact: number;
  hackathonSuitability: number;
  businessPotential: number;
}> {
  try {
    const prompt = `Generate a project idea based on this problem for a ${userType}:

Problem: ${problem}

Provide a JSON response with:
1. title (catchy project name)
2. description (detailed project description)
3. techStack (array of technologies to use)
4. difficulty (beginner, intermediate, advanced, expert)
5. estimatedTime (e.g., "2-3 weeks")
6. resumeImpact (score 0-100)
7. hackathonSuitability (score 0-100)
8. businessPotential (score 0-100)`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a project idea generator for developers and students. Create practical, impressive project ideas in JSON format.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.9,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content || '{}');
  } catch (error) {
    console.error('Error generating project idea:', error);
    throw error;
  }
}

export async function compareSolutions(
  solution1: string,
  solution2: string
): Promise<{
  comparison: string;
  winner: string;
  reasoning: string;
}> {
  try {
    const prompt = `Compare these two solutions:

Solution 1: ${solution1}
Solution 2: ${solution2}

Provide a JSON response with:
1. comparison (detailed side-by-side comparison)
2. winner (which is better overall, or "tie")
3. reasoning (why one is better or why it's a tie)`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at comparing technical solutions objectively. Provide detailed comparisons in JSON format.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content || '{}');
  } catch (error) {
    console.error('Error comparing solutions:', error);
    throw error;
  }
}

export async function chatWithAssistant(
  message: string,
  conversationHistory: { role: string; content: string }[]
): Promise<string> {
  try {
    const messages = [
      {
        role: 'system' as const,
        content: 'You are SolveSphere AI Assistant, a helpful guide for finding solutions to problems, discovering tools, and generating project ideas. Be concise, practical, and friendly.',
      },
      ...conversationHistory.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.8,
      max_tokens: 500,
    });

    return response.choices[0].message.content || 'I apologize, but I could not generate a response.';
  } catch (error) {
    console.error('Error in chat:', error);
    throw error;
  }
}

export default openai;

// Made with Bob
