# 🚀 SolveSphere AI

> **AI-Powered Problem Solving Platform** - Discover solutions, build the future

A comprehensive platform that helps developers, students, and founders discover real-world problems, find verified solutions, and convert challenges into innovative projects using AI.

## ✨ Features

### 🤖 AI-Powered Analysis
- **Problem Analysis**: Automatic categorization, difficulty assessment, and opportunity scoring
- **Solution Recommendations**: Personalized suggestions based on your profile
- **Project Generator**: Convert problems into startup ideas and projects
- **AI Chat Assistant**: Interactive help for problem-solving and technical guidance

### 🎯 Core Features
- **Problem Marketplace**: Browse and submit real-world problems
- **Solution Database**: Community-verified solutions with ratings
- **Smart Search**: Find problems, solutions, and tools instantly
- **User Dashboard**: Track your contributions, reputation, and badges
- **Marketplace**: Discover curated tools and frameworks

### 🔐 Security & Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Environment variable security

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API key (FREE!)

### Installation

1. **Clone and Install**
```bash
cd solvesphere-ai
npm install
```

2. **Get Gemini API Key**
- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Sign in and create API key (FREE, no credit card)
- Copy your API key

3. **Setup Environment**
```bash
cp .env.example .env
```

Edit `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/solvesphere-ai
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_random_secret_key
```

4. **Setup MongoDB**

**Option A: Local**
```bash
# Install from mongodb.com
# Start MongoDB service
mongosh  # Verify it's running
```

**Option B: Atlas (Cloud)**
- Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create cluster and get connection string
- Update `MONGODB_URI` in `.env`

5. **Run Development Server**
```bash
npm run dev
```

6. **Open Application**
```
http://localhost:3000
```

## 📚 Documentation

- **[QUICK_START.txt](QUICK_START.txt)** - Fast setup guide
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup instructions
- **[FIXES_APPLIED.md](FIXES_APPLIED.md)** - All fixes and improvements

## 🎯 What's Working

✅ **User Authentication**
- Sign up with role selection (Developer, Student, Founder)
- Secure login with JWT tokens
- Password hashing and validation

✅ **Problem Management**
- Submit problems with AI analysis
- Browse and filter problems
- AI-generated opportunity scores
- Automatic categorization and tagging

✅ **AI Features**
- Problem analysis with Gemini AI
- Solution recommendations
- Project idea generation
- Interactive chat assistant
- Tool comparisons

✅ **Dashboard**
- User statistics and reputation
- Saved solutions
- Project ideas
- Activity timeline
- Badge system

✅ **Marketplace**
- Browse curated tools
- Filter by category
- Rating system
- Save favorites

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **AI**: Google Gemini API
- **Authentication**: JWT, bcryptjs
- **Icons**: Lucide React

## 📁 Project Structure

```
solvesphere-ai/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── problems/     # Problem CRUD
│   │   ├── solutions/    # Solution CRUD
│   │   └── ai/           # AI features
│   ├── dashboard/        # User dashboard
│   ├── explore/          # Browse problems
│   ├── marketplace/      # Solution marketplace
│   ├── login/            # Login page
│   └── signup/           # Signup page
├── components/            # React components
│   ├── ui/               # UI components
│   └── features/         # Feature components
├── lib/                   # Utilities
│   ├── gemini.ts         # Gemini AI integration
│   ├── mongodb.ts        # Database connection
│   └── auth.ts           # Auth utilities
├── models/                # MongoDB models
│   ├── User.ts
│   ├── Problem.ts
│   ├── Solution.ts
│   └── TechFeed.ts
└── public/                # Static assets
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login

### Problems
- `GET /api/problems` - List problems (with filters)
- `POST /api/problems` - Submit problem
- `GET /api/problems/[id]` - Get problem details

### AI Features
- `POST /api/ai/analyze` - Analyze problem
- `POST /api/ai/recommend` - Get recommendations
- `POST /api/ai/chat` - Chat with AI

### Solutions
- `GET /api/solutions` - List solutions
- `POST /api/solutions` - Submit solution

## 🎨 Features in Detail

### Problem Analysis
When you submit a problem, AI analyzes:
- **Category**: AI/ML, Web Dev, Mobile, Blockchain, etc.
- **Difficulty**: Easy, Medium, Hard, Expert
- **Opportunity Score**: 6 metrics (0-100 each)
  - Startup Potential
  - Market Demand
  - Technical Difficulty
  - Monetization Chances
  - Innovation Level
  - Overall Score
- **Tags**: Automatic tag generation
- **Solutions**: Suggested approaches

### Solution Recommendations
Get personalized recommendations with:
- Multiple solution options
- Pros and cons analysis
- Best use cases
- Implementation difficulty
- Tool/framework suggestions

### Project Ideas
Convert problems into projects with:
- Catchy project names
- Detailed descriptions
- Tech stack recommendations
- Time estimates
- Resume impact score
- Hackathon suitability
- Business potential

## 🔧 Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `MONGODB_URI`
   - `GEMINI_API_KEY`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_API_URL`
   - `NODE_ENV=production`
4. Deploy!

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
GEMINI_API_KEY=your_production_api_key
JWT_SECRET=strong_random_secret_key
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NODE_ENV=production
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB is running
mongosh

# Verify connection string in .env
# For Atlas: Check IP whitelist and credentials
```

### Gemini API Issues
- Verify API key is correct
- Check no extra spaces in .env
- Ensure API key is enabled at Google AI Studio
- Free tier has rate limits (wait and retry)

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (developer/student/founder),
  reputation: Number,
  badges: [String],
  createdAt: Date
}
```

### Problems Collection
```javascript
{
  title: String,
  description: String,
  category: String,
  tags: [String],
  difficulty: String,
  aiOpportunityScore: {
    startupPotential: Number,
    marketDemand: Number,
    technicalDifficulty: Number,
    monetizationChances: Number,
    innovationLevel: Number,
    overall: Number
  },
  submittedBy: ObjectId,
  upvotes: Number,
  views: Number,
  isSolved: Boolean,
  isHighPotential: Boolean,
  createdAt: Date
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for powerful AI capabilities
- Next.js team for the amazing framework
- MongoDB for reliable database
- Tailwind CSS for beautiful styling
- Framer Motion for smooth animations

## 📧 Support

For issues and questions:
1. Check [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. Review [FIXES_APPLIED.md](FIXES_APPLIED.md)
3. Check troubleshooting section above

## 🎉 Recent Updates

### Latest Changes (v1.0.0)
- ✅ Replaced OpenAI with Google Gemini API
- ✅ Fixed all button functionality
- ✅ Fixed accessibility issues
- ✅ Enhanced error handling
- ✅ Added comprehensive documentation
- ✅ Improved AI response handling
- ✅ Added fallback mechanisms

---

**Made with ❤️ by Bob**

Start building amazing solutions today! 🚀
