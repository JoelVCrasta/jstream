import { useState } from "react"
import { X, Upload, Trash2, Loader } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"

const UploadModal = ({ closeUploadModal }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    category: "Entertainment",
    file: null,
    thumbnail: null,
  })

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDropVideo = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files[0]) {
      setUploadForm({ ...uploadForm, file: e.dataTransfer.files[0] })
    }
  }

  const handleDropThumbNail = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files[0]) {
      setUploadForm({ ...uploadForm, thumbnail: e.dataTransfer.files[0] })
    }
  }

  const validateForm = () => {
    if (
      !uploadForm.title ||
      !uploadForm.description ||
      !uploadForm.file ||
      !uploadForm.thumbnail
    ) {
      return false
    }
  }

  const clearForm = () => {
    setUploadForm({
      title: "",
      description: "",
      category: "Entertainment",
      file: null,
      thumbnail: null,
    })
  }

  async function uploadVideo() {
    setIsUploading(true)

    console.log(uploadForm)

    const isValid = validateForm()
    if (isValid === false) {
      setIsUploading(false)
      toast.error("Please fill all fields")
      return
    }

    const formData = new FormData()
    formData.append("title", uploadForm.title)
    formData.append("description", uploadForm.description)
    formData.append("video", uploadForm.file)
    formData.append("thumbnail", uploadForm.thumbnail)
    formData.append("category", uploadForm.category)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WEBSITE}/api/upload-video`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      setIsUploading(false)
      clearForm()
      closeUploadModal()
      toast.success("Video uploaded successfully")
    } catch (error) {
      setIsUploading(false)
      console.error(error)
      toast.error("Failed to upload video")
    }
  }

  return (
    <section className="fixed inset-0 bg-zinc-600/50 flex items-center justify-center z-50">
      <Toaster />
      <div className="w-1/2 h-auto bg-zinc-800 p-4 rounded-lg">
        <div className="flex justify-center p-2 mb-3 relative">
          <h1 className="text-2xl font-bold text-violet-500">Upload Video</h1>
          <X
            size={30}
            onClick={closeUploadModal}
            className="text-zinc-400 hover:text-zinc-300 transition cursor-pointer absolute right-0 top-2.5"
          />
        </div>
        <div className="text-lg gap-4 flex flex-col">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            maxLength={100}
            value={uploadForm.title}
            onChange={(e) =>
              setUploadForm({ ...uploadForm, title: e.target.value })
            }
            className="w-full h-12 bg-zinc-700 rounded-lg p-4 outline-none"
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            maxLength={500}
            value={uploadForm.description}
            onChange={(e) =>
              setUploadForm({ ...uploadForm, description: e.target.value })
            }
            className="w-full h-32 bg-zinc-700 rounded-lg p-4 outline-none resize-none"
          />

          {/* Category */}
          <select
            value={uploadForm.category}
            onChange={(e) =>
              setUploadForm({ ...uploadForm, category: e.target.value })
            }
            className="w-full h-12 bg-zinc-700 rounded-lg px-4 outline-none"
          >
            <option value="Entertainment">Entertainment</option>
            <option value="Music">Music</option>
            <option value="Education">Education</option>
            <option value="Gaming">Gaming</option>
            <option value="Sports">Sports</option>
          </select>

          {/* Video Upload */}
          <div
            className={`flex flex-col h-32 items-center justify-center border-2 border-dashed rounded-lg bg-zinc-700 text-zinc-400 font-semibold transition duration-500 ${
              uploadForm.file || isDragging
                ? "border-violet-500"
                : "border-zinc-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDropVideo}
          >
            <input
              id="fileUpload"
              type="file"
              accept="video/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setUploadForm({ ...uploadForm, file: e.target.files[0] })
                  console.log(e.target.files[0])
                }
              }}
              className="hidden"
            />

            <Upload size={50} color="#9ca3af" />
            <p className="text-lg">Video</p>
            <label htmlFor="fileUpload" className="cursor-pointer">
              Drag & Drop or{" "}
              <span className="text-violet-500 font-semibold">Choose file</span>{" "}
              to upload
            </label>
          </div>

          {/* Display file */}
          {uploadForm.file && (
            <div className="flex gap-2">
              <p className="text-sm font-mono first-letter:text-center text-violet-500 font-semibold">
                {uploadForm.file.name}
              </p>
              <button
                onClick={() => {
                  setUploadForm({ ...uploadForm, file: null })
                }}
              >
                <Trash2 size={14} color="#ef4444" />
              </button>
            </div>
          )}

          {/* Thumbnail Upload */}
          <div
            className={`flex flex-col h-32 items-center justify-center border-2 border-dashed rounded-lg bg-zinc-700 text-zinc-400 font-semibold transition duration-500 ${
              uploadForm.thumbnail || isDragging
                ? "border-violet-500"
                : "border-zinc-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDropThumbNail}
          >
            <input
              id="thumbnailUpload"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setUploadForm({ ...uploadForm, thumbnail: e.target.files[0] })
                  console.log(e.target.files[0])
                }
              }}
              className="hidden"
            />

            <Upload size={50} color="#9ca3af" />
            <p className="text-lg">Thumbnail</p>
            <label htmlFor="thumbnailUpload" className="cursor-pointer">
              Drag & Drop or{" "}
              <span className="text-violet-500 font-semibold">Choose file</span>{" "}
              to upload
            </label>
          </div>

          {/* Display thumbnail */}
          {uploadForm.thumbnail && (
            <div className="flex gap-2">
              <p className="text-sm font-mono first-letter:text-center text-violet-500 font-semibold">
                {uploadForm.thumbnail.name}
              </p>
              <button
                onClick={() => {
                  setUploadForm({ ...uploadForm, thumbnail: null })
                }}
              >
                <Trash2 size={14} color="#ef4444" />
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={uploadVideo}
            className="w-full h-12 bg-violet-500 hover:bg-violet-700 transition rounded-lg text-zinc-50 font-semibold flex justify-center items-center"
            disabled={isUploading}
          >
            {isUploading ? <Loader size={30} color="#fff" /> : "Upload Video"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default UploadModal
