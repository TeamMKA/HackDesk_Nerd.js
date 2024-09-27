import Post from '../models/post.model.js'

export const getPost = async (req, res) => {
  try {
    const post = await Post.find()
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const sendPost = async (req, res) => {
  const post = req.body
  const newPost = new Post(post)
  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}
