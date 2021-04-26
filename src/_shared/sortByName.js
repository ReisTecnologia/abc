export const sortByName = (array) =>
  array.slice().sort((a, b) => a.name.localeCompare(b.name))
