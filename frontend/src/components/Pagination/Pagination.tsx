import { useState } from 'react'
import './Pagination.styles.css'

interface IPaginationProps {
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ totalItems, itemsPerPage, onPageChange }: IPaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    onPageChange(page)
  }

  const renderPaginationItems = () => {
    const paginationItems = []
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <li
          key={i}
          className={`pagination-item ${i === currentPage ? 'active' : ''}`}
          onClick={() => { handlePageChange(i) }}
        >
          {i}
        </li>
      )
    }
    return paginationItems
  }

  return (
    <ul className="pagination">
      <li
        className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => { handlePageChange(currentPage - 1) }}
      >
        Previous
      </li>
      {renderPaginationItems()}
      <li
        className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => { handlePageChange(currentPage + 1) }}
      >
        Next
      </li>
    </ul>
  )
}
