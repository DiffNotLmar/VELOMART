# 🚀 VELOMART - Quick Start Guide

## ✅ Setup Complete!

Your VELOMART backend is now connected to Railway PostgreSQL database!

### What's Been Set Up:
- ✅ Node.js backend with Express
- ✅ PostgreSQL database on Railway (Public access enabled)
- ✅ Database schema created (vehicles, orders, order_items, contacts)
- ✅ Sample vehicles data seeded
- ✅ API endpoints ready
- ✅ Code pushed to GitHub

---

## 🎯 Local Development

### Start Your Server:
```powershell
cd c:\Users\holog\OneDrive\Desktop\VELOMART
npm start
```

Server will run on: **http://localhost:3000**

### Test Your API:
Open browser and visit:
- http://localhost:3000/api/health
- http://localhost:3000/api/vehicles
- http://localhost:3000/api/vehicles/1

---

## 🚀 Deploy to Railway

### Method 1: GitHub Integration (Recommended)

1. Go to your Railway project: https://railway.app
2. Click **"+ New"** → **"GitHub Repo"**
3. Select **DiffNotLmar/VELOMART**
4. Railway will automatically:
   - Detect `package.json`
   - Install dependencies
   - Start with `npm start`

### Method 2: Link Database to Deployed Service

After deployment:
1. Click your **VELOMART** service in Railway
2. Go to **"Variables"** tab
3. Click **"New Variable"** → **"Add Reference"**
4. Select your **Postgres** database
5. Choose **DATABASE_URL**
6. Add another variable: `NODE_ENV=production`

### Your Backend URL:
Railway will give you a public URL like:
```
https://velomart-production.up.railway.app
```

---

## 🌐 Deploy Frontend

Your frontend (HTML/CSS/JS) can be deployed separately to:

### Option 1: Netlify (Easiest)
1. Go to https://netlify.com
2. Drag and drop your project folder
3. Done! You'll get a URL like: `https://velomart.netlify.app`

### Option 2: Vercel
1. Go to https://vercel.com
2. Import from GitHub
3. Select VELOMART repo
4. Deploy

### Option 3: GitHub Pages
1. Go to your repo settings on GitHub
2. Pages → Deploy from `main` branch
3. Site will be at: `https://diffnotlmar.github.io/VELOMART`

---

## 🔗 Connect Frontend to Backend

After deploying backend, update your frontend JavaScript files:

In `js/data.js`, `js/vehicles.js`, `js/checkout.js`, etc., replace:

```javascript
// From:
fetch('http://localhost:3000/api/vehicles')

// To:
fetch('https://your-railway-backend-url.railway.app/api/vehicles')
```

---

## 📊 Database Management

### View Data in Railway:
1. Click **Postgres** in Railway
2. Go to **"Data"** tab
3. Browse tables and records

### Add More Data:
Edit `database/seed.js` and run:
```powershell
node database/seed.js
```

### Reset Database:
Delete all data and reseed:
```sql
-- In Railway Data tab
TRUNCATE vehicles, orders, order_items, contacts CASCADE;
```
Then run seed script again.

---

## 🛠️ Common Commands

```powershell
# Start server
npm start

# Start with auto-reload (development)
npm run dev

# Test database connection
node test-connection.js

# Reseed database
node database/seed.js
```

---

## 📝 API Endpoints

### Vehicles
- `GET /api/vehicles` - All vehicles (with filters)
- `GET /api/vehicles/:id` - Single vehicle
- `GET /api/vehicles/featured/list` - Featured vehicles
- `POST /api/vehicles` - Create vehicle (admin)
- `PUT /api/vehicles/:id` - Update vehicle (admin)
- `DELETE /api/vehicles/:id` - Delete vehicle (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:orderNumber` - Get order by number
- `GET /api/orders` - Get all orders (admin)
- `PATCH /api/orders/:id/status` - Update order status (admin)

---

## 🐛 Troubleshooting

**Server won't start:**
- Check if `.env` file exists and has DATABASE_URL
- Run `node test-connection.js` to verify database connection

**Can't connect to database:**
- Make sure Railway database is running
- Check if PUBLIC access is enabled in Railway
- Verify DATABASE_URL in `.env` file

**API returns empty data:**
- Run `node database/seed.js` to add sample data
- Check Railway Data tab to see if data exists

---

## 📞 Next Steps

1. **Start local server** → Test API endpoints
2. **Deploy backend to Railway** → Get production URL
3. **Deploy frontend** → Netlify/Vercel/GitHub Pages
4. **Update frontend** → Point to Railway backend URL
5. **Test everything** → Place test orders, browse vehicles

---

## 🎉 You're All Set!

Your VELOMART is ready to go! Start your local server and test the API, then deploy to Railway when ready.

**Need help?** Check `SETUP.md` for detailed instructions.
