export const capitalize = str => {
  return str.substring(0, 1).toUpperCase() + str.substring(1)
}

export const formatDate = date => {
  const [YYYY, MM, DD] = date.split('-')
  return [MM, DD, YYYY].join('.')
}

export const generateColorList = colors => {
  return colors.map(color => ({ value: color }))
}
