
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

export const addBucketPrefixes = ({ urlAudios, urlVideo, words }) => {
  const fullUrlWords = words && addBucketPrefixToWords(words)
  const fullUrlAudios = urlAudios && urlAudios.map(addBucketPrefix)
  const fullUrlVideo = addBucketPrefix(urlVideo)
  console.log("addBucketPrefixes -> fullUrlVideo", fullUrlVideo)
  return { fullUrlAudios, fullUrlVideo, fullUrlWords }
}
