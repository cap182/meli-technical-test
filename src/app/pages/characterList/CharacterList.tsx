import React, { useState } from "react"
import { useGetCharactersQuery } from "../../slices/rickAndMortyApiSlice"
import CharacterCard from "../../components/characterCard/CharacterCard"
import LoadingScreen from "../../components/loadingScreen/LoadingScreen"
import MessagePage from "../../components/messagePage/MessagePage"
import styles from "./styles.module.css";

const CharacterList = () => {
  const [page, setPage] = useState(1)
  const { data, error, isLoading } = useGetCharactersQuery(page)

  if (isLoading) return <LoadingScreen />
  if (error) return <MessagePage message="Something went wrong" />;

  return (
    <div>
    <div className={styles.cardsContainer}>
      {data?.results.map((character) => (
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
);
}

export default CharacterList
