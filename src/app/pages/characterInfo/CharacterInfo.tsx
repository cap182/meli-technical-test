import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../../store"
import { useGetCharacterByIdQuery, useGetEpisodesByIdsQuery } from "../../slices/rickAndMortyApiSlice"
import { findCharacterInResults } from "../../../utils/characterUtils"
import LoadingScreen from "../../components/loadingScreen/LoadingScreen"
import { QueriesState } from "../../interfaces/queryInterfaces"
import MessagePage from "../../components/messagePage/MessagePage"
import styles from "./styles.module.css"
import { MESSAGES } from "../../constants/constants"

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

  const episodeIds = characterData?.episode
    .map((url: string) => url.split("/").pop())
    .join(",")

  // Usar RTK Query para obtener episodios
  const {
    data: episodes,
    isLoading: episodesLoading,
    error: episodesError,
  } = useGetEpisodesByIdsQuery(episodeIds || "", {
    skip: !episodeIds, // Solo ejecutar si hay episodios
  })

  if (isLoading) return <LoadingScreen />
  if (error) {
    if (error && "status" in error && error.status === 404) {
      return <MessagePage message={MESSAGES.ERROR.NOT_FOUND} />
    }
    return <MessagePage message={MESSAGES.ERROR.GENERIC} />
  }
  if (!characterData)
    return <MessagePage message={MESSAGES.ERROR.CHARACTER_NOT_FOUND} />

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
        <span className={styles.infoLabel}>Species:</span>{" "}
        {characterData.species}
      </p>
      <p className={styles.infoText}>
        <span className={styles.infoLabel}>Type:</span>{" "}
        {characterData.type || "Unknown"}
      </p>
      <p className={styles.infoText}>
        <span className={styles.infoLabel}>Gender:</span> {characterData.gender}
      </p>
      <p className={styles.infoText}>
        <span className={styles.infoLabel}>Origin:</span>{" "}
        {characterData.origin.name}
      </p>
      <p className={styles.infoText}>
        <span className={styles.infoLabel}>Location:</span>{" "}
        {characterData.location.name}
      </p>
      <h2>Episodes</h2>
      {episodesLoading && <LoadingScreen />}
      {episodesError && <MessagePage message={MESSAGES.ERROR.GENERIC} />}
      {!episodesLoading && episodes && (
        <ul>
          {episodes.map((episode) => (
            <li key={episode.id}>
              <strong>{episode.name}</strong> - {episode.episode} (
              {episode.air_date})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CharacterInfo
