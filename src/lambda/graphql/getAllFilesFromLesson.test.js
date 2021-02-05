import { getAllFilesFromLesson } from './getAllFilesFromLesson'

const lesson = {
  elements: [
    {
      audios: [
        {
          name: 'primeiros',
          url:
            '311be857-6912-441d-bbd0-a6100eb4d326___b2a40cef-3a44-4d2f-8e19-a14affc8e36f.m4a',
        },
        {
          name: 'terceiro',
          url:
            '311be857-6912-441d-bbd0-a6100eb4d326___7b023516-6900-49fc-b791-eef7a7b8faca.m4a',
        },
      ],
      description: 'descrição',
      type: 'Audio',
    },
    {
      audios: [
        {
          name: 'primeiros',
          url:
            '311be857-6912-441d-bbd0-a6100eb4d326___b2a40cef-3a44-4d2f-8e19-a14affc8e36f.m4a',
        },
        {
          name: 'terceiro',
          url:
            '311be857-6912-441d-bbd0-a6100eb4d326___7b023516-6900-49fc-b791-eef7a7b8faca.m4a',
        },
      ],
      description: 'descrição',
      type: 'Audio',
    },
  ],
  id: '311be857-6912-441d-bbd0-a6100eb4d326',
  name: 'Audio',
}

const result = getAllFilesFromLesson(lesson)
console.log(result)
const expectedValue = [
  '311be857-6912-441d-bbd0-a6100eb4d326___b2a40cef-3a44-4d2f-8e19-a14affc8e36f.m4a',
  '311be857-6912-441d-bbd0-a6100eb4d326___7b023516-6900-49fc-b791-eef7a7b8faca.m4a',
  '311be857-6912-441d-bbd0-a6100eb4d326___b2a40cef-3a44-4d2f-8e19-a14affc8e36f.m4a',
  '311be857-6912-441d-bbd0-a6100eb4d326___7b023516-6900-49fc-b791-eef7a7b8faca.m4a',
]
if (JSON.stringify(result) == JSON.stringify(expectedValue)) {
  console.log('ok')
} else {
  console.error('****************** failed *********************')
}
