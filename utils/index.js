export function getColorFromCategory(category) {
  const categoryColorMap = {
    Personal: 'red',
    Reviews: 'green',
    Technical: 'indigo',
  }

  let color = 'green'
  if (Object.keys(categoryColorMap).includes(cGategory)) {
    color = categoryColorMap[category]
  }

  return color
}
