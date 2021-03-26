export const mapMenu = (menu) => ({
  elements: menu.elements.map(({ initials, lessonId, image }) => ({
    initials,
    lessonId,
    image,
  })),
})
