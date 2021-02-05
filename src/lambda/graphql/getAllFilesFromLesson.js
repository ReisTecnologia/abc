export const getAllFilesFromLesson = (lesson) => {
  let files = []
  const audios = lesson.elements
    .map(({ audios }) => audios.map(({ url }) => url))
    .flat()
  files = [...files, ...audios]
  return files
}
