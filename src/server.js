import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import uploadController from "./controllers/uploadController.js"
import getVideosController from "./controllers/getVideosController.js"
import watchVideoController from "./controllers/watchVideoController.js"
import { fileURLToPath } from "url"
import path from "path"

dotenv.config()
const app = express()
app.use(express.json())

app.use(
  cors({
    origin: {
      "*": true,
      "http://localhost:5173": true,
      "https://jstream.s3.us-east-1.amazonaws.com": true,
    },
  })
)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.use("/api/", uploadController)
app.use("/api/", getVideosController)
app.use("/api/", watchVideoController)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
