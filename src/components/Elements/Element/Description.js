import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Text = styled.div`
  padding: 0px 21px;
  color: #ccc;
  text-align: left;
`

export const Description = ({ elementParams }) => {
  const { type, description, audioUrls, urlVideo } = elementParams
  return (
    <Text>
      <b>{type}</b> - {description}
      <br />
      <b>audioUrls</b>: {audioUrls && audioUrls.join(', ')}
      <br />
      <b>urlVideo</b>: {urlVideo}
    </Text>
  )
}

Description.propTypes = {
  elementParams: PropTypes.shape({
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    audioUrls: PropTypes.arrayOf(PropTypes.string.isRequired),
    urlVideo: PropTypes.string.isRequired,
  }),
}
