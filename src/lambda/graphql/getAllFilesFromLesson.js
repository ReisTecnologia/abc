export const getAllFilesFromLesson = (lesson) => {
  let files = []
  const audios = lesson.elements
    .map(({ audios }) => (audios ? audios.map(({ url }) => url) : null))
    .flat()
  const videos = lesson.elements
    .map(({ videos }) => (videos ? videos.map(({ url }) => url) : null))
    .flat()
  const initialAudios = lesson.elements
    .map(({ initialAudio }) => (initialAudio ? initialAudio.url : null))
    .flat()

  const conclusionAudios = lesson.elements
    .map(({ conclusionAudio }) =>
      conclusionAudio ? conclusionAudio.url : null
    )
    .flat()

  const items = lesson.elements
    .map(({ items }) =>
      items ? items.map(({ audioUrl, imageUrl }) => [audioUrl, imageUrl]) : null
    )
    .flat(2)

  const exercises = lesson.elements
    .map(({ exercises }) =>
      exercises ? exercises.map(({ imageUrl }) => imageUrl) : null
    )
    .flat()

  const words = lesson.elements
    .map(({ words }) =>
      words
        ? words.map(
            ({
              urlWord,
              urlRightAnswerExplanation,
              urlWrongAnswerExplanation,
            }) => [
              urlWord,
              urlRightAnswerExplanation,
              urlWrongAnswerExplanation,
            ]
          )
        : null
    )
    .flat(2)
  files = [
    ...files,
    ...audios,
    ...videos,
    ...initialAudios,
    ...conclusionAudios,
    ...items,
    ...exercises,
    ...words,
  ]
  const filteredFiles = files.filter((file) => file)

  return filteredFiles
}
