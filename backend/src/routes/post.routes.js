import express from 'express'
import { getPost, sendPost } from '../controllers/post.controller.js' 
import { upload } from "../middleware/multer.middleware.js"

const router = express.Router()

router.get('/get-post', getPost)

router.post("/send-post", upload.fields([
    {
        name: "imageFiles",
        maxCount: 3
    }, 
    {
        name: "videoFile",
        maxCount: 1
    },
    {
        name: "audioFile",
        maxCount:1
    }
]),sendPost)
export default router