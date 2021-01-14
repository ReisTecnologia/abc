import { useState, useCallback } from 'react'

export const useCompleteState = ({ onComplete, actual = false }) => {
  const [complete, setComplete] = useState(false)
  const doComplete = useCallback(() => {
    onComplete && onComplete({ actual })
    setComplete(true)
  }, [setComplete, onComplete, actual])
  return { complete, doComplete }
}
