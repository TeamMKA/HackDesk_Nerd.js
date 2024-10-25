import express from "express"
import {
    getPost,
    sendPost,
    deletePost,
} from "../controllers/post.controller.js"
import { upload } from "../middleware/multer.middleware.js"

const router = express.Router()

router.get("/get-post", getPost)

router.post(
    "/send-post",
    upload.fields([
        {
            name: "imageFiles",
            maxCount: 3,
        },
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "audioFile",
            maxCount: 1,
        },
    ]),
    sendPost
)

router.delete("/delete-post/:id", deletePost)
export default router
