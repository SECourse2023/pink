import { useCallback, useEffect, useState } from 'react'

/// 从 localStorage 中同步状态
/// 使用此 hook 后，不应直接设置对应的 localStorage 值，否则会导致同步失效
export default function useLocalStorage(
  key: string,
  defaultValue: string
): [string, (value: string) => void] {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) ?? defaultValue
    }
    return defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}
