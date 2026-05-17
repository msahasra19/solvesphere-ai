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



**Made with ❤️ by Bob**

Start building amazing solutions today! 🚀
