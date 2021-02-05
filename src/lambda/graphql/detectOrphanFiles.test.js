import { detectOrphanFiles } from './detectOrphanFiles'

const dbLessonFiles = [
  '311be857-6912-441d-bbd0-a6100eb4d326___b2a40cef-3a44-4d2f-8e19-a14affc8e36f.m4a',
  '311be857-6912-441d-bbd0-a6100eb4d326___7b023516-6900-49fc-b791-eef7a7b8faca.m4a',
  '311be857-6912-441d-bbd0-a6100eb4d326___b2a40cef-3a44-4d2f-8e19-a14affc8e36f.m4a',
  '311be857-6912-441d-bbd0-a6100eb4d326___7b023516-6900-49fc-b791-eef7a7b8faca.m4a',
  '311be857-6912-441d-bbd0-a6100eb4d326___7b023516-6900-49fc-b791-eef7a7b8faca_gaiato.m4a',
]

const bucketFiles = [
  '311be857-6912-441d-bbd0-a6100eb4d326___b2a40cef-3a44-4d2f-8e19-a14affc8e36f.m4a',
  '311be857-6912-441d-bbd0-a6100eb4d326___b2a40cef-3a44-4d2f-8e19-a14affc8e36fuuu.m4a',
  '311be857-6912-441d-bbd0-a6100eb4d326___b2a40cef-3a44-4d2f-8e19-a14affc8e36fxxx.m4a',
  '311be857-6912-441d-bbd0-a6100eb4d326___7b023516-6900-49fc-b791-eef7a7b8faca.m4a',
  '311be857-6912-441d-bbd0-a6100eb4d326___b2a40cef-3a44-4d2f-8e19-a14affc8e36f.m4a',
  '311be857-6912-441d-bbd0-a6100eb4d326___7b023516-6900-49fc-b791-eef7a7b8faca.m4a',
]

const result = detectOrphanFiles(dbLessonFiles, bucketFiles)

const expectedValue = [
  '311be857-6912-441d-bbd0-a6100eb4d326___b2a40cef-3a44-4d2f-8e19-a14affc8e36fuuu.m4a',
  '311be857-6912-441d-bbd0-a6100eb4d326___b2a40cef-3a44-4d2f-8e19-a14affc8e36fxxx.m4a',
]
if (JSON.stringify(result) == JSON.stringify(expectedValue)) {
  console.log(' >>> success <<<', expectedValue, result)
} else {
  console.error(
    '****************** failed *********************',
    expectedValue,
    result
  )
}
