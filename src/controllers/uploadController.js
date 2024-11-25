import express from "express"
import multer from "multer"
import { s3Client } from "../config/awsConfig.js"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import client from "../config/prismaConfig.js"
import { getVideoDurationInSeconds } from "get-video-duration"
import { bufferToStream, formatDuration } from "../libs/videoProcess.js"

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post(
  "/upload-video",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req, res) => {
    const { title, description, category } = req.body
    const file = req.files["video"][0]
    const thumbnail = req.files["thumbnail"][0]
    console.log(title, description, file, thumbnail, category)

    const videoFileName = `${Date.now()}-${file.originalname}`
    const thumbnailFileName = `${Date.now()}-${thumbnail.originalname}`
    const videoParams = {
      Bucket: "jstream",
      Key: `videos/${videoFileName}`,
      Body: file.buffer,
    }
    const thumbnailParams = {
      Bucket: "jstream",
      Key: `thumbnails/${thumbnailFileName}`,
      Body: thumbnail.buffer,
    }

    try {
      const videoResponse = await s3Client.send(
        new PutObjectCommand(videoParams)
      )
      const thumbnailResponse = await s3Client.send(
        new PutObjectCommand(thumbnailParams)
      )

      if (
        videoResponse.$metadata.httpStatusCode !== 200 ||
        thumbnailResponse.$metadata.httpStatusCode !== 200
      ) {
        return res.status(500).json({ message: "Failed to upload video" })
      }

      const videoUrl = encodeURI(
        `https://jstream.s3.us-east-1.amazonaws.com/videos/${videoFileName}`
      )
      const thumbnailUrl = encodeURI(
        `https://jstream.s3.us-east-1.amazonaws.com/thumbnails/${thumbnailFileName}`
      )
      const videoStream = bufferToStream(file.buffer)
      const duration = await getVideoDurationInSeconds(videoStream)
      const formattedDuration = formatDuration(duration)

      const data = {
        title,
        description,
        category,
        videoLength: formattedDuration,
        views: 0,
        comments: [],
        videoUrl,
        thumbnailUrl,
      }
      const video = await client.streams.create({ data })
      if (!video) {
        return res.status(500).json({ message: "Failed to upload video" })
      }

      res.status(200).json({ message: "Video uploaded successfully" })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Failed to upload video" })
    }
  }
)

export default router
