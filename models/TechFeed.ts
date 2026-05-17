import mongoose, { Schema, Document } from 'mongoose';

export interface ITechFeed extends Document {
  title: string;
  description: string;
  content: string;
  category: 'ai' | 'cybersecurity' | 'developer-tools' | 'automation' | 'startups' | 'apis' | 'research';
  tags: string[];
  url?: string;
  imageUrl?: string;
  source: string;
  author?: string;
  practicalUsefulness: number;
  upvotes: number;
  downvotes: number;
  views: number;
  saves: number;
  comments: {
    user: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
  }[];
  isTrending: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TechFeedSchema: Schema = new Schema(
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
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['ai', 'cybersecurity', 'developer-tools', 'automation', 'startups', 'apis', 'research'],
      required: true,
    },
    tags: [{
      type: String,
    }],
    url: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: '',
    },
    practicalUsefulness: {
      type: Number,
      min: 0,
      max: 100,
      default: 50,
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
    isTrending: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.TechFeed || mongoose.model<ITechFeed>('TechFeed', TechFeedSchema);

// Made with Bob
