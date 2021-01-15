import React from 'react'
import { LoadWrapper, LoadingDot } from './LoadWrapper'

export const LoadingDots = () => {
  return (
    <LoadWrapper>
      <LoadingDot delay="0s" />
      <LoadingDot delay=".1s" />
      <LoadingDot delay=".2s" />
    </LoadWrapper>
  )
}
