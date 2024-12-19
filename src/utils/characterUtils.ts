import { Character } from "../app/interfaces/characterInterfaces"
import { QueriesState } from "../app/interfaces/queryInterfaces"

export const findCharacterInResults = (
  queries: QueriesState,
  characterId: number,
) => {
  for (const query of Object.values(queries || {})) {
    const data = query?.data
    if (data?.results) {
      const character = data.results.find(
        (char: any) => char.id === characterId,
      )
      if (character) {
        return character
      }
    }
    if (data?.id === characterId) {
      return data as Character;
    }
  }
  return null
}
