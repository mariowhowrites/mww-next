export function getColorFromCategory(category: string) {
  const categoryColorMap = {
    Personal: 'red',
    Reviews: 'green',
    Technical: 'indigo',
  }

  let color = 'green'
  if (Object.keys(categoryColorMap).includes(category)) {
    color = categoryColorMap[category]
  }

  return color
}
