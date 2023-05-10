export function getColorFromCategory(category: string) {
  const categoryColorMap = {
    Personal: 'red',
    Reviews: 'green',
    Technical: 'indigo',
    Magic: 'amber',
  }

  let color = 'green'
  if (Object.keys(categoryColorMap).includes(category)) {
    color = categoryColorMap[category]
  }

  return color
}
