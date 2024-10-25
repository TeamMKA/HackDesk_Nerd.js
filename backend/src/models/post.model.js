import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true, // Adjust as needed
  },
  latitude: {
    type: Number,
    required: true, // Adjust as needed
  },
  longitude: {
    type: Number,
    required: true, // Adjust as needed
  },
  location: {
    type: String,
    required: true, // Adjust as needed
  },
  description: {
    type: String,
    required: true, // Adjust as needed
  },
  imageFiles: {
    type: [String],
    default: "", // Default to an empty string
  },
  videoFile: {
    type: String,
    default: "", // Default to an empty string
  },
  audioFile: {
    type: String,
    default: "", // Default to an empty string
  },
  comments: {
    type: [String], // Array of strings for comments
    default: [], // Default to an empty array
  },
  like: {
    type: Number,
    default: 0, // Default to 0 likes
  },
  dislike: {
    type: Number,
    default: 0, // Default to 0 dislikes
  },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

const Post = mongoose.model("Post", postSchema)

export default Post
