import { useState, useEffect } from 'react'
import { UI } from '@/lib/constants'

/**
 * Custom hook to debounce a value
 * Delays updating the value until after the specified delay
 */
export const useDebounce = <T>(value: T, delay: number = UI.DEBOUNCE_DELAY): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
