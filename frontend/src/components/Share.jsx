import { useState } from "react"
import { Twitter, Mail, X } from "lucide-react"

const Share = ({ video, closeShareMenu }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-[#333] w-1/5 h-auto p-4 rounded-lg">
        <div className="mb-2">
          <div className="relative">
            <h2 className="text-center text-xl mb-2">Share this video</h2>
            <button
              onClick={closeShareMenu}
              className="absolute top-0.5 right-0"
            >
              <X size={24} />
            </button>
          </div>
          <button
            className="text-white bg-violet-500 w-full py-2 rounded-lg"
            onClick={handleCopyLink}
          >
            {copied ? "Link copied!" : "Copy link"}
          </button>
        </div>

        <hr className="border-violet-500" />

        <div className="flex gap-2">
          <a
            href={`https://twitter.com/intent/tweet?text=${video.title}&url=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center bg-violet-500 text-white w-full py-2 rounded-lg mt-2"
          >
            <Twitter size={24} />
          </a>

          <a
            href={`mailto:?subject=${video.title}&body=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center bg-violet-500 text-white w-full py-2 rounded-lg mt-2"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Share
