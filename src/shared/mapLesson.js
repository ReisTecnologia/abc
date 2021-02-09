const mappers = {
  Audio: (el) => {
    const { type, audios, description } = el
    return { type, audios, description }
  },
  LetterAndAudio: (el) => {
    const { type, audios, letter, description } = el
    return { type, audios, letter, description }
  },
  Video: (el) => {
    const { type, videos, description } = el
    return { type, videos, description }
  },
  CheckFirstLetter: (el) => {
    const { type, audios, description, words } = el
    return { type, audios, description, words }
  },
  ClickLetterInTheTextTask: (el) => {
    const { type, audios, correctLetters, text } = el
    return { type, audios, correctLetters, text }
  },
}

export const mapLesson = (lesson) => {
  return {
    ...lesson,
    elements: lesson.elements.map((element) => {
      console.log('>>>', element.type)
      return mappers[element.type](element)
    }),
  }
}
