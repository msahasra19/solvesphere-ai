# 🚀 Quick Start Guide - SolveSphere AI

Get up and running in 5 minutes!

## Step 1: Install Dependencies (1 minute)

```bash
cd solvesphere-ai
npm install
```

## Step 2: Configure Environment (2 minutes)

Open `.env` file and update:

```env
# Required: MongoDB (choose one option)
# Option A: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/solvesphere-ai

# Option B: MongoDB Atlas (Recommended - Free)
# Get from: https://www.mongodb.com/cloud/atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/solvesphere-ai

# Optional: OpenAI API (for AI features)
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-key-here

# Auto-configured (no changes needed)
JWT_SECRET=your-super-secret-jwt-key-12345
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

### Quick MongoDB Setup (Choose One):

**Option A: MongoDB Atlas (Easiest - No Installation)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<password>` with your password
7. Paste in `.env` as `MONGODB_URI`

**Option B: Local MongoDB**
- Windows: Download from https://www.mongodb.com/try/download/community
- Mac: `brew install mongodb-community`
- Linux: `sudo apt-get install mongodb`

## Step 3: Start the Application (1 minute)

```bash
npm run dev
```

## Step 4: Open in Browser (1 minute)

Visit: **http://localhost:3000**

## ✅ What You Can Test Immediately

### Without Any Setup:
- ✅ Landing page with animations
- ✅ Explore page with problem cards
- ✅ Marketplace page
- ✅ Dashboard page
- ✅ All UI components
- ✅ Navigation
- ✅ Responsive design

### With MongoDB:
- ✅ Save problems
- ✅ Save solutions
- ✅ API endpoints

### With OpenAI API:
- ✅ AI problem analysis
- ✅ AI recommendations
- ✅ AI chat assistant
- ✅ Project generation

## 🎯 Quick Test Checklist

1. **Landing Page** - http://localhost:3000
   - [ ] Page loads
   - [ ] Animations work
   - [ ] Search bar visible

2. **Explore Page** - http://localhost:3000/explore
   - [ ] Problem cards display
   - [ ] Filters work
   - [ ] Search works

3. **Marketplace** - http://localhost:3000/marketplace
   - [ ] Bounty problems show
   - [ ] Stats display

4. **Dashboard** - http://localhost:3000/dashboard
   - [ ] User stats show
   - [ ] Tabs switch

## 🐛 Troubleshooting

### Port 3000 Already in Use?
```bash
# Use different port
npm run dev -- -p 3001
```

### MongoDB Connection Error?
- Use MongoDB Atlas (cloud) instead
- Or check if MongoDB service is running

### Module Not Found?
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎉 Success!

If you see the landing page with animations, you're all set!

## 📚 Next Steps

- Read `TESTING_GUIDE.md` for detailed testing
- Read `DEPLOYMENT.md` for deployment options
- Read `README.md` for full documentation

## 💡 Pro Tips

1. **Test without OpenAI API first** - All UI works without it
2. **Use MongoDB Atlas** - Easier than local setup
3. **Check browser console** - For any errors
4. **Test on mobile** - Resize browser window

## 🆘 Need Help?

Common issues and solutions in `TESTING_GUIDE.md`

---

**Ready to deploy?** See `DEPLOYMENT.md`