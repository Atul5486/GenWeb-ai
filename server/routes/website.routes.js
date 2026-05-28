import express from 'express'
import { authUser } from '../middleware/auth.middleware.js';
import {changes, deploy, generateWebsite, getAllWebsites, getWebsiteById, getWebsiteBySlug} from '../controllers/website.controller.js'
const router=express.Router()

router.post('/generate',authUser,generateWebsite)
router.put('/update/:id',authUser,changes)
router.get('/get-by-id/:id',authUser,getWebsiteById)
router.get('/get-all',authUser,getAllWebsites)
router.get('/deploy/:id',authUser,deploy)
router.get('/get-by-slug/:slug',getWebsiteBySlug)

export default router;