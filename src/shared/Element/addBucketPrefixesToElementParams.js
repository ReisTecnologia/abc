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
  const { audioUrls, urlVideo, words, conclusionAudio } = elementParams
  const fullUrlWords = words && addBucketPrefixToWords(words)
  const fullAudioUrls = audioUrls && audioUrls.map(addBucketPrefix)
  const fullUrlVideo = addBucketPrefix(urlVideo)
  const fullUrlConclusionAudio =
    conclusionAudio && addBucketPrefix(conclusionAudio)

  return {
    ...elementParams,
    audioUrls: fullAudioUrls,
    audios: elementParams.audios
      ? elementParams.audios.map(({ url, ...rest }) => ({
          url: addBucketPrefix(url),
          ...rest,
        }))
      : [],
    urlVideo: fullUrlVideo,
    words: fullUrlWords,
    conclusionAudio: fullUrlConclusionAudio,
  }
}
