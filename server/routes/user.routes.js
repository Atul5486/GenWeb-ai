import express from 'express'
import { authUser } from '../middleware/auth.middleware.js';
import { getCurrentUser } from '../controllers/user.controller.js';
const router=express.Router();

router.get('/me',authUser,getCurrentUser)
 
export default router;