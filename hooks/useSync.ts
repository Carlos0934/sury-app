import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { findClients, findItems } from '../redux/sync'

export const useSync = () => {
  const dispatch = useAppDispatch()
  const { clients, items } = useAppSelector((state) => state.sync)
  const loading = clients.loading || items.loading
  const sync = useCallback(() => {
    dispatch(findClients())
    dispatch(findItems())
  }, [dispatch])

  return { sync, loading }
}
