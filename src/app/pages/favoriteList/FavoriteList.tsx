import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import CharacterCard from "../../components/characterCard/CharacterCard"
import { useGetCharactersByIdsQuery } from "../../slices/rickAndMortyApiSlice"
import LoadingScreen from "../../components/loadingScreen/LoadingScreen"
import MessagePage from "../../components/messagePage/MessagePage"
import styles from "./styles.module.css"

const FavoriteList = () => {
  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds,
  )

  if (favoriteIds.length === 0) {
    return <MessagePage message="No favorites found." />
  }

  const { data, isLoading, error } = useGetCharactersByIdsQuery(favoriteIds)

  if (isLoading) return <LoadingScreen />
  if (error) return <MessagePage message="Something went wrong" />

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Favorites</h1>
      <div className={styles.cardsContainer}>
        {data?.map(character => (
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
    </div>
  )
}

export default FavoriteList
