import mongoose, { Schema, Document } from 'mongoose';

export interface IProblem extends Document {
  title: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  industry: string;
  marketDemand: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  businessPotential: number;
  isSolved: boolean;
  isHighPotential: boolean;
  githubRepo?: string;
  deploymentLink?: string;
  bounty: string;
  estimatedMVPTime: string;
  suggestedTeamSize: string;
  revenuePotential: string;
  interestedDevelopers: number;
  teamsBuilding: number;
  realWorldImpact: string;
  targetAudience: string;
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
  submittedBy: mongoose.Types.ObjectId;
  solutions: mongoose.Types.ObjectId[];
  upvotes: number;
  downvotes: number;
  views: number;
  comments: {
    user: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProblemSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [{
      type: String,
    }],
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'expert'],
      default: 'medium',
    },
    industry: {
      type: String,
      required: true,
    },
    marketDemand: {
      type: Number,
      min: 0,
      max: 100,
      default: 50,
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    businessPotential: {
      type: Number,
      min: 0,
      max: 100,
      default: 50,
    },
    isSolved: {
      type: Boolean,
      default: false,
    },
    isHighPotential: {
      type: Boolean,
      default: false,
    },
    githubRepo: {
      type: String,
      default: '',
    },
    deploymentLink: {
      type: String,
      default: '',
    },
    bounty: {
      type: String,
      default: 'Community Challenge',
    },
    estimatedMVPTime: {
      type: String,
      default: '2-4 weeks',
    },
    suggestedTeamSize: {
      type: String,
      default: '1-3 developers',
    },
    revenuePotential: {
      type: String,
      default: 'Moderate',
    },
    interestedDevelopers: {
      type: Number,
      default: 0,
    },
    teamsBuilding: {
      type: Number,
      default: 0,
    },
    realWorldImpact: {
      type: String,
      default: '',
    },
    targetAudience: {
      type: String,
      default: '',
    },
    aiOpportunityScore: {
      seriousness: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
      },
      uniqueness: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
      },
      startupPotential: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
      },
      marketDemand: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
      },
      technicalComplexity: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
      },
      implementationFeasibility: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
      },
      innovationLevel: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
      },
      overall: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
      },
    },
    whyExistingSolutionsFail: {
      analysis: { type: String, default: '' },
      userFrustrations: [{ type: String }],
      missingFeatures: [{ type: String }],
      underservedAudiences: [{ type: String }],
      marketGaps: [{ type: String }],
    },
    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    solutions: [{
      type: Schema.Types.ObjectId,
      ref: 'Solution',
    }],
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
    comments: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Problem || mongoose.model<IProblem>('Problem', ProblemSchema);

// Made with Bob
