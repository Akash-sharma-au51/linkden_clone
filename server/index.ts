import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./config/connection"


dotenv.config()

const app = express()

const port = process.env.PORT || 5050

//middlewares
app.use(express.json())

//routes
app.get("/", (req, res) => {
    res.send("API is running...")
}
)

//connect to database and start server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })}).catch((error) => {
        console.error("Failed to start server:", error)
    })


    
