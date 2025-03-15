import { useSelector } from "react-redux"
import { RootState } from "../../store"
import CharacterCard from "../../components/characterCard/CharacterCard"
import { useGetCharactersByIdsQuery } from "../../slices/rickAndMortyApiSlice"
import LoadingScreen from "../../components/loadingScreen/LoadingScreen"
import MessagePage from "../../components/messagePage/MessagePage"
import styles from "./styles.module.css"
import { MESSAGES } from "../../constants/constants"

const HistoryList = () => {
  const historyIds = useSelector(
    (state: RootState) => state.history.historyIds,
  )

  const { data, isLoading, error } = useGetCharactersByIdsQuery(
    historyIds.reduce((acc: { [key: number]: boolean }, elemento) => {
      acc[elemento] = true;
      return acc;
    }, {}), {
      skip: !historyIds.length,
     }
  )

  if (isLoading) return <LoadingScreen />

  if (error) return <MessagePage message={MESSAGES.ERROR.GENERIC} />

  if (historyIds.length === 0) {
    return <MessagePage message={MESSAGES.EMPTY_HISTORY} />
  }

  return (
    <>
      {data?.length === 0 ? (
        <MessagePage message={MESSAGES.ERROR.CHARACTER_NOT_FOUND} />
      ) : (
        <div className={styles.cardsContainer}>
          {data?.map(character => (
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

export default HistoryList
