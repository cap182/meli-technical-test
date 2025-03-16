import React, { useEffect, useState } from "react"
import { useGetCharactersQuery } from "../../slices/rickAndMortyApiSlice"
import CharacterCard from "../../components/characterCard/CharacterCard"
import LoadingScreen from "../../components/loadingScreen/LoadingScreen"
import MessagePage from "../../components/messagePage/MessagePage"
import styles from "./styles.module.css"
import { BASE_URLS, MESSAGES } from "../../constants/constants"
import SearchBar from "../../components/searchBar/SearchBar"
import Paginator from "../../components/paginator/Paginator"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { changeFilters } from "../../slices/filtersSlice"

const CharacterList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const actualFilters = useSelector((state: RootState) => state.filters)

  const [page, setPage] = useState(actualFilters.page)
  // const [filters, setFilters] = useState({
  //   name: actualFilters.name,
  //   species: actualFilters.species,
  //   status: actualFilters.status,
  // })

  const { data, error, isLoading } = useGetCharactersQuery({ ...actualFilters })
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    dispatch(changeFilters({ ...actualFilters, page: page }))
  }, [page])

  // useEffect(() => {
  //   setPage(1)
  // }, [actualFilters])

  if (isLoading) return <LoadingScreen />
  if (error && error && "status" in error && error.status !== 404)
    return <MessagePage message={MESSAGES.ERROR.GENERIC} />

  return (
    <>
      <div className={styles.searchBarContainer}>
        <SearchBar
          onSearch={newFilters => {
            // dispatch(changeFilters({ ...newFilters, page: 1 }))
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
                onPageSelect={selectedPage => selectedPage <= data.info.pages ? setPage(selectedPage): null}
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}

export default CharacterList
