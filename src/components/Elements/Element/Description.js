import React, { useState } from 'react'
import styled from 'styled-components'

const Text = styled.div`
  padding: 0px 21px;
  color: #ccc;
  text-align: left;
`

export const Description = ({elementParams}) => {
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
