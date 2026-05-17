# Testing Guide for SolveSphere AI

This guide will help you test the application locally before deployment.

## 🚀 Quick Start

### 1. Prerequisites

Make sure you have installed:
- **Node.js 18+** - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) OR use MongoDB Atlas (cloud)
- **Git** - [Download](https://git-scm.com/)

### 2. Setup Steps

#### Step 1: Navigate to Project Directory
```bash
cd solvesphere-ai
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Configure Environment Variables

Edit the `.env` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/solvesphere-ai
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/solvesphere-ai

# OpenAI API Key (Get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-your-actual-openai-api-key

# JWT Secret (any random string)
JWT_SECRET=your-super-secret-jwt-key-12345

# API URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Environment
NODE_ENV=development
```

#### Step 4: Start MongoDB (if using local MongoDB)

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**Mac/Linux:**
```bash
# Start MongoDB
brew services start mongodb-community
# OR
sudo systemctl start mongod
```

**Using MongoDB Atlas (Cloud - Recommended for Testing):**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

#### Step 5: Start Development Server
```bash
npm run dev
```

The application will start at: **http://localhost:3000**

## 🧪 Testing Checklist

### ✅ Frontend Testing

#### 1. Landing Page (/)
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] Search bar is functional
- [ ] Stats section shows numbers
- [ ] Features section displays all 6 features
- [ ] Trending problems section loads
- [ ] Top solutions section displays
- [ ] Testimonials section shows
- [ ] Footer displays correctly
- [ ] Navigation menu works
- [ ] All animations are smooth
- [ ] Responsive on mobile (resize browser)

#### 2. Explore Page (/explore)
- [ ] Page loads successfully
- [ ] Search input works
- [ ] Category filters work
- [ ] Sort dropdown functions
- [ ] Problem cards display correctly
- [ ] AI opportunity scores show
- [ ] Badges display properly
- [ ] "Load More" button works
- [ ] Hover effects work
- [ ] Mobile responsive

#### 3. Marketplace Page (/marketplace)
- [ ] Page loads without errors
- [ ] Stats display correctly
- [ ] Search functionality works
- [ ] Category filters function
- [ ] Problem cards show bounties
- [ ] Opportunity scores display
- [ ] "Express Interest" button works
- [ ] "View Details" button works
- [ ] CTA section displays
- [ ] Mobile responsive

#### 4. Dashboard Page (/dashboard)
- [ ] Page loads successfully
- [ ] User stats display
- [ ] Badges section shows
- [ ] Tabs switch correctly (Overview, Saved, Projects, Activity)
- [ ] Saved solutions display
- [ ] Project ideas show
- [ ] Activity feed displays
- [ ] Quick actions work
- [ ] Mobile responsive

### ✅ API Testing

You can test APIs using:
- Browser DevTools (Network tab)
- Postman
- cURL commands

#### Test Problems API

**Get All Problems:**
```bash
curl http://localhost:3000/api/problems
```

**Create a Problem:**
```bash
curl -X POST http://localhost:3000/api/problems \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Problem",
    "description": "This is a test problem for AI analysis",
    "category": "AI/ML",
    "industry": "Technology",
    "submittedBy": "test-user-id"
  }'
```

#### Test AI APIs

**Analyze Problem:**
```bash
curl -X POST http://localhost:3000/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "problemDescription": "How to build a real-time chat application with AI"
  }'
```

**Get Recommendations:**
```bash
curl -X POST http://localhost:3000/api/ai/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "problemDescription": "Need a solution for code review automation",
    "userProfile": {
      "role": "developer",
      "skillLevel": "intermediate",
      "budget": "free"
    }
  }'
```

**Chat with AI:**
```bash
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the best AI tools for developers?",
    "conversationHistory": []
  }'
```

### ✅ Component Testing

#### AI Chat Component
- [ ] Chat button appears in bottom-right
- [ ] Clicking opens chat window
- [ ] Can type messages
- [ ] Send button works
- [ ] Quick actions work
- [ ] Messages display correctly
- [ ] Loading state shows
- [ ] Close button works
- [ ] Scrolling works
- [ ] Mobile responsive

#### UI Components
- [ ] Buttons render correctly
- [ ] Cards display properly
- [ ] Inputs accept text
- [ ] Badges show colors
- [ ] Hover effects work
- [ ] Animations are smooth

### ✅ Performance Testing

1. **Page Load Speed**
   - Open DevTools → Network tab
   - Reload page
   - Check load time (should be < 3 seconds)

2. **Lighthouse Score**
   - Open DevTools → Lighthouse tab
   - Run audit
   - Check scores (aim for 80+)

3. **Mobile Performance**
   - Open DevTools → Device toolbar
   - Test on different devices
   - Check responsiveness

### ✅ Browser Compatibility

Test on:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (if on Mac)
- [ ] Mobile browsers

## 🐛 Common Issues & Solutions

### Issue 1: MongoDB Connection Error
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- Make sure MongoDB is running
- Check connection string in `.env`
- Try using MongoDB Atlas instead

### Issue 2: OpenAI API Error
**Error:** `Error: Invalid API key`

**Solution:**
- Get a valid API key from [OpenAI](https://platform.openai.com/api-keys)
- Update `OPENAI_API_KEY` in `.env`
- Restart the dev server

### Issue 3: Port Already in Use
**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# OR use a different port:
npm run dev -- -p 3001
```

### Issue 4: Module Not Found
**Error:** `Cannot find module 'xyz'`

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 5: Build Errors
**Error:** TypeScript or build errors

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📊 Testing Without OpenAI API

If you don't have an OpenAI API key yet, you can still test:

1. **Frontend Pages** - All pages will load and display correctly
2. **UI Components** - All components work independently
3. **Navigation** - All navigation works
4. **Animations** - All animations and effects work

**AI Features will show errors** - This is expected without a valid API key.

To test without AI:
- Comment out AI API calls in the code
- Use mock data instead
- Focus on UI/UX testing

## 🔍 Debug Mode

Enable detailed logging:

```bash
# Add to .env
DEBUG=*
NODE_ENV=development
```

Check browser console for:
- Network requests
- Error messages
- Component renders
- State changes

## ✅ Pre-Deployment Checklist

Before deploying:
- [ ] All pages load without errors
- [ ] No console errors
- [ ] All links work
- [ ] Forms submit correctly
- [ ] API endpoints respond
- [ ] Mobile responsive
- [ ] Images load
- [ ] Animations work
- [ ] Environment variables set
- [ ] Build succeeds (`npm run build`)
- [ ] Production build works (`npm start`)

## 🚀 Build for Production

Test production build locally:

```bash
# Build the application
npm run build

# Start production server
npm start
```

Visit: http://localhost:3000

## 📝 Testing Notes

### What Works Without Database:
- ✅ All frontend pages
- ✅ UI components
- ✅ Animations
- ✅ Navigation
- ✅ Responsive design

### What Needs Database:
- ❌ Saving problems
- ❌ Saving solutions
- ❌ User data
- ❌ Comments
- ❌ Upvotes/downvotes

### What Needs OpenAI API:
- ❌ Problem analysis
- ❌ AI recommendations
- ❌ Project generation
- ❌ AI chat
- ❌ Solution comparison

## 🎯 Quick Test Script

Run this to test basic functionality:

```bash
# 1. Check if server starts
npm run dev

# 2. In another terminal, test API
curl http://localhost:3000/api/problems

# 3. Open browser
# Visit: http://localhost:3000
# Check: All pages load
# Test: Navigation works
# Verify: No console errors
```

## 📞 Need Help?

If you encounter issues:
1. Check the error message in console
2. Review this guide
3. Check `.env` configuration
4. Verify all dependencies installed
5. Try clearing cache and rebuilding

## 🎉 Success Indicators

Your setup is working if:
- ✅ Dev server starts without errors
- ✅ Landing page loads at http://localhost:3000
- ✅ No red errors in browser console
- ✅ Navigation between pages works
- ✅ UI looks correct and responsive
- ✅ Animations are smooth

---

**Happy Testing! 🚀**

For deployment, see `DEPLOYMENT.md`