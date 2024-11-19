import { useState, useEffect } from "react"
import VideoContainer from "../components/VideoContainer"
import SearchBar from "../components/SearchBar"
import VideoCard from "../components/VideoCard"
import axios from "axios"
import Loading from "../components/Loading"
import NotFound from "../components/NotFound"

const Home = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [found, setFound] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/api/videos`
        )
        console.log(response.data.data)

        if (response.status === 404) {
          setLoading(false)
          setFound(false)
          return
        }

        setVideos(response.data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return (
    <>
      <SearchBar />

      {loading ? (
        <Loading />
      ) : found ? (
        <VideoContainer>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </VideoContainer>
      ) : (
        <NotFound label={"Videos"} />
      )}
    </>
  )
}

export default Home
