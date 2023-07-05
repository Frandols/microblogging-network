const getFormattedDate = (postDate: Date) => {
  const date = new Date(
    new Date(postDate).getTime() -
      new Date(postDate).getTimezoneOffset() * 60 * 1000
  )

  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${hours}:${minutes} · ${date.toLocaleDateString('en-us', {
    day: 'numeric',
    weekday: 'short',
    year: 'numeric',
  })}`
}

export default getFormattedDate
