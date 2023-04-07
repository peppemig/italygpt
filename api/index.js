import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import askRoute from "./routes/ask.js"
import messageRoute from "./routes/message.js"
import mongoose from "mongoose"

const app = express()
dotenv.config()

// middlewares
app.use(cors())
app.use(express.json())

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongoDB')
    } catch (err) {
        throw err;
    }
};

// ask
app.use("/api/ask", askRoute)
app.use("/api/message", messageRoute)

// START
app.listen(5000, () => {
    connect()
    console.log("Server started")
})