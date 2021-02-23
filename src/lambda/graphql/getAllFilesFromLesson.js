export const getAllFilesFromLesson = (lesson) => {
  let files = []
  const audios = lesson.elements
    .map(({ audios }) => audios.map(({ url }) => url))
    .flat()
  const videos = lesson.elements
    .map(({ videos }) => videos.map(({ url }) => url))
    .flat()
  files = [...files, ...audios, ...videos]

  return files
}
