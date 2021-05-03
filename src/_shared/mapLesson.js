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
    const { type, audios, description, words, conclusionAudio } = el
    return { type, audios, description, words, conclusionAudio }
  },
  ClickLetterInTheTextTask: (el) => {
    const { type, audios, description, correctLetters, text } = el
    return { type, audios, description, correctLetters, text }
  },
  ItemsAndAudios: (el) => {
    const { type, description, initialAudio, conclusionAudio, items } = el
    return { type, description, initialAudio, conclusionAudio, items }
  },
  ItemsAndWords: (el) => {
    const {
      type,
      description,
      initialAudio,
      conclusionAudio,
      item,
      correctLetters,
    } = el
    return {
      type,
      description,
      initialAudio,
      conclusionAudio,
      item,
      correctLetters,
    }
  },
}

export const mapLesson = (lesson) => {
  return {
    ...lesson,
    elements: lesson.elements.map((element) => {
      return mappers[element.type](element)
    }),
  }
}
