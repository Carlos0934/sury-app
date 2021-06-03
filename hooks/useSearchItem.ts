import { useAppSelector } from '../redux/store'
import { useSearch } from './useSearch'

export const useSearchItem = () => {
  const { data } = useAppSelector((state) => state.sync.items)
  const { handleChange, result } = useSearch(data, (item, text) =>
    (item.name + item.price + item.code  + item.id)
      .toLowerCase()
      .includes(text.toLowerCase())
  )

  return { handleChange, result }
}
