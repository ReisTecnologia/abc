import { useState, useCallback } from 'react'

export const useCompleteState = ({ onComplete }) => {
  const [complete, setComplete] = useState(false)
  const doComplete = useCallback(() => {
    onComplete && onComplete()
    setComplete(true)
  }, [setComplete, onComplete])
  return { complete, doComplete }
}
