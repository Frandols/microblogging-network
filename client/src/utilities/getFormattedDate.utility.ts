const getFormattedDate = (postDate: Date) => {
  const date = new Date(postDate)
  const adjustedDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60 * 1000
  )

  const hours = adjustedDate.getHours()
  const minutes = adjustedDate.getMinutes()

  return `${hours}:${minutes} · ${adjustedDate.toLocaleDateString('en-us', {
    day: 'numeric',
    weekday: 'short',
    year: 'numeric',
  })}`
}

export default getFormattedDate
