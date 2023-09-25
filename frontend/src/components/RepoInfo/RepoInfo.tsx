import { type ISelectedRepo } from '../../api/repos.ts'
import './RepoInfo.styles.css'

interface IRepoInfoProps {
  selectedRepo: ISelectedRepo | null
  closeRepoInfo: () => void
}

export const RepoInfo = ({ selectedRepo, closeRepoInfo }: IRepoInfoProps) => {
  if (!selectedRepo) {
    return null
  }

  return (
    <div className="repo-details">
      <button onClick={closeRepoInfo}>X</button>
      <h2>{selectedRepo.repoName}</h2>
      <p>Repo owner: {selectedRepo.repoOwner}</p>
      <p className={selectedRepo.isPrivate ? 'private' : 'public'}>
        {selectedRepo.isPrivate
          ? 'This is a private repository'
          : 'This is a public repository'
        }
      </p>
      <p>Number of files: {selectedRepo.numberOfFiles}</p>
      <p>File content: {selectedRepo.fileContent}</p>
    </div>
  )
}
