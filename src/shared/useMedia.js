import { useEffect, useState, useRef, useCallback } from 'react'

export const useMedia = ({ media, onComplete }) => {
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paused, setPaused] = useState(false)
  const listeners = useRef({
    loadeddata: null,
    play: null,
    ended: null,
    pause: null,
  })

  useEffect(() => {
    if (listeners.current.loadeddata) {
      media.removeEventListener('loadeddata', listeners.current.loadeddata)
      media.removeEventListener('play', listeners.current.play)
      media.removeEventListener('ended', listeners.current.ended)
      media.removeEventListener('pause', listeners.current.pause)
    }
    listeners.current.loadeddata = () => {
      setLoading(false)
    }
    listeners.current.play = () => {
      setPlaying(true)
    }
    listeners.current.ended = () => {
      setPlaying(false)
      onComplete()
    }
    listeners.current.pause = () => {
      setPlaying(false)
      setPaused(true)
    }

    if (media) {
      media.addEventListener('loadeddata', listeners.current.loadeddata)
      media.addEventListener('play', listeners.current.play)
      media.addEventListener('ended', listeners.current.ended)
      media.addEventListener('pause', listeners.current.pause)
    }
  }, [media, onComplete])

  const play = useCallback(() => {
    if (!loading) {
      if (playing) {
        media.pause()
      } else {
        if (paused) {
          media.currentTime = 0
        }
        media.play()
      }
    }
  }, [loading, media, paused, playing])

  return {
    play,
    playing,
    loading,
  }
}
