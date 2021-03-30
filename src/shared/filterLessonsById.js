export const filterLessonsById = (lessonId, lessons) => {
  if (lessons.filter((lesson) => lesson.id === lessonId).length < 1)
    return [
      {
        id: 'deleted',
        name: 'deleted',
        elements: [],
        initials: '',
        image: '',
      },
    ]
  else return lessons.filter((lesson) => lesson.id === lessonId)
}
