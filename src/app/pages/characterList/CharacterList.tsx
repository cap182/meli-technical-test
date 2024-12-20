import React, { useEffect, useState } from "react"
import { useGetCharactersQuery } from "../../slices/rickAndMortyApiSlice"
import CharacterCard from "../../components/characterCard/CharacterCard"
import LoadingScreen from "../../components/loadingScreen/LoadingScreen"
import MessagePage from "../../components/messagePage/MessagePage"
import styles from "./styles.module.css"
import { MESSAGES } from "../../constants/constants"
import SearchBar from "../../components/searchBar/SearchBar"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CharacterList = () => {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({ name: "", species: "", status: "" })

  const { data, error, isLoading } = useGetCharactersQuery({ page, ...filters })
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (isLoading) return <LoadingScreen />
  if (error) return <MessagePage message={MESSAGES.ERROR.GENERIC} />


  return (
    <div>
      <div className={styles.searchBarContainer}>
      <SearchBar
        onSearch={newFilters => {
          setFilters(newFilters)
          setPage(1) // Resetear la paginación al buscar
        }}
      />

      </div>
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

      <div className={styles.paginationContainer}>
        <button className={styles.paginationButton} disabled={page <= 1} onClick={() => setPage(page - 1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span className={styles.pageIndicator}>{page}</span>
        <button className={styles.paginationButton} disabled={!data?.info.next} onClick={() => setPage(page + 1)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      </div>
    </div>
  )
}

export default CharacterList
