import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import Problem from '@/models/Problem';
import '@/models/Solution';
import '@/models/User';

// GET /api/problems/[id] - Get a single problem
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const mockData: Record<string, any> = {
        'mock-1': {
            _id: 'mock-1',
            title: 'AI-Powered Legacy Code Migration Tool',
            description: 'Companies spend millions refactoring legacy systems (e.g., COBOL, old Java) to modern stacks. Current tools are too manual and error-prone.',
            category: 'Developer Tools',
            industry: 'Enterprise Software',
            difficulty: 'Expert',
            aiOpportunityScore: { overall: 94, startupPotential: 96, marketDemand: 98, technicalComplexity: 85, innovationLevel: 90 },
            estimatedMVPTime: '6-8 weeks',
            suggestedTeamSize: '3-5 developers',
            revenuePotential: 'High ($500k+ ARR)',
            realWorldImpact: 'Reduces enterprise modernization costs by 70%.',
            targetAudience: 'Enterprise CTOs',
            bounty: '$10,000 Hackathon Prize',
            interestedDevelopers: 342,
            teamsBuilding: 14,
            whyExistingSolutionsFail: { analysis: 'Legacy code is too unstructured for standard AST parsers. Current tools miss business logic edge cases, requiring heavy human intervention.', userFrustrations: ['Missed edge cases', 'Requires manual rewrites', 'High error rate'], marketGaps: ['True semantic understanding of legacy business logic'] },
            views: 4520,
            upvotes: 890,
        },
        'mock-2': {
            _id: 'mock-2',
            title: 'Hyper-Local Supply Chain Predictor for Retail',
            description: 'Small retailers struggle with inventory prediction during micro-trend shifts. Existing tools are designed only for massive retail chains.',
            category: 'AI/ML',
            industry: 'Retail Tech',
            difficulty: 'Medium',
            aiOpportunityScore: { overall: 89, startupPotential: 92, marketDemand: 85, technicalComplexity: 65, innovationLevel: 80 },
            estimatedMVPTime: '3-5 weeks',
            suggestedTeamSize: '2-3 developers',
            revenuePotential: 'Medium ($100k ARR)',
            realWorldImpact: 'Helps local businesses compete with Amazon logistics.',
            targetAudience: 'Small Retailers',
            bounty: 'Startup Accelerator Grant',
            interestedDevelopers: 215,
            teamsBuilding: 8,
            whyExistingSolutionsFail: { analysis: 'Enterprise tools like SAP are too expensive and complex. Simple POS systems lack predictive intelligence.', userFrustrations: ['Too expensive', 'Hard to configure', 'Requires data scientists'], marketGaps: ['Turn-key ML for mom-and-pop shops'] },
            views: 2100,
            upvotes: 450,
        },
        'mock-3': {
            _id: 'mock-3',
            title: 'Automated Regulatory Compliance API for FinTech',
            description: 'FinTech startups spend 30% of their seed funding just on legal and compliance tech. We need a Stripe-like API for regulatory clearance.',
            category: 'FinTech',
            industry: 'Finance',
            difficulty: 'Hard',
            aiOpportunityScore: { overall: 96, startupPotential: 98, marketDemand: 95, technicalComplexity: 90, innovationLevel: 85 },
            estimatedMVPTime: '8-12 weeks',
            suggestedTeamSize: '4-6 developers',
            revenuePotential: 'Massive ($1M+ ARR)',
            realWorldImpact: 'Lowers the barrier to entry for financial innovation.',
            targetAudience: 'FinTech Founders',
            bounty: 'VC Seed Opportunity',
            interestedDevelopers: 512,
            teamsBuilding: 24,
            whyExistingSolutionsFail: { analysis: 'Compliance is currently handled by expensive consulting firms or disjointed tools (KYC here, AML there).', userFrustrations: ['Fragmented vendor ecosystem', 'High integration costs', 'Slow legal reviews'], marketGaps: ['Unified, developer-first compliance API'] },
            views: 8900,
            upvotes: 1205,
        }
      };

      const fallback = mockData[id] || {
          _id: id,
          title: 'Explore Page Problem ' + id,
          description: 'This is a placeholder problem from the Explore page mock data.',
          category: 'AI/ML',
          industry: 'Software',
          aiOpportunityScore: { overall: 92, startupPotential: 88, marketDemand: 95, technicalComplexity: 75, innovationLevel: 80 },
          whyExistingSolutionsFail: { analysis: 'No existing solutions meet the criteria.', userFrustrations: ['Too manual', 'Error prone'], marketGaps: ['Lack of AI automation'] },
          bounty: 'Community Challenge',
      };

      return NextResponse.json({
        success: true,
        data: fallback
      });
    }

    await connectDB();

    const problem = await Problem.findById(id)
      .populate('submittedBy', 'name avatar email')
      .populate('solutions')
      .populate('comments.user', 'name avatar')
      .lean();

    if (!problem) {
      return NextResponse.json(
        { success: false, error: 'Problem not found' },
        { status: 404 }
      );
    }

    // Increment views
    await Problem.findByIdAndUpdate(id, { $inc: { views: 1 } });

    return NextResponse.json({ success: true, data: problem });
  } catch (error: any) {
    console.error('Error fetching problem:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/problems/[id] - Update a problem
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const body = await request.json();
    const updates = { ...body };
    delete updates._id;
    delete updates.createdAt;
    delete updates.updatedAt;

    const problem = await Problem.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!problem) {
      return NextResponse.json(
        { success: false, error: 'Problem not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: problem });
  } catch (error: any) {
    console.error('Error updating problem:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/problems/[id] - Delete a problem
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const problem = await Problem.findByIdAndDelete(id);

    if (!problem) {
      return NextResponse.json(
        { success: false, error: 'Problem not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Problem deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting problem:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PATCH /api/problems/[id] - Partial update (upvote, comment, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const body = await request.json();
    const { action, data } = body;

    let update: any = {};

    switch (action) {
      case 'upvote':
        update = { $inc: { upvotes: 1 } };
        break;
      case 'downvote':
        update = { $inc: { downvotes: 1 } };
        break;
      case 'comment':
        update = {
          $push: {
            comments: {
              user: data.userId,
              text: data.text,
              createdAt: new Date(),
            },
          },
        };
        break;
      case 'mark-solved':
        update = { $set: { isSolved: true } };
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    const problem = await Problem.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!problem) {
      return NextResponse.json(
        { success: false, error: 'Problem not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: problem });
  } catch (error: any) {
    console.error('Error updating problem:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Made with Bob
