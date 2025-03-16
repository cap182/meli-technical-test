import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"

interface PaginatorProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  onPrevious: () => void
  onNext: () => void
  onPageSelect: (page: number) => void
}

const Paginator = ({
  currentPage,
  totalPages,
  hasNextPage,
  onPrevious,
  onNext,
  onPageSelect,
}: PaginatorProps) => {
  const [searchingPage, setSearchingPage] = useState<number>(currentPage)
  useEffect(() => {
    setSearchingPage(currentPage)
  }
  , [currentPage])
  
  const getVisiblePages = () => {
    const pages: (number | string)[] = []

    if (currentPage !== 1) {
      pages.push(1)
    }

    if (currentPage > 3) {
      pages.push("...")
    }

    if (currentPage > 2) {
      pages.push(currentPage - 1)
    }
    pages.push(currentPage)

    if (currentPage < totalPages) {
      if (currentPage + 1 < totalPages) {
        pages.push(currentPage + 1)
      }
    }

    if (currentPage + 2 < totalPages) {
      pages.push("...")
    }

    if (currentPage !== totalPages) {
      pages.push(totalPages)
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <div className={styles.paginationsContainer}>
      <div className={styles.paginationContainer}>
        <button
          className={styles.paginationButton}
          disabled={currentPage <= 1}
          onClick={onPrevious}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {visiblePages.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              className={`${styles.pageButton} ${
                page === currentPage ? styles.activePage : ""
              }`}
              onClick={() => onPageSelect(page)}
            >
              {page}
            </button>
          ) : (
            <span key={index} className={styles.separator}>
              {page}
            </span>
          ),
        )}
        <button
          className={styles.paginationButton}
          disabled={currentPage >= totalPages}
          onClick={onNext}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <div className={styles.paginationContainer}>
        <input
          className={styles.pageInput}
          type="text"
          value={searchingPage}
          onChange={e =>
            setSearchingPage(e.target.value ? parseInt(e.target.value) : 1)
          }
        />

        <button
          className={styles.paginationButton}
          onClick={() => onPageSelect(searchingPage)}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  )
}

export default Paginator
