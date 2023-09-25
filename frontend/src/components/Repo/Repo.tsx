import { type IRepo } from '../../api/repos.ts'
import './Repo.styles.css'
import { UserIcon } from '../assets/UserIcon.tsx'
import { SizeIcon } from '../assets/SizeIcon.tsx'

export const Repo = ({
  repoName,
  repoSize,
  repoOwner
}: IRepo) => {
  return (
    <div className="repo">
      <div>
        <h2>{repoName}</h2>
        <div className="meta-info">
          <SizeIcon/>
          <span>{repoSize} KB</span>
        </div>
        <div className="meta-info">
          <UserIcon/>
          <span>{repoOwner}</span>
        </div>
      </div>
    </div>
  )
}
