import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        console.log(`DataBase Connected ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error : ", error)
        process.exit(1)
    }
}

export default connectDB