import isEqual from 'lodash.isequal'

export const addOrRemoveFromArray = (
  clickedWords,
  clickedWordAddress,
  setClickedWords
) => {
  const indexOfExistentWord = clickedWords.findIndex((wordAddress) =>
    isEqual(wordAddress, clickedWordAddress)
  )

  if (indexOfExistentWord !== -1) {
    setClickedWords(
      clickedWords.filter((_, index) => index !== indexOfExistentWord)
    )
  } else {
    setClickedWords([...clickedWords, clickedWordAddress])
  }
}
