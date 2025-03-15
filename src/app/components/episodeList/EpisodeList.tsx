import {useState} from "react"
import {
    useGetEpisodesByIdsQuery,
  } from "../../slices/rickAndMortyApiSlice"

import LoadingScreen from "../loadingScreen/LoadingScreen"
import MessagePage from "../messagePage/MessagePage"
import styles from "./styles.module.css"
import { MESSAGES } from "../../constants/constants"

interface EpisodeListProps {
  episodeIds: string
}
const EpisodeList = ({episodeIds}: EpisodeListProps) => {
  const [showEpisodes, setShowEpisodes] = useState(false)
    const {
      data: episodes,
      isLoading: episodesLoading,
      error: episodesError,
    } = useGetEpisodesByIdsQuery(episodeIds || "", {
      skip: !episodeIds,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    })
    console.log('episodesComponent');
    
  return (
    <div className={styles.episodes}>
      <h2
        className={styles.episodesTitle}
        onClick={() => setShowEpisodes(prev => !prev)}
      >
        Episodes {showEpisodes ? "-" : "+"}
      </h2>
      {showEpisodes && (
        <div className={styles.episodesBox}>
          {episodesLoading && <LoadingScreen />}
          {episodesError && <MessagePage message={MESSAGES.ERROR.GENERIC} />}
          {!episodesLoading && episodes && (
            <ul className={styles.episodesList}>
              {episodes.map(episode => (
                <li key={episode.id}>
                  <strong>{episode.name}</strong> - {episode.episode} (
                  {episode.air_date})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default EpisodeList
