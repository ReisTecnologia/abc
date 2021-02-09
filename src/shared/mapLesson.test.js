import { mapLesson } from './mapLesson'

const lesson = {
  id: 'a',
  name: 'letra A',
  elements: [
    {
      audios: [
        {
          name:
            'Cada letra tem forma e tem som. A forma é a escrita da letra, o som é como falamos ela.',
          url: '1.m4a',
        },
      ],
      audioUrls: null,
      correctLetters: null,
      description: '',
      letter: null,
      text: null,
      type: 'Audio',
      urlVideo: null,
      videos: null,
      words: null,
    },
    {
      audios: [
        {
          name: 'Essa aqui é a forma da letra A',
          url: '2.m4a',
        },
      ],
      audioUrls: null,
      correctLetters: null,
      description: '',
      letter: 'A',
      text: null,
      type: 'LetterAndAudio',
      urlVideo: null,
      videos: null,
      words: null,
    },
    {
      audios: null,
      audioUrls: null,
      correctLetters: null,
      description: 'Boca falando o som "á"',
      letter: null,
      text: null,
      type: 'Video',
      urlVideo: null,
      videos: [
        {
          name: 'video um',
          url: 'a___2a5ebe4b-ee3e-4b98-a396-0f47e5debfbb.mp4',
        },
      ],
      words: null,
    },
    {
      audios: [
        {
          name:
            'Agora vou falar algumas palavras. Repita cada palavra que você ouvir em voz alta e aperte nessa imagem se a palavra iniciar com a letra A.',
          url: '9.m4a',
        },
        {
          name: 'E aperte nessa imagem se a palavra não iniciar com a letra A.',
          url: '10.m4a',
        },
        {
          name:
            'Caso a resposta esteja certa, a imagem vai ficar verde. Se for a resposta errada, a imagem vai ficar vermelha.',
          url: '11.m4a',
        },
      ],
      audioUrls: null,
      correctLetters: null,
      description: '',
      letter: null,
      text: null,
      type: 'CheckFirstLetter',
      urlVideo: null,
      videos: null,
      words: [
        {
          startsWithTheLetter: true,
          urlRightAnswerExplanation:
            'a___01928d91-f3cb-4e5d-bf0b-e8433dd830cc.m4a',
          urlWord: 'a___35efce3a-d846-4e74-a2fe-78d1b9e855cf.m4a',
          urlWrongAnswerExplanation: '13.m4a',
          word: 'beleza',
        },
        {
          startsWithTheLetter: true,
          urlRightAnswerExplanation: 'sininho.m4a',
          urlWord: '14.m4a',
          urlWrongAnswerExplanation: '15.m4a',
          word: 'alimento',
        },
      ],
    },
    {
      audios: [
        {
          name:
            'Será que você já está sabendo identificar a letra A nas palavras? No texto abaixo clique em todas as palavras que começam com A (Se você acertar, ela vai ficar verde, senão, ela vai ficar vermelha)',
          url: '31.m4a',
        },
      ],
      audioUrls: null,
      correctLetters: ['a'],
      description: '',
      letter: null,
      text:
        'Arabela abria uma u\n a janela.\nCarolina erguia\na cortina.\nE Maria olhava\ne sorria:\n"Bom dia!"',
      type: 'ClickLetterInTheTextTask',
      urlVideo: null,
      videos: null,
      words: null,
    },
  ],
}

const result = mapLesson(lesson)
const expectedValue = {
  id: 'a',
  name: 'letra A',
  elements: [
    {
      type: 'Audio',
      audios: [
        {
          name:
            'Cada letra tem forma e tem som. A forma é a escrita da letra, o som é como falamos ela.',
          url: '1.m4a',
        },
      ],
      description: '',
    },
    {
      type: 'LetterAndAudio',
      audios: [
        {
          name: 'Essa aqui é a forma da letra A',
          url: '2.m4a',
        },
      ],
      letter: 'A',
      description: '',
    },
    {
      type: 'Video',
      videos: [
        {
          name: 'video um',
          url: 'a___2a5ebe4b-ee3e-4b98-a396-0f47e5debfbb.mp4',
        },
      ],
      description: 'Boca falando o som "á"',
    },
    {
      type: 'CheckFirstLetter',
      audios: [
        {
          name:
            'Agora vou falar algumas palavras. Repita cada palavra que você ouvir em voz alta e aperte nessa imagem se a palavra iniciar com a letra A.',
          url: '9.m4a',
        },
        {
          name: 'E aperte nessa imagem se a palavra não iniciar com a letra A.',
          url: '10.m4a',
        },
        {
          name:
            'Caso a resposta esteja certa, a imagem vai ficar verde. Se for a resposta errada, a imagem vai ficar vermelha.',
          url: '11.m4a',
        },
      ],
      description: '',
      words: [
        {
          startsWithTheLetter: true,
          urlRightAnswerExplanation:
            'a___01928d91-f3cb-4e5d-bf0b-e8433dd830cc.m4a',
          urlWord: 'a___35efce3a-d846-4e74-a2fe-78d1b9e855cf.m4a',
          urlWrongAnswerExplanation: '13.m4a',
          word: 'beleza',
        },
        {
          startsWithTheLetter: true,
          urlRightAnswerExplanation: 'sininho.m4a',
          urlWord: '14.m4a',
          urlWrongAnswerExplanation: '15.m4a',
          word: 'alimento',
        },
      ],
    },
    {
      type: 'ClickLetterInTheTextTask',
      audios: [
        {
          name:
            'Será que você já está sabendo identificar a letra A nas palavras? No texto abaixo clique em todas as palavras que começam com A (Se você acertar, ela vai ficar verde, senão, ela vai ficar vermelha)',
          url: '31.m4a',
        },
      ],
      correctLetters: ['a'],
      text:
        'Arabela abria uma u\n a janela.\nCarolina erguia\na cortina.\nE Maria olhava\ne sorria:\n"Bom dia!"',
    },
  ],
}
if (JSON.stringify(result) == JSON.stringify(expectedValue)) {
  console.log('ok')
} else {
  console.error('****************** failed *********************')
}
