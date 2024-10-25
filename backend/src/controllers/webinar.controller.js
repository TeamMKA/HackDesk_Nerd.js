import Webinar from '../models/webinar.model.js'

export const getWebinars = async (req, res) => {
  try {
    const post = await Webinar.find()
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const sendWebinar = async (req, res) => {
  const { title, description, date, time, meetLink } = req.body
  const newWebinar = new Webinar({ title, description, date, time, meetLink })
  try{
    await newWebinar.save()
    res.status(201).json(newWebinar)
  }
  catch (error) {
    res.status(409).json({ message: error.message })
  }
} 