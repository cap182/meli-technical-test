import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../../store"
import { useGetCharacterByIdQuery } from "../../slices/rickAndMortyApiSlice"
import { findCharacterInResults } from "../../../utils/characterUtils"
import LoadingScreen from "../../components/loadingScreen/LoadingScreen"
import { QueriesState } from "../../interfaces/queryInterfaces"
import MessagePage from "../../components/messagePage/MessagePage"
import styles from "./styles.module.css";


function CharacterInfo() {
  const { id } = useParams<{ id: string }>()

  const characterId = id ? parseInt(id, 10) : 0

  const cachedCharacter = useSelector((state: RootState) => {
    return findCharacterInResults(
      state.rickAndMortyApi.queries as QueriesState,
      characterId,
    )
  })

  const {
    data: character,
    isLoading,
    error,
  } = useGetCharacterByIdQuery(characterId, {
    skip: !!cachedCharacter,
  })

  const characterData = cachedCharacter || character

  if (isLoading) return <LoadingScreen />
  if (error) {
    if (error && "status" in error && error.status === 404) {
      return <MessagePage message="Character not found" />
    }
    return <MessagePage message="Something went wrong" />
  }
  if (!characterData) return <MessagePage message="Character don't exists" />

  return (
    <div className={styles.container}>
    <h1>{characterData.name}</h1>
    <img
      src={characterData.image}
      alt={characterData.name}
      className={styles.characterImage}
    />
    <p className={styles.infoText}>
      <span className={styles.infoLabel}>Status:</span> {characterData.status}
    </p>
    <p className={styles.infoText}>
      <span className={styles.infoLabel}>Species:</span> {characterData.species}
    </p>
    <p className={styles.infoText}>
      <span className={styles.infoLabel}>Type:</span> {characterData.type || "Unknown"}
    </p>
    <p className={styles.infoText}>
      <span className={styles.infoLabel}>Gender:</span> {characterData.gender}
    </p>
    <p className={styles.infoText}>
      <span className={styles.infoLabel}>Origin:</span> {characterData.origin.name}
    </p>
    <p className={styles.infoText}>
      <span className={styles.infoLabel}>Location:</span> {characterData.location.name}
    </p>
  </div>
);
}

export default CharacterInfo
