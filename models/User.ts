import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'developer' | 'founder' | 'researcher' | 'company';
  avatar?: string;
  bio?: string;
  skills: string[];
  budget?: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  goals: string[];
  reputation: number;
  badges: string[];
  savedSolutions: mongoose.Types.ObjectId[];
  followedTopics: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'developer', 'founder', 'researcher', 'company'],
      default: 'developer',
    },
    avatar: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    skills: [{
      type: String,
    }],
    budget: {
      type: String,
      default: '',
    },
    skillLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'intermediate',
    },
    goals: [{
      type: String,
    }],
    reputation: {
      type: Number,
      default: 0,
    },
    badges: [{
      type: String,
    }],
    savedSolutions: [{
      type: Schema.Types.ObjectId,
      ref: 'Solution',
    }],
    followedTopics: [{
      type: String,
    }],
    githubUrl: {
      type: String,
      default: '',
    },
    linkedinUrl: {
      type: String,
      default: '',
    },
    websiteUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// Made with Bob
