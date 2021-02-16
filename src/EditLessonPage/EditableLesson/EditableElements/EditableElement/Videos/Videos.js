import React from 'react'
import PropTypes from 'prop-types'
import { Video } from './Video/Video'
import { AddVideoButton } from './AddVideoButton'

const buildUpdateVideo = ({ videos, videoIndex, changeVideos }) => (
  payload
) => {
  const newVideos = [...videos]
  newVideos[videoIndex] = {
    ...videos[videoIndex],
    ...payload,
  }
  changeVideos(newVideos)
}

const buildDeleteVideo = ({ videos, videoIndex, changeVideos }) => () => {
  const newVideos = [...videos]
  newVideos.splice(videoIndex, 1)
  changeVideos(newVideos)
}

const buildChangeName = ({ videos, videoIndex, changeVideos }) => (name) => {
  const newVideos = [...videos]
  newVideos[videoIndex] = {
    ...newVideos[videoIndex],
    name,
  }
  changeVideos(newVideos)
}

export const Videos = ({ videos, changeVideos, videoFilePrefix }) => {
  const addVideo = () =>
    changeVideos([...videos, { url: '', name: 'new name' }])

  return (
    <>
      {videos &&
        videos.map(({ name, url }, videoIndex) => (
          <Video
            url={url}
            videoFilePrefix={videoFilePrefix}
            index={videoIndex}
            updateVideo={buildUpdateVideo({ videos, videoIndex, changeVideos })}
            deleteVideo={buildDeleteVideo({ videos, videoIndex, changeVideos })}
            changeName={buildChangeName({ videos, videoIndex, changeVideos })}
            name={name}
            key={url}
          />
        ))}
      {!videos[0] ? <AddVideoButton onClick={addVideo} /> : null}
    </>
  )
}

Videos.propTypes = {
  videoFilePrefix: PropTypes.string,
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  changeVideos: PropTypes.func,
}
