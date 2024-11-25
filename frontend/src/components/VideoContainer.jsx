import React from "react"

const VideoContainer = ({ children }) => {
  return (
    <div className="mx-2 my-14 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
      {children}
    </div>
  )
}

export default VideoContainer
