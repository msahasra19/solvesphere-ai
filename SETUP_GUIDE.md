# SolveSphere AI - Complete Setup Guide

## 🚀 Quick Start

This guide will help you set up and run the SolveSphere AI platform with full functionality.

## Prerequisites

- Node.js 18+ installed
- MongoDB installed and running (or MongoDB Atlas account)
- Google Gemini API key (free from Google AI Studio)

## Step 1: Install Dependencies

```bash
cd solvesphere-ai
npm install
```

## Step 2: Set Up Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` file with your actual values:

```env
# MongoDB Connection
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/solvesphere-ai

# Option 2: MongoDB Atlas (recommended)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/solvesphere-ai

# Google Gemini API Key
# Get your free API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_actual_gemini_api_key_here

# JWT Secret (change this to a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

## Step 3: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key and paste it in your `.env` file

**Note:** Gemini API has a generous free tier with no credit card required!

## Step 4: Set Up MongoDB

### Option A: Local MongoDB (Recommended for Development)

1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically as a service
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

3. Verify MongoDB is running:
```bash
mongosh
```

### Option B: MongoDB Atlas (Cloud - Recommended for Production)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `MONGODB_URI` in `.env`

## Step 5: Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🎯 Features & How to Use Them

### 1. User Authentication
- **Sign Up**: Create a new account at `/signup`
- **Login**: Access your account at `/login`
- User data is securely stored in MongoDB with hashed passwords

### 2. Problem Submission
- Navigate to the home page
- Click "Submit a Problem" or use the problem submission form
- AI will automatically analyze and categorize your problem
- View AI-generated opportunity scores and insights

### 3. Explore Problems
- Go to `/explore` to browse all submitted problems
- Filter by category, difficulty, and status
- Sort by trending, recent, or opportunity score
- Click on any problem to view details and solutions

### 4. AI-Powered Features

#### Problem Analysis
- Automatic categorization
- Difficulty assessment
- Opportunity scoring (startup potential, market demand, etc.)
- Suggested solution approaches

#### Solution Recommendations
- Get AI-powered solution suggestions
- Personalized based on your role and skill level
- Pros/cons analysis for each solution
- Implementation difficulty ratings

#### AI Chat Assistant
- Ask questions about problems and solutions
- Get project ideas and recommendations
- Receive technical guidance
- Available throughout the platform

### 5. Dashboard
- Track your activity and contributions
- View saved solutions
- Access personalized project ideas
- Monitor your reputation and badges

### 6. Marketplace
- Browse curated tools and solutions
- Filter by category and type
- Save favorites for later
- Get AI recommendations

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error: "MongooseServerSelectionError"**
- Ensure MongoDB is running: `mongosh` should connect successfully
- Check your `MONGODB_URI` in `.env`
- For Atlas: Verify IP whitelist and credentials

### Gemini API Issues

**Error: "API key not valid"**
- Verify your API key is correct in `.env`
- Ensure no extra spaces or quotes around the key
- Check API key is enabled at [Google AI Studio](https://makersuite.google.com/app/apikey)

**Error: "Rate limit exceeded"**
- Gemini free tier has rate limits
- Wait a few minutes and try again
- Consider upgrading to paid tier for higher limits

### Build/Runtime Errors

**Error: "Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: "Port 3000 already in use"**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

## 🧪 Testing the Application

### Test User Authentication
1. Go to `/signup`
2. Create a test account
3. Login at `/login`
4. Verify you're redirected to dashboard

### Test Problem Submission
1. Click "Submit Problem" on home page
2. Fill in problem details
3. Submit and wait for AI analysis
4. Verify problem appears in `/explore`

### Test AI Features
1. Submit a problem and check AI analysis
2. Use the AI chat feature
3. Request solution recommendations
4. Generate project ideas

## 📊 Database Schema

The application uses the following MongoDB collections:

- **users**: User accounts and profiles
- **problems**: Submitted problems with AI analysis
- **solutions**: Solution submissions and recommendations
- **techfeeds**: Curated tech news and updates

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `MONGODB_URI` (use MongoDB Atlas)
- `GEMINI_API_KEY`
- `JWT_SECRET` (use a strong random string)
- `NEXT_PUBLIC_API_URL` (your production URL)
- `NODE_ENV=production`

## 🔐 Security Best Practices

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use strong JWT_SECRET** - Generate with: `openssl rand -base64 32`
3. **Enable MongoDB authentication** in production
4. **Use HTTPS** in production
5. **Rotate API keys** regularly
6. **Set up rate limiting** for API routes

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

### Problems
- `GET /api/problems` - List all problems (with filters)
- `POST /api/problems` - Submit new problem
- `GET /api/problems/[id]` - Get problem details

### AI Features
- `POST /api/ai/analyze` - Analyze a problem
- `POST /api/ai/recommend` - Get solution recommendations
- `POST /api/ai/chat` - Chat with AI assistant

### Solutions
- `GET /api/solutions` - List solutions
- `POST /api/solutions` - Submit solution

## 🎨 Customization

### Modify AI Prompts
Edit `/lib/gemini.ts` to customize AI behavior and responses

### Change Styling
- Global styles: `/app/globals.css`
- Tailwind config: `/tailwind.config.ts`
- Component styles: Individual component files

### Add New Features
1. Create API route in `/app/api/`
2. Create page in `/app/`
3. Add components in `/components/`
4. Update models in `/models/` if needed

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 🆘 Getting Help

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review error messages in the console
3. Check MongoDB and API key configuration
4. Verify all dependencies are installed
5. Ensure environment variables are set correctly

## 🎉 You're All Set!

Your SolveSphere AI platform should now be fully functional with:
- ✅ User authentication
- ✅ Problem submission and exploration
- ✅ AI-powered analysis and recommendations
- ✅ Interactive dashboard
- ✅ Solution marketplace
- ✅ AI chat assistant

Start exploring and building amazing solutions!

---

**Made with ❤️ by Bob**