const filterByParagraph = (filteredParagraphIndex) => ({ paragraphIndex }) =>
  paragraphIndex === filteredParagraphIndex

export const getParagraphWordsIndexes = (clickedWords, paragraphIndex) =>
  clickedWords
    .filter(filterByParagraph(paragraphIndex))
    .map(({ wordIndex }) => wordIndex)
