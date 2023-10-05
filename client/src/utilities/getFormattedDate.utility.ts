const getFormattedDate = (postDate: Date): string => {
  const date = new Date(postDate)

  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes} · ${date.toLocaleDateString('en-us', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`
}

export default getFormattedDate
