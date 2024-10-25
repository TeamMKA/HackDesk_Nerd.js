import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import webinarRouter from "./routes/webinar.routes.js"
import postRouter from "./routes/post.routes.js"

const app = express()
 
app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use(cookieParser())

import userRouter from "./routes/user.routes.js"

app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/webinars", webinarRouter)

export { app }
