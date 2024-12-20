import React, { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import CharacterCard from "../../components/characterCard/CharacterCard"
import { useGetCharactersByIdsQuery } from "../../slices/rickAndMortyApiSlice"
import LoadingScreen from "../../components/loadingScreen/LoadingScreen"
import MessagePage from "../../components/messagePage/MessagePage"
import styles from "./styles.module.css"
import { MESSAGES } from "../../constants/constants"
import SearchBar from "../../components/searchBar/SearchBar"

const FavoriteList = () => {
  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds,
  )

  const [filters, setFilters] = useState({
    name: "",
    species: "",
    status: "",
  })

  const { data, isLoading, error } = useGetCharactersByIdsQuery(
     favoriteIds, {
      skip: !favoriteIds.length,
     }
  )

  if (isLoading) return <LoadingScreen />

  if (error) return <MessagePage message={MESSAGES.ERROR.GENERIC} />

  if (favoriteIds.length === 0) {
    return <MessagePage message={MESSAGES.EMPTY_FAVORITES} />
  }

  const characters = Array.isArray(data) ? data : [data];

  const filteredData = characters?.filter((character) => {
    if (!character) return false;
  
    const matchesName = filters.name
      ? character.name.toLowerCase().includes(filters.name.toLowerCase())
      : true;
    const matchesSpecies = filters.species
      ? character.species.toLowerCase().includes(filters.species.toLowerCase())
      : true;
    const matchesStatus = filters.status
      ? character.status.toLowerCase() === filters.status.toLowerCase()
      : true;
  
    return matchesName && matchesSpecies && matchesStatus;
  });

  return (
    <>
      <div className={styles.searchBarContainer}>
        <SearchBar
          onSearch={newFilters => {
            setFilters(newFilters)
          }}
        />
      </div>
      {filteredData?.length === 0 ? (
        <MessagePage message={MESSAGES.ERROR.CHARACTER_NOT_FOUND} />
      ) : (
        <div className={styles.cardsContainer}>
          {filteredData?.map(character => (
             !character ? null :
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
      )}
    </>
  )
}

export default FavoriteList
