import express, { json } from 'express'
import { configDotenv } from 'dotenv';
import connectDB from './config/connectDb.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import websiteRouter from './routes/website.routes.js'
import billingRouter from './routes/billing.router.js'
import { stripeWebHook } from './controllers/webhook.controller.js';

import dns from 'dns'


dns.setServers(["1.1.1.1","8.8.8.8"])

const app=express();

//  Config
configDotenv()
connectDB();

app.post('/api/stripe/webhook',express.raw({type:'application/json'}),stripeWebHook)

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://genweb-ai-1-e5n0.onrender.com",
    credentials:true
}))

// Routes 

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/website',websiteRouter)
app.use('/api/billing',billingRouter)

const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log("Server is running at "+port+" port");
})