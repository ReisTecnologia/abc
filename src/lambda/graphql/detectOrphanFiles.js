export const detectOrphanFiles = (dbLessonFiles, bucketFiles) => {
  const orphanFiles = []
  bucketFiles.forEach(
    (file) => !dbLessonFiles.includes(file) && orphanFiles.push(file)
  )
  return orphanFiles
}
