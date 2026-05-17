import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Solution from '@/models/Solution';

// GET /api/solutions - Get all solutions with filters
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const problemId = searchParams.get('problemId');
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const isVerified = searchParams.get('isVerified');
    const isFeatured = searchParams.get('isFeatured');
    const sortBy = searchParams.get('sortBy') || 'rating';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query
    const query: any = {};
    if (problemId) query.problemId = problemId;
    if (category && category !== 'all') query.category = category;
    if (type && type !== 'all') query.type = type;
    if (isVerified !== null) query.isVerified = isVerified === 'true';
    if (isFeatured !== null) query.isFeatured = isFeatured === 'true';

    // Build sort
    let sort: any = {};
    switch (sortBy) {
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'popular':
        sort = { popularity: -1 };
        break;
      case 'recent':
        sort = { createdAt: -1 };
        break;
      case 'trending':
        sort = { trendingScore: -1 };
        break;
      case 'success':
        sort = { workedForMePercentage: -1 };
        break;
      default:
        sort = { rating: -1 };
    }

    const skip = (page - 1) * limit;

    const solutions = await Solution.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('submittedBy', 'name avatar')
      .populate('problemId', 'title')
      .lean();

    const total = await Solution.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: solutions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching solutions:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/solutions - Create a new solution
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      problemId,
      title,
      description,
      type,
      category,
      tags,
      url,
      pricing,
      features,
      pros,
      cons,
      techStack,
      submittedBy,
    } = body;

    // Validate required fields
    if (!problemId || !title || !description || !type || !submittedBy) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create solution
    const solution = await Solution.create({
      problemId,
      title,
      description,
      type,
      category: category || 'General',
      tags: tags || [],
      url: url || '',
      pricing: pricing || { type: 'free' },
      features: features || [],
      pros: pros || [],
      cons: cons || [],
      techStack: techStack || [],
      submittedBy,
    });

    return NextResponse.json(
      { success: true, data: solution },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating solution:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Made with Bob
