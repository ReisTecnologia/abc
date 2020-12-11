import isEqual from 'lodash.isequal'

export const addOrRemoveFromArray = (
  clickedLetters,
  clickedLetterAddress,
  setClickedLetters
) => {
  const indexOfExistentLetter = clickedLetters.findIndex((letterAddress) =>
    isEqual(letterAddress, clickedLetterAddress)
  )

  if (indexOfExistentLetter !== -1) {
    setClickedLetters(
      clickedLetters.filter((_, index) => index !== indexOfExistentLetter)
    )
  } else {
    setClickedLetters([...clickedLetters, clickedLetterAddress])
  }
}
