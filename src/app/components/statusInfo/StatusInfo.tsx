import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./styles.module.css"
import { faQuestion, faSkull } from "@fortawesome/free-solid-svg-icons"
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons"

interface StatusInfoProps {
  name: string
  status: string
  species: string
}

const StatusInfo = ({ name, status, species }: StatusInfoProps) => {
  const statusIcon = () => {
    if (status.toLowerCase() === "alive") return faFaceSmile
    if (status.toLowerCase() === "dead") return faSkull
    return faQuestion
  }
  return (
    <>
      <FontAwesomeIcon className={styles.statusIcon} icon={statusIcon()} />
      <h3 className={styles.characterName}>{name}</h3>
      <p className={styles.characterStatus}>
        {status} - {species}
      </p>
    </>
  )
}

export default StatusInfo
