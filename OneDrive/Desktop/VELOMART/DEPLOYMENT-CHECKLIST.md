# 🚀 Railway Deployment Checklist

## Current Status: Backend Deploying... ⏳

---

## ✅ Step 1: Wait for Deployment to Complete

Watch the deployment logs in Railway. You should see:
- ✅ Building image...
- ✅ Installing dependencies
- ✅ Starting server
- ✅ Deployment succeeded!

---

## 📋 Step 2: Configure Environment Variables

Once deployment completes:

1. Click on your **VELOMART** service in Railway
2. Go to **"Variables"** tab
3. Add these variables:

### Required Variables:

#### 1. Link Database (Most Important!)
- Click **"New Variable"** → **"Add Reference"**
- Select your **Postgres** database
- Choose **DATABASE_URL**
- This connects your backend to the database

#### 2. Add NODE_ENV
- Click **"New Variable"**
- Name: `NODE_ENV`
- Value: `production`

#### 3. Add PORT (Optional - Railway auto-assigns)
- Name: `PORT`
- Value: `3000`

### After Adding Variables:
Railway will automatically redeploy your service.

---

## 🔗 Step 3: Get Your Backend URL

After successful deployment:

1. Click on your **VELOMART** service
2. Go to **"Settings"** tab
3. Look for **"Domains"** section
4. You'll see a URL like: `https://velomart-production-xxxx.up.railway.app`
5. **Copy this URL** - you'll need it for your frontend!

---

## 🧪 Step 4: Test Your API

Open your browser and test these endpoints:

Replace `YOUR-RAILWAY-URL` with your actual Railway URL:

```
https://YOUR-RAILWAY-URL.railway.app/api/health
https://YOUR-RAILWAY-URL.railway.app/api/vehicles
https://YOUR-RAILWAY-URL.railway.app/api/vehicles/1
```

You should see:
- ✅ `/api/health` - Returns server status
- ✅ `/api/vehicles` - Returns list of vehicles
- ✅ `/api/vehicles/1` - Returns single vehicle details

---

## 🌱 Step 5: Seed Database (If Empty)

If API returns empty data, run seed command:

### Option A: Via Railway Console
1. Click your **VELOMART** service
2. Click **"Console"** tab
3. Run: `node database/seed.js`

### Option B: Via Local Terminal
```powershell
cd c:\Users\holog\OneDrive\Desktop\VELOMART
node database/seed.js
```
(This works because your local .env connects to Railway's public database)

---

## 🎨 Step 6: Update Frontend API URLs

Now that your backend is live, update your frontend to use it:

### Files to Update:

#### 1. `js/vehicles.js`
```javascript
// Replace localhost with Railway URL
const API_URL = 'https://YOUR-RAILWAY-URL.railway.app/api';
```

#### 2. `js/checkout.js`
```javascript
// Replace localhost with Railway URL
const API_URL = 'https://YOUR-RAILWAY-URL.railway.app/api';
```

#### 3. `js/admin-vehicles.js` (if you have admin)
```javascript
// Replace localhost with Railway URL
const API_URL = 'https://YOUR-RAILWAY-URL.railway.app/api';
```

### Quick Find & Replace:
Search for: `http://localhost:3000`
Replace with: `https://YOUR-RAILWAY-URL.railway.app`

---

## 🌐 Step 7: Deploy Frontend

### Option 1: Netlify (Easiest)
1. Go to https://app.netlify.com
2. Drag and drop your VELOMART folder
3. Done! Get URL like: `https://velomart.netlify.app`

### Option 2: Vercel
1. Go to https://vercel.com
2. **"New Project"** → Import from GitHub
3. Select **VELOMART** repo
4. Deploy

### Option 3: GitHub Pages
1. Go to GitHub repo settings
2. **Pages** → Deploy from `main` branch
3. Site URL: `https://diffnotlmar.github.io/VELOMART`

---

## ✅ Final Checklist

- [ ] Backend deployed successfully on Railway
- [ ] DATABASE_URL linked to Postgres
- [ ] NODE_ENV set to production
- [ ] Backend API tested and working
- [ ] Database has sample data
- [ ] Frontend API URLs updated to Railway backend
- [ ] Frontend deployed to Netlify/Vercel/GitHub Pages
- [ ] End-to-end test: Browse vehicles, add to cart, checkout

---

## 🔧 Troubleshooting

### Deployment Failed
- Check logs in Railway → Deployments → Click on failed deployment
- Common issues:
  - Missing `start` script in package.json ✓ (We have it)
  - Missing dependencies ✓ (We have them)

### API Returns 500 Error
- Check if DATABASE_URL is linked
- Check logs for database connection errors
- Verify database has tables (run seed script)

### CORS Errors on Frontend
If you get CORS errors, the backend already has CORS enabled in `server.js`:
```javascript
app.use(cors());
```
This allows requests from any domain.

### Database Connection Failed
- Verify Postgres is running in Railway
- Check if DATABASE_URL variable is set
- Ensure database has public access enabled ✓ (We did this)

---

## 📊 Monitor Your App

### Railway Dashboard:
- **Metrics** - CPU, Memory, Network usage
- **Logs** - Real-time server logs
- **Deployments** - Deployment history

### Check Health:
Set up a monitoring service (optional):
- UptimeRobot (free)
- Better Uptime
- StatusCake

---

## 🎉 Success!

Once everything is working:
1. Your backend is live on Railway with PostgreSQL
2. Your frontend is deployed and connected
3. Users can browse vehicles and place orders
4. Data is stored in Railway's database

**Your VELOMART is now live! 🚀**

---

## 📞 Next Features to Add

- User authentication (login/signup)
- Admin dashboard (manage vehicles & orders)
- Payment integration (Stripe, PayPal)
- Email notifications (SendGrid, Mailgun)
- Image uploads (Cloudinary, AWS S3)
- Reviews and ratings
- Wishlist feature

---

## 🔗 Important Links

- **GitHub Repo**: https://github.com/DiffNotLmar/VELOMART
- **Railway Dashboard**: https://railway.app
- **Railway Docs**: https://docs.railway.app
- **Backend Health Check**: https://YOUR-URL.railway.app/api/health
