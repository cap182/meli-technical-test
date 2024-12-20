import React from "react"
import styles from "./styles.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

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
      pages.push(currentPage + 1)
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

      {/* Botón Siguiente */}
      <button
        className={styles.paginationButton}
        disabled={currentPage >= totalPages}
        onClick={onNext}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  )
}

export default Paginator
