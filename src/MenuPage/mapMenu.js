export const mapMenu = (menu) => ({
  elements: menu.elements.map(({ initials, lessonId }) => ({
    initials,
    lessonId,
  })),
})
