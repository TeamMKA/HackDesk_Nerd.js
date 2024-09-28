import express from 'express'
import { getWebinars, sendWebinar } from '../controllers/webinar.controller.js'

const router = express.Router()

router.get('/get-webinars', getWebinars)

router.post('/send-webinar',sendWebinar)

export default router  