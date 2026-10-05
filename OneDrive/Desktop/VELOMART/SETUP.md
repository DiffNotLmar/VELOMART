# VELOMART Railway Setup Guide

## ✅ What You Need

1. Railway account with PostgreSQL database (DONE ✓)
2. Node.js installed on your computer
3. Your Railway DATABASE_URL

## 📋 Setup Steps

### Step 1: Get Railway Database URL

1. Go to your Railway dashboard
2. Click on your **Postgres** database
3. Click on **"Variables"** or **"Connect"** tab
4. Copy the **DATABASE_URL** value
   - It looks like: `postgresql://postgres:xxxxx@containers-us-west-xxx.railway.app:5432/railway`

### Step 2: Configure Environment

1. Open the `.env` file in VELOMART folder
2. Replace the DATABASE_URL with your actual Railway URL:
   ```
   DATABASE_URL=your_railway_url_here
   PORT=3000
   NODE_ENV=development
   ```

### Step 3: Install Dependencies

Open PowerShell or Command Prompt in the VELOMART folder:

```powershell
npm install
```

### Step 4: Initialize Database

Run the seed script to create tables and add sample data:

```powershell
node database/seed.js
```

You should see:
- ✅ Database schema created successfully
- ✅ Seeded 5 vehicles successfully

### Step 5: Start the Server

```powershell
npm start
```

Server will start on: http://localhost:3000

### Step 6: Test Your API

Open browser and visit:
- http://localhost:3000/api/health
- http://localhost:3000/api/vehicles

## 🚀 Deploy to Railway (Backend)

### Option 1: Connect GitHub Repository

1. In Railway, click **"New"** → **"Deploy from GitHub repo"**
2. Select your **VELOMART** repository
3. Railway will auto-detect and deploy

### Option 2: Railway CLI

```powershell
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

### Option 3: Deploy from Railway Dashboard

1. Create a new service in Railway
2. Select **"GitHub Repo"**
3. Choose **DiffNotLmar/VELOMART**
4. Railway will automatically:
   - Detect package.json
   - Run npm install
   - Start with npm start

## 🔗 Connect Database to Deployed Backend

In Railway:
1. Click on your backend service
2. Go to **"Variables"** tab
3. Add variable: `DATABASE_URL` → Reference your Postgres database
4. Click **"Add Reference"** → Select your Postgres database → Select `DATABASE_URL`

## 🌐 Deploy Frontend (Separate)

Your frontend (HTML/CSS/JS) can be deployed to:

### Netlify (Recommended)
1. Go to netlify.com
2. Drag and drop your VELOMART folder
3. Done!

### Vercel
1. Go to vercel.com
2. Import from GitHub
3. Select VELOMART repo
4. Deploy

### GitHub Pages
1. Go to repository settings
2. Pages → Source → Deploy from branch
3. Select `main` branch
4. Your site will be at: `https://diffnotlmar.github.io/VELOMART`

## 📝 Update Frontend API Calls

After deploying backend, update your frontend JavaScript files to use your Railway backend URL:

In your JS files, replace:
```javascript
// From
fetch('http://localhost:3000/api/vehicles')

// To
fetch('https://your-app.railway.app/api/vehicles')
```

## 🎯 Quick Commands Reference

```powershell
# Install dependencies
npm install

# Start server (development)
npm start

# Start with auto-reload
npm run dev

# Initialize database
node database/seed.js
```

## 🐛 Troubleshooting

**Cannot connect to database:**
- Check if DATABASE_URL in .env is correct
- Make sure your Railway database is running
- Check if your IP is whitelisted (Railway usually allows all)

**npm command not found:**
- Install Node.js from nodejs.org
- Restart terminal after installation

**Port already in use:**
- Change PORT in .env file
- Or stop other applications using port 3000

## 📞 Need Help?

Check the logs:
- Railway Dashboard → Your Service → Deployments → View Logs
