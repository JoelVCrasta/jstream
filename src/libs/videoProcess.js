import { Readable } from "stream"

export function bufferToStream(buffer) {
  const readable = new Readable()
  readable.push(buffer)
  readable.push(null)
  return readable
}

export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`
}
