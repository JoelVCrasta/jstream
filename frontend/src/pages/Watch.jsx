import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import Loading from "../components/Loading"
import NotFound from "../components/NotFound"
import { daysFromUpload } from "../utils/timeFromUpload"
import Share from "../components/Share"
import toast, { Toaster } from "react-hot-toast"

const Watch = () => {
  const [found, setFound] = useState(true)
  const [loading, setLoading] = useState(false)
  const [video, setVideo] = useState("")
  const [comment, setComment] = useState("")

  const [timeFromUpload, setTimeFromUpload] = useState("")
  const [isShareOpen, setIsShareOpen] = useState(false)
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

        console.log(response.data.data)
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

  const sendComment = async () => {
    if (!comment || comment.trim() === "") {
      return
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WEBSITE}/api/watch/comment/${vid}`,
        {
          comment,
        }
      )

      if (response.status === 404) {
        return
      }

      if (response.status === 500) {
        toast.error("SOmething went wrong")
        return
      }

      setComment("")
      setVideo((prev) => {
        return {
          ...prev,
          comments: [...prev.comments, comment],
        }
      })
      toast.success("Comment posted!")
    } catch (error) {
      console.log(error)
      toast.error("Failed to post comment")
    }
  }

  const openShareMenu = () => setIsShareOpen(true)
  const closeShareMenu = () => setIsShareOpen(false)

  return (
    <section>
      <Toaster />
      {loading ? (
        <Loading />
      ) : found ? (
        <div className="flex flex-col items-center">
          <video
            controls
            className="rounded-xl mt-4 w-[1200px] h-[700px] bg-black"
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="border-2 rounded-lg border-violet-500 mt-4 w-[1200px] p-4 mb-4">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">{video.title}</h1>
              <button
                onClick={openShareMenu}
                className="text-lg bg-violet-500 rounded-md px-4"
              >
                Share
              </button>
            </div>
            <div className="flex justify-between mb-6">
              <p className="text-lg">{video.views} views</p>
              <p className="text-lg">{timeFromUpload} ago</p>
            </div>

            <p className="text-lg">{video.description}</p>

            <div className="mt-20">
              <p className="text-2xl mb-2">Comments</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  className="w-full border-2 border-violet-500 bg-transparent rounded-md p-2"
                  placeholder="Add a comment"
                  onKeyDown={(e) => e.key === "Enter" && sendComment()}
                />
                <button
                  onClick={sendComment}
                  className="text-lg bg-violet-500 text-white rounded-md p-2"
                >
                  Comment
                </button>
              </div>

              <div className="flex gap-y-4 flex-col mt-4">
                {video.comments &&
                  video.comments.map((comment, index) => (
                    <div key={index} className="bg-zinc-700 p-2 rounded-lg">
                      <p className="text-lg">{comment}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {isShareOpen && (
            <Share video={video} closeShareMenu={closeShareMenu} />
          )}
        </div>
      ) : (
        <NotFound label={"URL"} />
      )}
    </section>
  )
}

export default Watch
