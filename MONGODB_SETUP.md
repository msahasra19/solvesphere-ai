# 🗄️ MongoDB Atlas Setup Guide

## Complete Step-by-Step Guide to Get Your Connection String

### Option 1: MongoDB Atlas (Cloud - Recommended) ⭐

MongoDB Atlas is a FREE cloud database service. No installation needed!

---

## 📋 Step-by-Step Instructions

### Step 1: Create MongoDB Atlas Account

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   
2. **Sign Up**
   - Click "Try Free"
   - Sign up with:
     - Google account (easiest), OR
     - Email and password
   
3. **Complete Registration**
   - Fill in your details
   - Verify your email if needed

---

### Step 2: Create a Free Cluster

1. **Choose Deployment Type**
   - Select **"M0 FREE"** (this is completely free forever!)
   - Don't worry about other options

2. **Select Cloud Provider & Region**
   - **Provider**: Choose any (AWS, Google Cloud, or Azure)
   - **Region**: Choose closest to you (e.g., Mumbai for India)
   - Click **"Create Deployment"** or **"Create Cluster"**

3. **Wait for Cluster Creation**
   - Takes 1-3 minutes
   - You'll see a progress indicator

---

### Step 3: Create Database User

1. **Security Quickstart Will Appear**
   - You'll see "How would you like to authenticate your connection?"

2. **Create Database User**
   - **Username**: Choose a username (e.g., `admin` or `solvesphere`)
   - **Password**: Create a strong password
   - **IMPORTANT**: Write down your username and password!
   - Click **"Create Database User"**

**Example:**
```
Username: solvesphere_user
Password: MySecurePass123!
```

---

### Step 4: Add IP Address to Whitelist

1. **Where would you like to connect from?**
   
2. **For Development (Easiest)**
   - Click **"Add My Current IP Address"**
   - OR click **"Allow Access from Anywhere"**
   - Enter: `0.0.0.0/0` (allows all IPs - good for development)
   - Click **"Add Entry"**

3. **Click "Finish and Close"**

---

### Step 5: Get Your Connection String

1. **Go to Database**
   - Click **"Database"** in left sidebar
   - You'll see your cluster (usually named "Cluster0")

2. **Click "Connect"**
   - Click the **"Connect"** button on your cluster

3. **Choose Connection Method**
   - Click **"Drivers"** (or "Connect your application")

4. **Select Driver**
   - **Driver**: Node.js
   - **Version**: 5.5 or later (default is fine)

5. **Copy Connection String**
   - You'll see a connection string like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Click **"Copy"** button

---

### Step 6: Update Your Connection String

1. **Replace Placeholders**
   
   Your copied string looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

2. **Replace `<username>` and `<password>`**
   
   If your username is `solvesphere_user` and password is `MySecurePass123!`:
   ```
   mongodb+srv://solvesphere_user:MySecurePass123!@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

3. **Add Database Name**
   
   Add `/solvesphere-ai` before the `?`:
   ```
   mongodb+srv://solvesphere_user:MySecurePass123!@cluster0.xxxxx.mongodb.net/solvesphere-ai?retryWrites=true&w=majority
   ```

---

### Step 7: Update Your .env File

1. **Open `.env` file** in solvesphere-ai folder

2. **Replace the MONGODB_URI line** with your connection string:

```env
# OLD (Local MongoDB)
MONGODB_URI=mongodb://localhost:27017/solvesphere-ai

# NEW (MongoDB Atlas)
MONGODB_URI=mongodb+srv://solvesphere_user:MySecurePass123!@cluster0.xxxxx.mongodb.net/solvesphere-ai?retryWrites=true&w=majority
```

3. **Save the file**

---

### Step 8: Restart Your Server

1. **Stop the current server**
   - Press `Ctrl + C` in the terminal

2. **Start again**
   ```bash
   cd solvesphere-ai
   npm run dev
   ```

3. **Test the connection**
   - Go to http://localhost:3000
   - Try to sign up
   - If successful, MongoDB is connected! ✅

---

## 🎯 Quick Visual Guide

```
MongoDB Atlas Dashboard
├── 1. Sign Up (Free)
├── 2. Create Cluster (M0 FREE)
├── 3. Create Database User
│   ├── Username: your_username
│   └── Password: your_password
├── 4. Whitelist IP (0.0.0.0/0 for dev)
└── 5. Get Connection String
    └── Database → Connect → Drivers → Copy
```

---

## 📝 Example Connection Strings

### Format:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?options
```

### Real Example:
```
mongodb+srv://john:Pass123@cluster0.abc12.mongodb.net/solvesphere-ai?retryWrites=true&w=majority
```

### Your .env should look like:
```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/solvesphere-ai?retryWrites=true&w=majority
GEMINI_API_KEY=AIzaSyB58puc_VzGBqQ5kcPtu0ziJM1u_KDWKHU
JWT_SECRET=solvesphere_secret_key_2024_change_in_production
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Authentication Failed"
**Solution:**
- Check username and password are correct
- Make sure you replaced `<username>` and `<password>` in connection string
- Password should NOT have `<` or `>` symbols

### Issue 2: "IP Not Whitelisted"
**Solution:**
- Go to Atlas Dashboard → Network Access
- Add IP: `0.0.0.0/0` (allows all IPs)
- Wait 1-2 minutes for changes to apply

### Issue 3: "Connection Timeout"
**Solution:**
- Check your internet connection
- Verify cluster is running (green status in Atlas)
- Try again after 1-2 minutes

### Issue 4: Special Characters in Password
**Solution:**
If your password has special characters like `@`, `#`, `!`, etc., you need to URL encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `!` becomes `%21`

Example:
- Password: `Pass@123!`
- Encoded: `Pass%40123%21`

---

## 🔐 Security Best Practices

### For Development:
✅ Use `0.0.0.0/0` for IP whitelist (allows all)
✅ Use simple password for testing

### For Production:
✅ Whitelist only specific IPs
✅ Use strong, complex passwords
✅ Enable 2FA on MongoDB Atlas account
✅ Rotate passwords regularly

---

## 🎉 You're Done!

Once you've updated your `.env` file with the MongoDB Atlas connection string:

1. ✅ Restart your server
2. ✅ Go to http://localhost:3000
3. ✅ Sign up for an account
4. ✅ Submit problems
5. ✅ Use all features!

Your database is now in the cloud and accessible from anywhere! 🚀

---

## 📞 Need More Help?

**MongoDB Atlas Documentation:**
- https://docs.atlas.mongodb.com/getting-started/

**Video Tutorial:**
- Search YouTube: "MongoDB Atlas Setup Tutorial"

**Still Stuck?**
- Check the connection string format carefully
- Ensure username/password are correct
- Verify IP is whitelisted
- Wait 1-2 minutes after making changes

---

**Made with ❤️ by Bob**