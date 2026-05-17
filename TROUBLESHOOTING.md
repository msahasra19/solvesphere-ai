# 🔧 Troubleshooting Guide

## Server is Running Successfully! ✅

Your dev server is running at:
- **Local**: http://localhost:3000
- **Network**: http://192.168.56.1:3000

## How to Access the Application

### Option 1: Use Localhost (Recommended)
Open your browser and go to:
```
http://localhost:3000
```

### Option 2: Use 127.0.0.1
If localhost doesn't work, try:
```
http://127.0.0.1:3000
```

### Option 3: Use Network IP
If you're on the same network:
```
http://192.168.56.1:3000
```

## Common Issues & Solutions

### Issue 1: "Cannot reach" or "Site can't be reached"

**Solutions:**

1. **Check if server is running**
   - Look for "Ready in XXXms" message in terminal
   - Should show: `Local: http://localhost:3000`

2. **Try different URL formats**
   ```
   http://localhost:3000
   http://127.0.0.1:3000
   http://0.0.0.0:3000
   ```

3. **Check firewall**
   - Windows: Allow Node.js through firewall
   - Temporarily disable firewall to test

4. **Clear browser cache**
   - Press Ctrl+Shift+Delete
   - Clear cached images and files
   - Try incognito mode (Ctrl+Shift+N)

5. **Try different browser**
   - Chrome
   - Edge
   - Firefox

### Issue 2: Errors in Console

**If you see TypeScript/ESLint errors:**

These are just warnings and won't prevent the app from running. The app should still work in the browser.

**Common warnings you can ignore:**
- `Select element must have an accessible name` - Cosmetic warning
- `Buttons must have discernible text` - Cosmetic warning
- These don't affect functionality

### Issue 3: Page Loads but Shows Errors

**If you see errors in browser console:**

1. **Open DevTools** (F12)
2. **Check Console tab** for errors
3. **Common fixes:**

```bash
# Clear Next.js cache
cd solvesphere-ai
rm -rf .next
npm run dev
```

### Issue 4: Styles Not Loading

**If page loads but looks broken:**

1. **Hard refresh**: Ctrl+Shift+R
2. **Clear cache**: Ctrl+Shift+Delete
3. **Check if Tailwind is working**:
   - Look for dark background
   - Check if colors are showing

### Issue 5: Port Already in Use

**Error: "Port 3000 is already in use"**

```bash
# Use different port
npm run dev -- -p 3001
```

Then visit: http://localhost:3001

## Verification Steps

### Step 1: Check Terminal
You should see:
```
✓ Ready in XXXms
- Local:    http://localhost:3000
- Network:  http://192.168.56.1:3000
```

### Step 2: Open Browser
1. Open Chrome/Edge/Firefox
2. Type: `http://localhost:3000`
3. Press Enter

### Step 3: What You Should See
- Dark background
- "SolveSphere AI" logo with sparkle icon
- Hero section with gradient text
- Animated elements
- Navigation menu

## Testing Each Page

### Landing Page (/)
```
http://localhost:3000
```
Should show: Hero, stats, features, problems, solutions

### Explore Page (/explore)
```
http://localhost:3000/explore
```
Should show: Search bar, filters, problem cards

### Marketplace (/marketplace)
```
http://localhost:3000/marketplace
```
Should show: Unsolved problems, bounties

### Dashboard (/dashboard)
```
http://localhost:3000/dashboard
```
Should show: User stats, tabs, activity

## Browser Console Errors

### How to Check:
1. Press F12 (or right-click → Inspect)
2. Click "Console" tab
3. Look for red errors

### Common Errors & Fixes:

**Error: "Failed to fetch"**
- This is normal if MongoDB/OpenAI not configured
- UI will still work

**Error: "Module not found"**
```bash
npm install
```

**Error: "Unexpected token"**
```bash
rm -rf .next
npm run dev
```

## Network Issues

### If localhost doesn't work:

1. **Check hosts file**
   - Windows: `C:\Windows\System32\drivers\etc\hosts`
   - Should have: `127.0.0.1 localhost`

2. **Check if port is accessible**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   
   # Should show LISTENING
   ```

3. **Try binding to all interfaces**
   Edit `package.json`:
   ```json
   "dev": "next dev -H 0.0.0.0"
   ```

## Still Not Working?

### Complete Reset:

```bash
# Stop server (Ctrl+C)

# Clear everything
rm -rf .next
rm -rf node_modules
rm -rf package-lock.json

# Reinstall
npm install

# Start fresh
npm run dev
```

### Check System:

1. **Node.js version**
   ```bash
   node --version
   # Should be 18+
   ```

2. **NPM version**
   ```bash
   npm --version
   # Should be 8+
   ```

3. **Port availability**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   ```

## Success Checklist

- [ ] Terminal shows "Ready in XXXms"
- [ ] No red errors in terminal
- [ ] Browser opens localhost:3000
- [ ] Page loads (even if slowly)
- [ ] Dark background visible
- [ ] Logo shows at top
- [ ] Can click navigation links

## Quick Test

Run this in a new terminal:
```bash
curl http://localhost:3000
```

Should return HTML content (not error).

## Alternative: Use Network IP

If localhost doesn't work, use the network IP shown in terminal:
```
http://192.168.56.1:3000
```

## Screenshots Expected

### Landing Page:
- Dark navy background
- "SolveSphere AI" with sparkle icon
- Large heading with gradient text
- Search bar
- Stats section
- Feature cards

### If You See This:
- ✅ White/blank page → Loading (wait a moment)
- ✅ Dark page with text → Working!
- ❌ "Cannot reach" → Check URL/firewall
- ❌ Error page → Check console

## Get Help

If still not working:
1. Share the exact error message
2. Share browser console errors (F12)
3. Share terminal output
4. Try different browser
5. Try different port (3001, 3002)

## Working Configuration

Your server IS running successfully:
```
✓ Ready in 802ms
- Local:    http://localhost:3000
- Network:  http://192.168.56.1:3000
```

Just open your browser and visit: **http://localhost:3000**

---

**The app is working! Just access it in your browser.** 🚀