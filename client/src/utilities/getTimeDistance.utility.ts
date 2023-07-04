const units = [
  {
    label: 's',
    getValue: (miliseconds: number) => miliseconds / 1000,
  },
  {
    label: 'm',
    getValue: (miliseconds: number) => miliseconds / (1000 * 60),
  },
  {
    label: 'h',
    getValue: (miliseconds: number) => miliseconds / (1000 * 60 * 60),
  },
]

const getTimeDistance = (date: Date) => {
  const miliseconds = new Date(date).getTime()

  let result: string = `${miliseconds}ms`

  for (let x = 0; x < units.length; x++) {
    const unit = units[x]

    const difference = Date.now() - miliseconds
    const value = unit.getValue(difference)

    if (value < 1) break

    result = `${Math.floor(value)}${unit.label}`
  }

  return result
}

export default getTimeDistance
