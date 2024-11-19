import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  parseISO,
} from "date-fns"

export const daysFromUpload = (createdAt) => {
  const parsedDate = parseISO(createdAt)
  const now = new Date()

  const minutesFromUpload = differenceInMinutes(now, parsedDate)
  const hoursFromUpload = differenceInHours(now, parsedDate)
  const daysFromUpload = differenceInDays(now, parsedDate)

  let timeFromUpload
  if (minutesFromUpload < 60) {
    timeFromUpload = `${minutesFromUpload} ${
      minutesFromUpload > 1 ? "minutes" : "minute"
    }`
  } else if (hoursFromUpload < 24) {
    timeFromUpload = `${hoursFromUpload} ${
      hoursFromUpload > 1 ? "hours" : "hour"
    }`
  } else {
    timeFromUpload = `${daysFromUpload} ${daysFromUpload > 1 ? "days" : "day"}`
  }

  return timeFromUpload
}
