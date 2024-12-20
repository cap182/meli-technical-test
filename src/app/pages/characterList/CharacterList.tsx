import React, { useEffect, useState } from "react"
import { useGetCharactersQuery } from "../../slices/rickAndMortyApiSlice"
import CharacterCard from "../../components/characterCard/CharacterCard"
import LoadingScreen from "../../components/loadingScreen/LoadingScreen"
import MessagePage from "../../components/messagePage/MessagePage"
import styles from "./styles.module.css"
import { MESSAGES } from "../../constants/constants"
import SearchBar from "../../components/searchBar/SearchBar"
import Paginator from "../../components/paginator/Paginator"

const CharacterList = () => {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({ name: "", species: "", status: "" })

  const { data, error, isLoading } = useGetCharactersQuery({ page, ...filters })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  if (isLoading) return <LoadingScreen />
  if (error && error && "status" in error && error.status !== 404)
    return <MessagePage message={MESSAGES.ERROR.GENERIC} />

  return (
    <>
      <div className={styles.searchBarContainer}>
        <SearchBar
          onSearch={newFilters => {
            setFilters(newFilters)
            setPage(1)
          }}
        />
      </div>
      {error && "status" in error && error.status === 404 ? (
        <MessagePage message={MESSAGES.ERROR.CHARACTER_NOT_FOUND} />
      ) : (
        <div>
          <div className={styles.cardsContainer}>
            {data?.results.map(character => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                status={character.status}
                species={character.species}
                image={character.image}
              />
            ))}
          </div>
          <div className={styles.searchBarContainer}>
            {data ? (
              <Paginator
                currentPage={page}
                totalPages={data.info.pages}
                hasNextPage={!!data.info.next}
                onPrevious={() => setPage(prev => prev - 1)}
                onNext={() => setPage(prev => prev + 1)}
                onPageSelect={selectedPage => setPage(selectedPage)}
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}

export default CharacterList
