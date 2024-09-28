import Post from "../models/post.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import fs from "fs"

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
    const {
        type,
        latitude,
        longitude,
        location,
        description,
        comments,
        like,
        dislike,
    } = req.body

    // Ensure all required fields are provided
    if (!type || !latitude || !longitude || !location || !description) {
        throw new ApiError(400, "All fields are required")
    }

    // Arrays and variables to store URLs of the uploaded files
    let imageFiles = []
    let videoFile = ""
    let audioFile = ""

    // Upload image files to Cloudinary if present
    if (req.files?.imageFiles) {
        imageFiles = await Promise.all(
            req.files.imageFiles.map(async (image) => {
                const uploadedImage = await uploadOnCloudinary(image.path)
                if (!uploadedImage) {
                    throw new ApiError(500, "Error uploading image")
                }
                // Optionally, delete the local file after uploading
                // fs.unlinkSync(image.path);
                return uploadedImage.url
            })
        )
    }

    // Upload video file to Cloudinary if present
    if (req.files?.videoFile && req.files.videoFile[0]) {
        const video = req.files.videoFile[0]
        const uploadedVideo = await uploadOnCloudinary(video.path)
        if (!uploadedVideo) {
            throw new ApiError(500, "Error uploading video")
        }
        videoFile = uploadedVideo.url
        // Optionally, delete the local file after uploading
        // fs.unlinkSync(video.path);
    }

    // Upload audio file to Cloudinary if present
    if (req.files?.audioFile && req.files.audioFile[0]) {
        const audio = req.files.audioFile[0]
        const uploadedAudio = await uploadOnCloudinary(audio.path)
        if (!uploadedAudio) {
            throw new ApiError(500, "Error uploading audio")
        }
        audioFile = uploadedAudio.url
        // Optionally, delete the local file after uploading
        // fs.unlinkSync(audio.path);
    }

    // Create a new post in the database with the uploaded file URLs
    const post = await Post.create({
        type,
        latitude,
        longitude,
        location,
        description,
        imageFiles, // Array of image URLs
        videoFile, // Video URL
        audioFile, // Audio URL
        comments: comments || [], // Comments from req.body, defaults to empty array if not provided
        like: like || 0, // Likes from req.body, defaults to 0 if not provided
        dislike: dislike || 0, // Dislikes from req.body, defaults to 0 if not provided
    })

    // Respond with the created post and success message
    res.status(201).json(
        new ApiResponse(201, post, "Post created successfully")
    )
})

export const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params // Assume the post ID is passed as a URL parameter

    // Find the post by its ID
    const post = await Post.findById(id)

    // If the post doesn't exist, return a 404 error
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    // console.log(`${post} deleted`)

    // Delete the post from the database
    await post.deleteOne()

    // Send a success response
    res.status(200).json(
        new ApiResponse(200, null, "Post deleted successfully")
    )
})
