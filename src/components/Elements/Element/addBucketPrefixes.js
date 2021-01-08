
const bucketUrlPrefix = 'https://alfabetiza.s3-sa-east-1.amazonaws.com/'
const addBucketPrefix = (relativeUri) =>
  relativeUri ? bucketUrlPrefix + relativeUri : null
const addBucketPrefixToWords = (words) =>
  words.map((word) => ({
    ...word,
    urlWord: addBucketPrefix(word.urlWord),
    urlRightAnswerExplanation: addBucketPrefix(word.urlRightAnswerExplanation),
    urlWrongAnswerExplanation: addBucketPrefix(word.urlWrongAnswerExplanation),
  }))

export const addBucketPrefixes = ({ audioUrls, urlVideo, words }) => {
  const fullUrlWords = words && addBucketPrefixToWords(words)
  const fullaudioUrls = audioUrls && audioUrls.map(addBucketPrefix)
  const fullUrlVideo = addBucketPrefix(urlVideo)
  return { fullaudioUrls, fullUrlVideo, fullUrlWords }
}
