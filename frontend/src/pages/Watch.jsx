import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../components/Loading"
import NotFound from "../components/NotFound"
import { daysFromUpload } from "../utils/timeFromUpload"

const Watch = () => {
  const [found, setFound] = useState(true)
  const [loading, setLoading] = useState(false)
  const [video, setVideo] = useState("")
  const [timeFromUpload, setTimeFromUpload] = useState("")
  const query = new URLSearchParams(useLocation().search)
  const vid = query.get("vid")

  useEffect(() => {
    const fetchVideoDetails = async () => {
      setLoading(true)
      console.log(import.meta.env.VITE_WEBSITE)

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/api/watch/${vid}`
        )

        if (response.status === 404) {
          setLoading(false)
          setFound(false)
          return
        }

        setTimeFromUpload(daysFromUpload(response.data.data.createdAt))
        setVideo(response.data.data)
        setFound(true)
      } catch (error) {
        console.log(error)
        setFound(false)
      } finally {
        setLoading(false)
      }
    }

    if (vid) {
      fetchVideoDetails()
    } else {
      setFound(false)
      setLoading(false)
    }
  }, [vid])

  return (
    <section>
      {loading ? (
        <Loading />
      ) : found ? (
        <div className="flex flex-col items-center">
          <video controls className="rounded-xl mt-4 w-[1200px]">
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="border-2 rounded-xl border-purple-500 mt-4 w-[1200px] p-4">
            <h1 className="text-2xl font-semibold">{video.title}</h1>
            <div className="flex justify-between mb-6">
              <p className="text-lg">{video.views} views</p>
              <p className="text-lg">{timeFromUpload} ago</p>
            </div>
            <p className="text-lg">{video.description}</p>
          </div>
        </div>
      ) : (
        <NotFound label={"URL"} />
      )}
    </section>
  )
}

export default Watch
