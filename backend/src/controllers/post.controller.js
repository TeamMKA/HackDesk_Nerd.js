import Post from "../models/post.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import fs from 'fs';

export const getPost = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find()
        if (!posts.length) {
            throw new ApiError(404, "No posts found")
        }
        return res
            .status(200)
            .json(new ApiResponse(200, posts, "Posts retrieved successfully"))
    } catch (error) {
        throw new ApiError(500, "Server error while retrieving posts")
    }
})

export const sendPost = asyncHandler(async (req, res) => {
    const { type, location, description } = req.body

    if (!type || !location || !description) {
        throw new ApiError(400, "All fields are required")
    }

    // Array to store URLs of the uploaded files
    let imageFiles = []
    let videoFile = ""
    let audioFile = ""

    // Upload image files to Cloudinary
    if (req.files?.imageFiles) {
        imageFiles = await Promise.all(
            req.files.imageFiles.map(async (image) => {
                const uploadedImage = await uploadOnCloudinary(image.path)
                if (!uploadedImage)
                    throw new ApiError(500, "Error uploading image")
                // After uploading, you can delete the local file
                // fs.unlinkSync(image.path)
                return uploadedImage.url
            })
        )
    }

    // Upload video file to Cloudinary
    if (req.files?.videoFile && req.files.videoFile[0]) {
        const video = req.files.videoFile[0]
        const uploadedVideo = await uploadOnCloudinary(video.path)
        if (!uploadedVideo) throw new ApiError(500, "Error uploading video")
        videoFile = uploadedVideo.url
        // fs.unlinkSync(video.path) // Delete local file after upload
    }

    // Upload audio file to Cloudinary
    if (req.files?.audioFile && req.files.audioFile[0]) {
        const audio = req.files.audioFile[0]
        const uploadedAudio = await uploadOnCloudinary(audio.path)
        if (!uploadedAudio) throw new ApiError(500, "Error uploading audio")
        audioFile = uploadedAudio.url
        // fs.unlinkSync(audio.path) // Delete local file after upload
    }

    // Create a new post with the uploaded file URLs
    const post = await Post.create({
        type,
        location,
        description,
        imageFiles, // Array of image URLs
        videoFile, // Video URL
        audioFile, // Audio URL
    })

    res.status(201).json(
        new ApiResponse(201, post, "Post created successfully")
    )
})
