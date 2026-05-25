# 🚀 AI-Powered Website Builder

An intelligent web-based platform that generates, customizes, and deploys websites using AI technology. Users can create professional websites in minutes without coding knowledge.

---

## 📋 Table of Contents
- [Overview](#overview)
- [How It Works](#how-it-works)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Project Output](#project-output)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Architecture](#architecture)

---

## 🎯 Overview

**AI Website Builder** is a full-stack web application that leverages artificial intelligence to generate complete website code based on user descriptions. Users can:
- Create accounts and manage credit-based subscriptions
- Generate HTML/CSS/JavaScript websites using AI prompts
- Edit generated code in a Monaco editor
- Preview websites in real-time
- Deploy websites and get shareable URLs
- Make payments through Stripe integration

### Target Users
- Non-technical entrepreneurs
- Small business owners
- Content creators
- Freelancers who need quick landing pages

---

## ⚙️ How It Works

### User Journey

```
1. User Registration/Login
   ↓
2. Purchase Credits (Stripe Payment)
   ↓
3. Enter Website Description (Prompt)
   ↓
4. AI Generates Website Code
   ↓
5. Edit Code in Monaco Editor
   ↓
6. Live Preview of Website
   ↓
7. Deploy & Get Unique URL
   ↓
8. Share Published Website
```

### Step-by-Step Process

1. **Authentication**
   - Users sign up/login via Firebase authentication
   - JWT tokens issued for API security
   - Redux store manages user session state

2. **Credit Purchase**
   - Users purchase credits through Stripe
   - Minimum 50 credits required to generate one website
   - Credits deducted from user account after generation

3. **AI Website Generation**
   - User describes their website requirements in natural language
   - System sends prompt to OpenRouter API (DeepSeek model)
   - AI generates complete HTML/CSS/JavaScript code
   - Response stored in MongoDB with conversation history

4. **Code Editing**
   - User can edit generated code in Monaco Editor
   - Real-time syntax highlighting
   - Live code updates saved to database

5. **Preview & Deployment**
   - Live preview shows website rendering
   - User can deploy website (stored with unique slug)
   - Generated URL: `yoursite.yourdomain.com/site/{slug}`

6. **Website Management**
   - Stored in MongoDB with version control
   - Conversation history maintained for context
   - Users can view and manage all their websites

---

## 🛠️ Technology Stack

### Frontend (Client)
```
Framework:        React 19.2.0 + Vite 7.3.1
State Management: Redux Toolkit 2.11.2 + React-Redux 9.2.0
Routing:          React Router DOM 7.13.0
UI Framework:     TailwindCSS 4.2.0
Code Editor:      Monaco Editor React 4.7.0
HTTP Client:      Axios 1.13.5
Animation:        Motion 12.34.3
Icons:            Lucide React 0.575.0
Authentication:   Firebase 12.9.0
Build Tool:       Vite (Fast module bundler)
Package Manager:  npm
```

### Backend (Server)
```
Runtime:          Node.js
Framework:        Express.js 5.2.1
Database:         MongoDB 9.2.1 (Mongoose ODM)
Authentication:   JWT (JSON Web Tokens) 9.0.3
Payments:         Stripe 20.4.0
CORS:             CORS 2.8.6
Environment:      dotenv 17.3.1
Cookie:           Cookie Parser 1.4.7
Development:      Nodemon
```

### External APIs & Services
```
AI/LLM:           OpenRouter (DeepSeek Chat v3)
Authentication:   Firebase
Payments:         Stripe
Database:         MongoDB Atlas
```

### DevTools
```
Linting:          ESLint 9.39.3
Package Manager:  npm
Build Optimizer:  Vite
```

---

## ✨ Features

### Core Features
- ✅ **AI-Powered Generation**: Generate complete websites from text descriptions
- ✅ **Code Editor**: Monaco editor with syntax highlighting
- ✅ **Live Preview**: Real-time website preview
- ✅ **Website Management**: Create, edit, and save multiple websites
- ✅ **Deployment**: Deploy websites with unique URLs
- ✅ **User Authentication**: Secure login with Firebase
- ✅ **Credit System**: Consume credits per website generation (50 credits/website)
- ✅ **Payment Processing**: Stripe integration for credit purchases
- ✅ **Conversation History**: AI maintains context across multiple interactions

### User Interface Pages
1. **Home Page** - Landing page, authentication options
2. **Dashboard** - User's website collection, analytics
3. **Generate** - Create new website from prompt
4. **Editor** - Code editing interface with live preview
5. **Live Site** - Published website view
6. **Pricing** - Credit pricing and plans

---

## 📤 Project Output

### What Users Get

1. **Generated Website Code**
   - Complete HTML structure
   - Responsive CSS styling with TailwindCSS
   - Interactive JavaScript functionality
   - Deployment-ready code

2. **Deployed Website**
   - Unique URL: `yoursite.com/site/{slug}`
   - Public, shareable link
   - Auto-deployed with custom slug
   - Full website analytics ready

3. **Project Data Stored**
   - Website code
   - Title and description
   - User ownership
   - Conversation history
   - Deployment status and URL
   - Creation/modification timestamps

### Example Output Structure
```json
{
  "_id": "ObjectId",
  "user": "ObjectId(user_id)",
  "title": "My Amazing Portfolio",
  "latestCode": "<html>...</html>",
  "conversation": [
    { "role": "user", "content": "Create a portfolio website" },
    { "role": "ai", "content": "I'll create a professional portfolio..." }
  ],
  "deployed": true,
  "deployeUrl": "www.domain.com/site/my-amazing-portfolio",
  "slug": "my-amazing-portfolio",
  "createdAt": "2026-04-17T10:30:00Z",
  "updatedAt": "2026-04-17T10:30:00Z"
}
```

---

## 📁 Project Structure

### Frontend (`/client`)
```
client/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Code.jsx         # Code display component
│   │   ├── FullPreview.jsx  # Website preview
│   │   ├── Loader.jsx       # Loading spinner
│   │   └── LoginModel.jsx   # Authentication modal
│   ├── pages/               # Page-level components
│   │   ├── Home.jsx         # Landing page
│   │   ├── Dashboard.jsx    # User dashboard
│   │   ├── Generate.jsx     # Website generation
│   │   ├── Editor.jsx       # Code editor
│   │   ├── LiveSite.jsx     # Published site preview
│   │   └── Pricing.jsx      # Pricing page
│   ├── hooks/               # Custom React hooks
│   │   └── UseCurrentUser.jsx # User session hook
│   ├── redux/               # State management
│   │   ├── store.js
│   │   └── userSlice.js
│   ├── services/            # External services
│   │   └── firebase.js      # Firebase config
│   ├── config/              # Configuration files
│   │   └── axios.js         # HTTP client setup
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/                  # Static assets
├── vite.config.js
├── eslint.config.js
└── package.json
```

### Backend (`/server`)
```
server/
├── config/                  # Configuration files
│   ├── connectDb.js         # MongoDB connection
│   ├── openRouter.js        # AI API integration
│   ├── plan.js              # Credit plans
│   └── stripe.js            # Stripe configuration
├── controllers/             # Business logic
│   ├── auth.controller.js   # Authentication
│   ├── user.controller.js   # User management
│   ├── website.controller.js # Website CRUD
│   ├── billing.controller.js # Payment handling
│   └── webhook.controller.js # Stripe webhooks
├── routes/                  # API endpoints
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── website.routes.js
│   └── billing.router.js
├── models/                  # MongoDB schemas
│   ├── user.model.js
│   └── website.model.js
├── middleware/              # Express middleware
│   └── auth.middleware.js   # JWT verification
├── services/                # Reusable service functions
├── utils/                   # Utility functions
│   ├── extractJson.js       # JSON parsing
│   ├── masterPrompt.js      # AI prompt template
│   └── Dummy.js             # Mock data
├── index.js                 # Server entry point
└── package.json
```

---

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Create new user account
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /refresh-token` - Refresh JWT token

### User Routes (`/api/user`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `GET /credit-balance` - Check user credits
- `GET /all-websites` - Get all user websites

### Website Routes (`/api/website`)
- `POST /generate` - Generate new website (50 credits)
- `GET /:id` - Get specific website
- `PUT /:id` - Update website code
- `DELETE /:id` - Delete website
- `POST /:id/deploy` - Deploy website
- `GET /site/:slug` - Public site access

### Billing Routes (`/api/billing`)
- `GET /plans` - Get available credit plans
- `POST /create-checkout-session` - Create Stripe session
- `POST /webhook` - Stripe webhook handler (Stripe→Server)

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- MongoDB Atlas account
- Firebase project
- OpenRouter API key
- Stripe account

### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
echo "VITE_FIREBASE_API_KEY=YOUR_KEY" > .env
echo "VITE_BACKEND_URL=http://localhost:5000" >> .env

# Run development server
npm run dev

# Build for production
npm run build
```

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
FIREBASE_PROJECT_ID=your_firebase_id
EOF

# Run development server
npm run dev

# Build for production (if needed)
npm run build
```

### Environment Variables

**Frontend (.env)**
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_BACKEND_URL=http://localhost:5000
```

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your-secret-key-min-32-chars
OPENROUTER_API_KEY=sk-or-xxx-xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    USER BROWSER                         │
│  React App (Vite) - Real-time UI & State Management     │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/JSON
                     ├─────────────────────────────────────┐
                     ▼                                     ▼
         ┌─────────────────────┐         ┌─────────────────────┐
         │   Express Server    │◄───────►│  MongoDB Atlas      │
         │  (Port: 5000)       │         │  (Database)         │
         │                     │         └─────────────────────┘
         ├─ Auth Routes       │
         ├─ User Routes       │
         ├─ Website Routes    │
         └─ Billing Routes    │
                ▲              │
         API   │              │
        Calls  │              │
                │              │
    ┌───────────┴───┐  ┌──────┴──────────┐
    ▼               ▼  ▼                 ▼
┌─────────┐  ┌──────────┐  ┌──────────┐
│Firebase │  │OpenRouter│  │ Stripe   │
│ Auth    │  │ (DeepSeek)  │Payment   │
└─────────┘  └──────────┘  └──────────┘
            External APIs
```

---

## 💳 Credit System

| Operation | Credits Required | Credit Cost |
|-----------|------------------|------------|
| Generate Website | 50 | Fixed |
| Edit Website | 0 | Free |
| Deploy Website | 0 | Free |
| Preview | 0 | Free |

### Credit Plans
- **Starter**: 100 credits ($5)
- **Professional**: 500 credits ($20)
- **Enterprise**: 2000 credits ($70)

---

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Firebase Security Rules
- ✅ CORS protection
- ✅ Secure password handling
- ✅ Stripe PCI compliance
- ✅ MongoDB connection encryption
- ✅ Environment variable protection

---

## 📊 Data Models

### User Schema
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  credit: Number,
  plan: String ('starter', 'pro', 'enterprise'),
  createdAt: Date,
  updatedAt: Date
}
```

### Website Schema
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  title: String,
  latestCode: String (HTML/CSS/JS),
  conversation: [{
    role: String ('user', 'ai'),
    content: String,
    timestamps: Date
  }],
  deployed: Boolean,
  deployeUrl: String,
  slug: String (unique),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚦 Deployment Guide

### Frontend Deployment (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy ./dist to hosting service
```

### Backend Deployment (Heroku/Railway)
```bash
cd server
# Set production environment variables
git push heroku main
```

---

## 📈 Performance Metrics

- **Generation Time**: 2-5 seconds
- **Code Preview**: Real-time (<100ms)
- **Database Response**: <200ms
- **Page Load**: <2 seconds

---

## 🐛 Troubleshooting

### Common Issues

**1. AI Generation Fails**
- Check OpenRouter API key
- Verify credit balance
- Check API rate limits

**2. Database Connection Error**
- Verify MongoDB URI in .env
- Check network access rules in MongoDB Atlas
- Ensure VPN/Firewall allows connection

**3. Stripe Payment Issues**
- Verify webhook endpoint
- Check Stripe secret keys
- Review Stripe dashboard logs

**4. Authentication Problems**
- Verify Firebase credentials
- Check JWT secret key
- Clear browser cookies/cache

---

## 📞 Support & Contact

For issues or questions:
- Review documentation
- Check error logs
- Verify environment variables
- Contact development team

---

## 📝 License

ISC License - 2026

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [OpenRouter API](https://openrouter.ai)
- [Stripe Documentation](https://stripe.com/docs)

---
**Version**: 1.0.0
