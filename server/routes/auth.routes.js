import express from 'express'
const router=express.Router()
import {googleAuth, logout} from '../controllers/auth.controller.js';
import { authUser } from '../middleware/auth.middleware.js';

router.post("/google",googleAuth)
router.get("/logout",authUser,logout)

export default router;