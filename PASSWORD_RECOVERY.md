# 🔐 Password Recovery Guide

## If You Forgot Your MongoDB Atlas Password

### Option 1: Reset MongoDB Atlas Password

1. **Go to MongoDB Atlas**
   - Visit: https://account.mongodb.com/account/login

2. **Click "Forgot Password"**
   - Enter your email address
   - Check your email for reset link
   - Create a new password

3. **Update Database User Password**
   - After logging in to Atlas
   - Go to: **Database Access** (in left sidebar)
   - Find your database user
   - Click **"Edit"** button
   - Click **"Edit Password"**
   - Enter new password
   - Click **"Update User"**

4. **Update Your .env File**
   - Open `.env` file in solvesphere-ai folder
   - Update the password in MONGODB_URI
   - Example:
   ```env
   # OLD
   MONGODB_URI=mongodb+srv://username:oldpassword@cluster0.xxxxx.mongodb.net/solvesphere-ai?retryWrites=true&w=majority
   
   # NEW (with new password)
   MONGODB_URI=mongodb+srv://username:newpassword@cluster0.xxxxx.mongodb.net/solvesphere-ai?retryWrites=true&w=majority
   ```

5. **Restart Your Server**
   ```bash
   # Press Ctrl+C to stop
   # Then run:
   npm run dev
   ```

---

## If You Forgot Your Website Account Password

### Currently No Password Reset Feature

Since this is a development version, here are your options:

### Option 1: Create a New Account
1. Go to: http://localhost:3000/signup
2. Use a different email address
3. Create a new account

### Option 2: Use Local MongoDB (No Password Needed)

If you haven't set up MongoDB Atlas yet, you can use local MongoDB:

1. **Keep Current .env Settings**
   ```env
   MONGODB_URI=mongodb://localhost:27017/solvesphere-ai
   ```

2. **Install MongoDB Locally**
   - Download: https://www.mongodb.com/try/download/community
   - Install and start MongoDB service
   - No password required for local development!

3. **Restart Server**
   ```bash
   npm run dev
   ```

4. **Sign Up Again**
   - Go to http://localhost:3000/signup
   - Create account (will be stored locally)

---

## Quick Solution: Start Fresh

### Easiest Way - Use Local MongoDB (No Cloud Setup Needed)

1. **Your current .env is already configured for local MongoDB:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/solvesphere-ai
   ```

2. **Install MongoDB Community Edition**
   - **Windows**: https://www.mongodb.com/try/download/community
   - Download the installer
   - Run installer (use default settings)
   - MongoDB will start automatically

3. **Verify MongoDB is Running**
   ```bash
   mongosh
   ```
   If it connects, you're good to go!

4. **Restart Your Server**
   ```bash
   # In solvesphere-ai folder
   npm run dev
   ```

5. **Create Account**
   - Go to http://localhost:3000/signup
   - Sign up with any email/password
   - No cloud setup needed!

---

## 🎯 Recommended Approach

### For Development (Easiest):

**Use Local MongoDB** - No passwords, no cloud setup!

1. Install MongoDB Community Edition
2. Keep your current .env (already configured)
3. Restart server
4. Sign up and start using!

### For Production (Later):

**Use MongoDB Atlas** - Follow MONGODB_SETUP.md when ready

---

## 📝 Current Status

Your `.env` file currently has:
```env
MONGODB_URI=mongodb://localhost:27017/solvesphere-ai
GEMINI_API_KEY=AIzaSyB58puc_VzGBqQ5kcPtu0ziJM1u_KDWKHU
JWT_SECRET=solvesphere_secret_key_2024_change_in_production
```

This is configured for **local MongoDB** (no cloud, no passwords needed).

---

## 🚀 Quick Start (No Cloud Setup)

1. **Download MongoDB**
   - Go to: https://www.mongodb.com/try/download/community
   - Click "Download"
   - Install with default settings

2. **Verify Installation**
   ```bash
   mongosh
   ```
   Should connect successfully!

3. **Your Server is Already Running**
   - Just go to: http://localhost:3000
   - Sign up with any email/password
   - Start using the platform!

---

## 💡 Which Option Should You Choose?

### Choose Local MongoDB If:
- ✅ You want to start immediately
- ✅ You're just testing/learning
- ✅ You don't want cloud setup
- ✅ You're developing locally

### Choose MongoDB Atlas If:
- ✅ You want cloud database
- ✅ You need access from anywhere
- ✅ You're deploying to production
- ✅ You want automatic backups

---

## 🆘 Still Need Help?

### If MongoDB Atlas Password Issue:
1. Reset password at MongoDB Atlas website
2. Update database user password in Atlas dashboard
3. Update .env file with new password
4. Restart server

### If Website Account Password Issue:
1. Just create a new account (different email)
2. Or use local MongoDB and start fresh

### If You Want Simplest Solution:
1. Use local MongoDB (no cloud setup)
2. Install MongoDB Community Edition
3. Keep current .env settings
4. Sign up and start using!

---

**Made with ❤️ by Bob**

Don't worry - you can always start fresh or reset passwords easily! 🚀