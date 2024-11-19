import express from "express"
import client from "../config/prismaConfig.js"

const router = express.Router()

router.get("/videos", async (req, res) => {
  console.log("GET /videos")

  try {
    const mongoResponse = await client.streams.findMany()
    if (!mongoResponse) {
      return res.status(404).json({ message: "No videos found" })
    }

    return res
      .status(200)
      .json({ data: mongoResponse, message: "Videos fetched successfully" })
  } catch (error){
    console.log(error)
    return res.status(500).json({ message: "Failed to fetch videos" })
  }
})

export default router
