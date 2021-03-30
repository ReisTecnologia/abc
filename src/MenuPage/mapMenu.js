export const mapMenu = (menu) => ({
  elements: menu.elements.map(({ lessonId }) => ({
    lessonId,
  })),
})
