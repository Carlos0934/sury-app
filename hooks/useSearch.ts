import { useCallback, useMemo, useState } from 'react'

export const useSearch = <T>(
  data: T[],
  predicate: (value: T, text: string) => boolean
) => {
  const [search, setSearch] = useState<string>()
  const handleChange = useCallback(
    (text: string) => {
      setSearch(text)
    },
    [setSearch]
  )
  const result = useMemo(
    () => (search ? data.filter((value) => predicate(value, search)) : data),
    [predicate, data, search]
  )
  return { handleChange, result }
}
