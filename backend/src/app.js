import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import webinarRouter from "./routes/webinar.routes.js"
import postRouter from "./routes/post.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRouter from "./routes/user.routes.js"

const app = express()
 
app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use("/api/message", messageRoutes);
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/webinars", webinarRouter)


export { app }
