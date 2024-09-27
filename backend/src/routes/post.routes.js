import express from 'express'
import { getPost, sendPost } from '../controllers/post.controller.js' 

const router = express.Router()

router.get('/get-post', getPost)

router.post("/send-post", sendPost)
export default router