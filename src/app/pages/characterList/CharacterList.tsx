import React, { useState } from "react"
import { useGetCharactersQuery } from "../../slices/rickAndMortyApiSlice"
import CharacterCard from "../../components/characterCard/CharacterCard"
import LoadingScreen from "../../components/loadingScreen/LoadingScreen"
import MessagePage from "../../components/messagePage/MessagePage"
import styles from "./styles.module.css"
import { MESSAGES } from "../../constants/constants"
import SearchBar from "../../components/searchBar/SearchBar"

const CharacterList = () => {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({ name: "", species: "", status: "" })

  const { data, error, isLoading } = useGetCharactersQuery({ page, ...filters })

  if (isLoading) return <LoadingScreen />
  if (error) return <MessagePage message={MESSAGES.ERROR.GENERIC} />

  return (
    <div>
      <SearchBar
        onSearch={newFilters => {
          setFilters(newFilters)
          setPage(1) // Resetear la paginación al buscar
        }}
      />
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
      <div className={styles.paginationContainer}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span className={styles.pageIndicator}>Page {page}</span>
        <button disabled={!data?.info.next} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default CharacterList
