import { useAppSelector } from '../redux/store'
import { useSearch } from './useSearch'

export const useSearchItem = () => {
  const data = useAppSelector((state) => state.sync.items.data)
  const { handleChange, result, search } = useSearch(data, (item, text) =>
    (item.name + item.price + item.code )
      .toLowerCase()
      .includes(text.toLowerCase())
  )
  

  return { handleChange, result, search }
}
