import express from "express"
import cors from "cors"
import askRoute from "./routes/ask.js"

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// ask
app.use("/api/ask", askRoute)

app.listen(5000, () => {
    console.log("Server started")
})