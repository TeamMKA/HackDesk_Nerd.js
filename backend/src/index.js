import dotenv from "dotenv"
import connectDB from "./db/mongo.js"
import {app} from "./app.js"
dotenv.config()

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("ERROR : ", error)
            throw error
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running at http://localhost:${process.env.PORT}`)
            // createUser();
        })
    })
    .catch((err) => {
        console.log("Connection Failed", err)
    })
