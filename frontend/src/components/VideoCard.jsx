import { useNavigate } from "react-router-dom"
import { daysFromUpload } from "../utils/timeFromUpload"

const VideoCard = ({ video }) => {
  const navigate = useNavigate()
  const timeFromUpload = daysFromUpload(video.createdAt)
  console.log(timeFromUpload)

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/watch?vid=${video.id}`)}
    >
      <div className="bg-zinc-800 rounded-xl">
        <div className="relative">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="aspect-video object-cover w-full rounded-t-xl"
          />

          <p className="text-sm bg-zinc-800/70 px-1 rounded-md text-zinc-400 absolute bottom-1 right-2">
            {video.videoLength}
          </p>
        </div>

        <div className="p-2">
          <p className="pr-2 text-lg font-semibold text-ellipsis line-clamp-1">
            {video.title}
          </p>

          <div className="flex justify-between">
            <p className="text-sm text-zinc-400">{video.views} views</p>
            <p className="text-sm text-zinc-400">{timeFromUpload} ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
