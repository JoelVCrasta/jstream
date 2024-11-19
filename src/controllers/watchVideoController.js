import express from "express"
import client from "../config/prismaConfig.js"

const router = express.Router()

router.get("/watch/:id", async (req, res) => {
  const id = req.params.id
  console.log("GET /watch/:id", id)

  try {
    const checkVideo = await client.streams.findUnique({
      where: {
        id: id,
      },
    })

    if (!checkVideo) {
      return res.status(404).json({ message: "Video not found" })
    }

    const video = await client.streams.update({
      where: {
        id: id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    })

    return res.status(200).json({ data: video, message: "Video found" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" })
  }
})

export default router
