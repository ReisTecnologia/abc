export const emptyElementTemplates = {
  Audio: {
    type: 'Audio',
    audios: [],
    description: '',
  },
  Video: {
    type: 'Video',
    videos: [],
    description: '',
  },
  LetterAndAudio: {
    type: 'LetterAndAudio',
    audios: [],
    letter: '',
    description: '',
  },
  CheckFirstLetter: {
    type: 'CheckFirstLetter',
    audios: [],
    description: '',
    words: [],
    conclusionAudio: {},
  },
  ClickLetterInTheTextTask: {
    type: 'ClickLetterInTheTextTask',
    audios: [],
    correctLetters: [],
    text: '',
    description: '',
  },
  ItemsAndAudios: {
    type: 'ItemsAndAudios',
    initialAudio: {},
    description: '',
    conclusionAudio: {},
    items: [],
  },
  ImagesAndWords: {
    type: 'ImagesAndWords',
    initialAudio: {},
    description: '',
    conclusionAudio: {},
    exercises: [
      {
        word: 'exemplo',
        imageUrl: '',
        options: ['a', 'b', 'c', 'd', 'p'],
        correctAnswer: ['p'],
      },
    ],
  },
}
