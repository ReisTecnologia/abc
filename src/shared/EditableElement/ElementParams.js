import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AudioInput } from './AudioInput'

const Text = styled.div`
  padding: 0px 21px;
  color: #ccc;
  text-align: left;
`

export const ElementParams = ({ elementParams }) => {
  const { type, description, audioUrls, urlVideo } = elementParams
  return (
    <Text>
      <b>{type}</b> - {description}
      <br /> <b>Audio Urls</b>:
      {audioUrls ? (
        audioUrls.map((audioUrl, audioUrlKey) => (
          <AudioInput audioUrl={audioUrl} key={audioUrlKey} />
        ))
      ) : (
        <AudioInput audioUrl={null} />
      )}
      <br />
      <b>urlVideo</b>: {urlVideo}
    </Text>
  )
}

ElementParams.propTypes = {
  id: PropTypes.string.isRequired,
  elementParams: PropTypes.shape({
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    audioUrls: PropTypes.arrayOf(PropTypes.string.isRequired),
    urlVideo: PropTypes.string.isRequired,
  }),
}
