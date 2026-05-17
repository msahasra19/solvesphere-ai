import mongoose, { Schema, Document } from 'mongoose';

export interface ISolution extends Document {
  problemId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  type: 'app' | 'website' | 'tool' | 'workflow' | 'ai-solution' | 'automation' | 'api' | 'tutorial';
  category: string;
  tags: string[];
  url?: string;
  pricing: {
    type: 'free' | 'freemium' | 'paid' | 'subscription' | 'one-time';
    amount?: string;
    details?: string;
  };
  features: string[];
  pros: string[];
  cons: string[];
  beginnerFriendly: boolean;
  implementationDifficulty: 'easy' | 'medium' | 'hard' | 'expert';
  implementationSteps: string[];
  recommendedAPIs: string[];
  estimatedCost: string;
  deploymentSuggestions: string;
  monetizationPotential: string;
  targetUsers: string[];
  competitors: string[];
  challenges: string[];
  scalabilityDifficulty: string;
  realWorldUseCases: string[];
  bestUseCases: string[];
  techStack: string[];
  aiExplanation: string;
  rating: number;
  workedForMePercentage: number;
  totalReviews: number;
  reviews: {
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    workedForMe: boolean;
    implementationProof?: string;
    createdAt: Date;
  }[];
  screenshots: string[];
  videos: string[];
  tutorialLinks: string[];
  apiDocumentation?: string;
  githubRepo?: string;
  community?: string;
  popularity: number;
  trendingScore: number;
  submittedBy: mongoose.Types.ObjectId;
  upvotes: number;
  downvotes: number;
  views: number;
  saves: number;
  isVerified: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SolutionSchema: Schema = new Schema(
  {
    problemId: {
      type: Schema.Types.ObjectId,
      ref: 'Problem',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['app', 'website', 'tool', 'workflow', 'ai-solution', 'automation', 'api', 'tutorial'],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [{
      type: String,
    }],
    url: {
      type: String,
      default: '',
    },
    pricing: {
      type: {
        type: String,
        enum: ['free', 'freemium', 'paid', 'subscription', 'one-time'],
        default: 'free',
      },
      amount: String,
      details: String,
    },
    features: [{
      type: String,
    }],
    pros: [{
      type: String,
    }],
    cons: [{
      type: String,
    }],
    beginnerFriendly: {
      type: Boolean,
      default: true,
    },
    implementationDifficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'expert'],
      default: 'medium',
    },
    implementationSteps: [{ type: String }],
    recommendedAPIs: [{ type: String }],
    estimatedCost: { type: String, default: '' },
    deploymentSuggestions: { type: String, default: '' },
    monetizationPotential: { type: String, default: '' },
    targetUsers: [{ type: String }],
    competitors: [{ type: String }],
    challenges: [{ type: String }],
    scalabilityDifficulty: { type: String, default: 'medium' },
    realWorldUseCases: [{ type: String }],
    bestUseCases: [{
      type: String,
    }],
    techStack: [{
      type: String,
    }],
    aiExplanation: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    workedForMePercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    reviews: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
      comment: String,
      workedForMe: Boolean,
      implementationProof: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    screenshots: [{
      type: String,
    }],
    videos: [{
      type: String,
    }],
    tutorialLinks: [{
      type: String,
    }],
    apiDocumentation: {
      type: String,
      default: '',
    },
    githubRepo: {
      type: String,
      default: '',
    },
    community: {
      type: String,
      default: '',
    },
    popularity: {
      type: Number,
      default: 0,
    },
    trendingScore: {
      type: Number,
      default: 0,
    },
    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    saves: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Solution || mongoose.model<ISolution>('Solution', SolutionSchema);

// Made with Bob
