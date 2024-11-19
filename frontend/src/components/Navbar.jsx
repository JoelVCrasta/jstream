import { useState } from "react"
import { Plus } from "lucide-react"
import Button from "./Button"
import UploadModal from "./UploadModal"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const openUploadModal = () => setIsUploadModalOpen(true)
  const closeUploadModal = () => setIsUploadModalOpen(false)

  return (
    <>
      {isUploadModalOpen && <UploadModal closeUploadModal={closeUploadModal} />}

      <section className="flex justify-between px-60 py-6 m-2 bg-zinc-800 rounded-xl">
        <div>
          <h1
            onClick={() => navigate("/")}
            className="text-4xl text-violet-500 cursor-pointer"
          >
            JStream
          </h1>
        </div>

        <div>
          <Button
            label="Create"
            icon={<Plus />}
            clickAction={openUploadModal}
          />
        </div>
      </section>
    </>
  )
}

export default Navbar
