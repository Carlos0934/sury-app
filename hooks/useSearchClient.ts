import { useAppSelector } from '../redux/store'
import { useSearch } from './useSearch'

export const useSearchClient = () => {
  const { data } = useAppSelector((state) => state.sync.clients)
  const { handleChange, result } = useSearch(data, (client, text) =>
    (client.name + ' ' + client.lastname)
      .toLowerCase()
      .includes(text.toLowerCase())
  )

  return { handleChange, result }
}
