import { type IRepo } from '../../api/repos.ts'
import './ReposList.styles.css'
import { RepoInfo } from '../RepoInfo/RepoInfo.tsx'
import { Repo } from '../Repo/Repo.tsx'
import { useRepos } from '../../hooks/useRepos.ts'
import { Pagination } from '../Pagination/Pagination.tsx'

export const ReposList = () => {
  const {
    repos,
    selectedRepo,
    isReposLoading,
    isRepoInfoLoading,
    handleRepoClick,
    closeRepoInfo,
    handlePageChange
  } = useRepos()

  return (
    <div className="container">
      <h1>GitHub Repositories</h1>
      <div className="repos-container">
        <div className="left-frame">
          {isReposLoading && <div className="loading">Loading...</div>}
          {!isReposLoading && (
            <ul>
              {repos.repositories.map((repo: IRepo) => (
                <li onClick={async () => { await handleRepoClick(repo.id) }} key={repo.id}>
                  <Repo {...repo} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="right-frame">
          {!selectedRepo && (
            <div>
              Click on a repository to see details
            </div>
          )}
          {isRepoInfoLoading && <div className="loading">Loading...</div>}
          {!isRepoInfoLoading && (
            <RepoInfo selectedRepo={selectedRepo} closeRepoInfo={closeRepoInfo}/>
          )}
        </div>
      </div>
      <Pagination
        totalItems={repos.totalItems}
        itemsPerPage={repos.itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
