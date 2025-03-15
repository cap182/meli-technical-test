import React, { useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../../store"
import { useGetCharacterByIdQuery } from "../../slices/rickAndMortyApiSlice"
import { findCharacterInResults } from "../../../utils/characterUtils"
import LoadingScreen from "../../components/loadingScreen/LoadingScreen"
import { QueriesState } from "../../interfaces/queryInterfaces"
import MessagePage from "../../components/messagePage/MessagePage"
import styles from "./styles.module.css"
import { MESSAGES } from "../../constants/constants"
import StatusInfo from "../../components/statusInfo/StatusInfo"
import { addHistory } from "../../slices/historySlice"
import EpisodeList from "../../components/episodeList/EpisodeList"

function CharacterInfo() {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  const characterId = id ? parseInt(id, 10) : 0

  const cachedCharacter = useSelector((state: RootState) => {
    return findCharacterInResults(
      state.rickAndMortyApi.queries as QueriesState,
      characterId,
    )
  }, shallowEqual)
  console.log("characterInfo")

  useEffect(() => {
    console.log("addHistory");
    
    dispatch(addHistory(characterId))
  }, [characterId, dispatch])

  const {
    data: character,
    isLoading,
    error,
  } = useGetCharacterByIdQuery(characterId, {
    skip: !!cachedCharacter,
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  })

  const characterData = cachedCharacter || character

  const episodeIds = characterData?.episode
    .map((url: string) => url.split("/").pop())
    .join(",")

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
      <div className={styles.card}>
        <div className={styles.cardHeader}></div>
        <img
          src={characterData.image}
          alt={characterData.name}
          className={styles.characterImage}
        />
        <div className={styles.infoContainer}>
          <div className={styles.infoColumn}>
            <p className={styles.infoText}>
              <span className={styles.infoLabel}>Type:</span>{" "}
              {characterData.type || "Unknown"}
            </p>
            <p className={styles.infoText}>
              <span className={styles.infoLabel}>Gender:</span>{" "}
              {characterData.gender}
            </p>
          </div>
          <div className={styles.infoCenter}>
            <div className={styles.infoText}>
              <StatusInfo
                name={characterData.name}
                status={characterData.status}
                species={characterData.species}
              />
            </div>
          </div>
          <div className={styles.infoColumn}>
            <p className={styles.infoText}>
              <span className={styles.infoLabel}>Origin:</span>{" "}
              {characterData.origin.name}
            </p>
            <p className={styles.infoText}>
              <span className={styles.infoLabel}>Location:</span>{" "}
              {characterData.location.name}
            </p>
          </div>
        </div>
        <EpisodeList episodeIds={episodeIds} />
      </div>
    </div>
  )
}

export default CharacterInfo
