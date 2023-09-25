import { useCallback, useEffect, useState } from 'react'
import { getRepo, getReposList, type IReposList, type ISelectedRepo } from '../api/repos.ts'

export const useRepos = () => {
  const [repos, setRepos] = useState<IReposList>({ repositories: [], totalItems: 0, itemsPerPage: 0 })
  const [isReposLoading, setIsReposLoading] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState<ISelectedRepo | null>(null)
  const [isRepoInfoLoading, setIsRepoInfoLoading] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        setIsReposLoading(true)
        const res = await getReposList(1)
        setRepos(res)
      } catch (e) {
        console.error(e)
      } finally {
        setIsReposLoading(false)
      }
    })()
  }, [])

  const handleRepoClick = useCallback(async (id: string) => {
    try {
      setIsRepoInfoLoading(true)
      const res = await getRepo(id)
      setSelectedRepo(res)
    } catch (e) {
      console.error(e)
    } finally {
      setIsRepoInfoLoading(false)
    }
  }, [])

  const handlePageChange = useCallback(async (page: number) => {
    try {
      setIsReposLoading(true)
      const res = await getReposList(page)
      setRepos(res)
    } catch (e) {
      console.error(e)
    } finally {
      setIsReposLoading(false)
    }
  }, [])

  const closeRepoInfo = useCallback(() => { setSelectedRepo(null) }, [])

  return {
    repos,
    isReposLoading,
    selectedRepo,
    isRepoInfoLoading,
    handleRepoClick,
    closeRepoInfo,
    handlePageChange
  }
}
