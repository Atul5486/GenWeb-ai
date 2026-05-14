import express from 'express'
import { authUser } from '../middleware/auth.middleware.js';
import { billing } from '../controllers/billing.controller.js';
const router=express.Router()

router.post('/',authUser,billing)

export default router;