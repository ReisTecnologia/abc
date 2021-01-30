const bucketUrlPrefix = `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/`

const addBucketPrefix = (relativeUri) =>
  relativeUri ? bucketUrlPrefix + relativeUri : null
const addBucketPrefixToWords = (words) =>
  words.map((word) => ({
    ...word,
    urlWord: addBucketPrefix(word.urlWord),
    urlRightAnswerExplanation: addBucketPrefix(word.urlRightAnswerExplanation),
    urlWrongAnswerExplanation: addBucketPrefix(word.urlWrongAnswerExplanation),
  }))

export const addBucketPrefixesToElementParams = (elementParams) => {
  const { audioUrls, urlVideo, words } = elementParams
  const fullUrlWords = words && addBucketPrefixToWords(words)
  const fullAudioUrls = audioUrls && audioUrls.map(addBucketPrefix)
  const fullUrlVideo = addBucketPrefix(urlVideo)

  return {
    ...elementParams,
    audioUrls: fullAudioUrls,
    urlVideo: fullUrlVideo,
    words: fullUrlWords,
  }
}
