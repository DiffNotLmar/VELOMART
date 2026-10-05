# VELOMART - Vehicle Marketplace

A full-featured vehicle marketplace for cars, motorcycles, trucks, vans, heavy equipment, and electric vehicles.

## 🚀 Features

- Browse vehicles by category
- Advanced search and filtering
- Shopping cart functionality
- Secure checkout process
- Order tracking
- Admin dashboard
- Contact form
- FAQ section
- Music player

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (Railway)

## 📦 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Railway Database

1. Go to [Railway.app](https://railway.app/)
2. Sign up or log in
3. Click "New Project"
4. Select "Provision PostgreSQL"
5. Copy the PostgreSQL connection string

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_railway_postgresql_url_here
PORT=3000
NODE_ENV=production
```

### 4. Initialize Database

Run the database seed script to create tables and insert sample data:

```bash
node database/seed.js
```

### 5. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3000`

## 🗄️ Database Schema

### Tables

- **vehicles** - Store all vehicle listings
- **orders** - Store customer orders
- **order_items** - Store items in each order
- **contacts** - Store contact form submissions

## 🔌 API Endpoints

### Vehicles
- `GET /api/vehicles` - Get all vehicles (with filters)
- `GET /api/vehicles/:id` - Get vehicle by ID
- `GET /api/vehicles/featured/list` - Get featured vehicles
- `POST /api/vehicles` - Create new vehicle (admin)
- `PUT /api/vehicles/:id` - Update vehicle (admin)
- `DELETE /api/vehicles/:id` - Delete vehicle (admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:orderNumber` - Get order by order number
- `GET /api/orders` - Get all orders (admin)
- `PATCH /api/orders/:id/status` - Update order status (admin)

### Health Check
- `GET /api/health` - Check API status

## 🚀 Deployment to Railway

### Deploy Backend

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login to Railway:
```bash
railway login
```

3. Initialize and deploy:
```bash
railway init
railway up
```

4. Link your PostgreSQL database:
```bash
railway link
```

5. Set environment variables in Railway dashboard

### Deploy Frontend

You can deploy the frontend to:
- **Netlify** - Drag and drop the files
- **Vercel** - Import from GitHub
- **GitHub Pages** - Enable in repository settings

## 📝 Environment Variables

Required environment variables:

- `DATABASE_URL` - PostgreSQL connection string from Railway
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## 🧪 Testing

To test the API, you can use:
- Postman
- Thunder Client (VS Code extension)
- curl commands

Example:
```bash
curl http://localhost:3000/api/health
```

## 📱 Frontend Pages

- `index.html` - Homepage
- `pages/vehicles.html` - Vehicle listings
- `pages/vehicle-detail.html` - Vehicle details
- `pages/cart.html` - Shopping cart
- `pages/checkout.html` - Checkout page
- `pages/order-confirmation.html` - Order confirmation
- `pages/about.html` - About page
- `pages/contact.html` - Contact page
- `pages/faq.html` - FAQ page
- `pages/admin/` - Admin dashboard

## 📄 License

MIT License

## 👨‍💻 Author

DiffNotLmar

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
