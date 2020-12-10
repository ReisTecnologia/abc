import { useState, useCallback } from 'react'

export const useCompleteState = ({ onComplete, actual = false }) => {
  console.log('useCompleteState', onComplete)
  const [complete, setComplete] = useState(false)
  const doComplete = useCallback(() => {
    console.log('doComplete...', onComplete)
    onComplete && onComplete({ actual })
    setComplete(true)
  }, [setComplete])
  return { complete, doComplete }
}
