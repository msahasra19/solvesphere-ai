import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

function extractJsonFromText(text: string): any {
  try {
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1].trim());
    }
    const rawMatch = text.match(/\{[\s\S]*\}/);
    if (rawMatch) {
      return JSON.parse(rawMatch[0].trim());
    }
    return JSON.parse(text.trim());
  } catch (error) {
    console.error('Failed to parse JSON from AI response:', text);
    throw error;
  }
}

export interface ProblemAnalysis {
  category: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  estimatedMVPTime: string;
  suggestedTeamSize: string;
  revenuePotential: string;
  realWorldImpact: string;
  targetAudience: string;
  bounty: string;
  aiOpportunityScore: {
    seriousness: number;
    uniqueness: number;
    startupPotential: number;
    marketDemand: number;
    technicalComplexity: number;
    implementationFeasibility: number;
    innovationLevel: number;
    overall: number;
  };
  whyExistingSolutionsFail: {
    analysis: string;
    userFrustrations: string[];
    missingFeatures: string[];
    underservedAudiences: string[];
    marketGaps: string[];
  };
  suggestedSolutions: string[];
  explanation: string;
}

export interface SolutionRecommendation {
  title: string;
  type: string;
  explanation: string;
  implementationSteps: string[];
  recommendedAPIs: string[];
  estimatedCost: string;
  techStack: string[];
  deploymentSuggestions: string;
  monetizationPotential: string;
  targetUsers: string[];
  competitors: string[];
  challenges: string[];
  scalabilityDifficulty: string;
  realWorldUseCases: string[];
  pros: string[];
  cons: string[];
  bestUseCases: string[];
  implementationDifficulty: string;
}

export async function analyzeProblem(problemDescription: string): Promise<ProblemAnalysis> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are a world-class startup advisor, tech market analyst, and realistic innovator. Deeply analyze this problem/search query and provide a highly intelligent, actionable, and specific assessment.

Problem/Query: "${problemDescription}"

IMPORTANT INSTRUCTIONS:
1. Conduct a rigorous "Why Existing Solutions Fail" analysis. Identify user frustrations, missing features, and underserved audiences. Do not gloss over existing alternatives.
2. If this is a COMMON problem with MANY existing solutions (like "food ordering app", "chatbot", "todo app"), give LOW scores (20-40) for uniqueness and innovation.
3. If this is a UNIQUE/INNOVATIVE problem with FEW solutions, give HIGH scores (70-90).
4. Be specific and practical. Don't use vague language.

Provide a JSON response strictly adhering to this structure:
{
  "category": "e.g., AI/ML, Web Development, HealthTech",
  "tags": ["array", "of", "specific", "tags"],
  "difficulty": "easy, medium, hard, or expert",
  "estimatedMVPTime": "e.g., 2-4 weeks",
  "suggestedTeamSize": "e.g., 1-3 developers",
  "revenuePotential": "e.g., High, $10k ARR, Medium",
  "realWorldImpact": "Short concise statement of why this matters and the scale of the issue",
  "targetAudience": "Specific affected audience",
  "bounty": "e.g., Hackathon Bounty, $500 Reward Pool, Startup Research Grant",
  "aiOpportunityScore": {
    "seriousness": 0-100,
    "uniqueness": 0-100,
    "startupPotential": 0-100,
    "marketDemand": 0-100,
    "technicalComplexity": 0-100,
    "implementationFeasibility": 0-100,
    "innovationLevel": 0-100,
    "overall": 0-100 (average of above)
  },
  "whyExistingSolutionsFail": {
    "analysis": "Detailed explanation of why current apps/tools fail or where they fall short",
    "userFrustrations": ["specific frustration 1", "specific frustration 2"],
    "missingFeatures": ["missing feature 1", "missing feature 2"],
    "underservedAudiences": ["audience 1", "audience 2"],
    "marketGaps": ["market gap 1", "market gap 2"]
  },
  "suggestedSolutions": ["Specific existing tool 1", "Specific existing tool 2", "Or detailed approach if new"],
  "explanation": "HONEST assessment of the market and competition"
}

Return ONLY valid JSON, no markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return extractJsonFromText(text);
  } catch (error) {
    console.error('Error analyzing problem:', error);
    // Return default analysis if AI fails
    return {
      category: 'General',
      tags: ['technology', 'innovation'],
      difficulty: 'medium',
      estimatedMVPTime: '2-4 weeks',
      suggestedTeamSize: '1-3 developers',
      revenuePotential: 'Moderate',
      realWorldImpact: 'Provides a standard solution to a common problem.',
      targetAudience: 'General users',
      bounty: 'Community Challenge',
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
        analysis: 'Analysis failed.',
        userFrustrations: [],
        missingFeatures: [],
        underservedAudiences: [],
        marketGaps: [],
      },
      suggestedSolutions: ['Research existing solutions', 'Build custom solution', 'Use existing tools'],
      explanation: 'This problem requires further analysis to determine the best approach.',
    };
  }
}

export async function searchRealSolutions(query: string): Promise<{
  foundSolutions: boolean;
  solutions: Array<{
    title: string;
    description: string;
    url: string;
    type: string;
    pricing: string;
    rating: number;
  }>;
}> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Search your knowledge base for REAL, EXISTING solutions/tools/apps for this query:

Query: "${query}"

Find 3-5 REAL solutions that actually exist. Include:
- Popular apps/websites (like Uber Eats for food delivery)
- Well-known tools (like GitHub for code hosting)
- Established platforms (like Shopify for e-commerce)

Provide a JSON response with:
{
  "foundSolutions": true/false,
  "solutions": [
    {
      "title": "Actual product name",
      "description": "What it does",
      "url": "Real website URL if known, or empty string",
      "type": "app/website/tool/platform",
      "pricing": "free/freemium/paid",
      "rating": 4.5 (realistic rating out of 5)
    }
  ]
}

ONLY include solutions that ACTUALLY EXIST. If you're not sure, set foundSolutions to false.
For common queries like "food ordering", "chatbot", "todo app" - you MUST find real solutions.

Return ONLY valid JSON, no markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return extractJsonFromText(text);
  } catch (error) {
    console.error('Error searching real solutions:', error);
    return {
      foundSolutions: false,
      solutions: [],
    };
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
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const userContext = userProfile
      ? `User Profile: ${userProfile.role}, Skill Level: ${userProfile.skillLevel}, Budget: ${userProfile.budget || 'Not specified'}`
      : '';

    const prompt = `You are a world-class tech lead and startup advisor. Generate highly actionable, specific, and implementation-focused solution recommendations for this problem in JSON format. Avoid vague language like "Use React and Node.js." Be specific about architecture, services, and strategies.

Problem: ${problemDescription}
${userContext}

Provide a JSON object with a "recommendations" array containing 3-5 solution recommendations, each with:
1. title (name of the specific solution/approach)
2. type (app, website, tool, workflow, ai-solution, automation, api, tutorial)
3. explanation (why this solution works and how it solves the root cause)
4. implementationSteps (array of specific, actionable steps to build it)
5. recommendedAPIs (array of specific APIs to use)
6. estimatedCost (estimated monthly cost for MVP, e.g., "$0-50/mo")
7. techStack (array of specific technologies, e.g., "Next.js 14", "PostgreSQL", "Tailwind CSS")
8. deploymentSuggestions (specific platforms, e.g., "Vercel + Supabase")
9. monetizationPotential (how to make money from this)
10. targetUsers (array of specific user personas)
11. competitors (array of existing competitors in this exact space)
12. challenges (array of technical or market challenges to anticipate)
13. scalabilityDifficulty (easy, medium, hard, expert - and briefly why)
14. realWorldUseCases (array of specific real-world scenarios)
15. pros (array of specific advantages)
16. cons (array of specific disadvantages)
17. bestUseCases (array of scenarios where this architecture excels)
18. implementationDifficulty (easy, medium, hard, expert)

Return ONLY valid JSON, no markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const parsed = extractJsonFromText(text);
    return parsed.recommendations || [];
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
}

export async function generateProjectIdea(
  problem: string,
  userType: string
): Promise<{
  title: string;
  description: string;
  recommendedArchitecture: string;
  frontendBackendStack: string[];
  apisAndAI: string[];
  databaseAndAuth: string[];
  deploymentStrategy: string;
  mvpRoadmap: string[];
  monetizationStrategy: string;
  scalabilityStrategy: string;
  difficulty: string;
  estimatedTime: string;
  resumeImpact: number;
  hackathonSuitability: number;
  businessPotential: number;
}> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Generate a project idea based on this problem for a ${userType} in JSON format:

Problem: ${problem}

Provide a JSON response with:
1. title (catchy project name)
2. description (detailed project description)
3. recommendedArchitecture (e.g., "Microservices with event-driven... " or "Monolithic Next.js with serverless... ")
4. frontendBackendStack (array of technologies like "Next.js", "Node.js")
5. apisAndAI (array of 3rd party APIs and AI models to use)
6. databaseAndAuth (array of DBs and auth methods, e.g., "PostgreSQL", "Clerk")
7. deploymentStrategy (e.g., "Vercel for frontend, AWS ECS for backend")
8. mvpRoadmap (array of 4-6 specific actionable steps to build the MVP)
9. monetizationStrategy (how to make money from this)
10. scalabilityStrategy (how to scale this to 10k users)
11. difficulty (beginner, intermediate, advanced, expert)
12. estimatedTime (e.g., "2-3 weeks")
13. resumeImpact (score 0-100)
14. hackathonSuitability (score 0-100)
15. businessPotential (score 0-100)

Return ONLY valid JSON, no markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return extractJsonFromText(text);
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
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Compare these two solutions in JSON format:

Solution 1: ${solution1}
Solution 2: ${solution2}

Provide a JSON response with:
1. comparison (detailed side-by-side comparison)
2. winner (which is better overall, or "tie")
3. reasoning (why one is better or why it's a tie)

Return ONLY valid JSON, no markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return extractJsonFromText(text);
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
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const chat = model.startChat({
      history: conversationHistory.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.8,
      },
    });

    const systemPrompt = 'You are SolveSphere AI Assistant, a helpful guide for finding solutions to problems, discovering tools, and generating project ideas. Be concise, practical, and friendly.';
    const fullMessage = conversationHistory.length === 0 
      ? `${systemPrompt}\n\nUser: ${message}` 
      : message;

    const result = await chat.sendMessage(fullMessage);
    const response = await result.response;
    return response.text() || 'I apologize, but I could not generate a response.';
  } catch (error) {
    console.error('Error in chat:', error);
    throw error;
  }
}

export default genAI;

// Made with Bob