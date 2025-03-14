import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FavoritesList, HistoryList } from "../interfaces/characterInterfaces"
import { MAX_HISTORY_LENGTH } from "../constants/constants"

const initialState: HistoryList = {
  historyIds: [],
}

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<number>) => {
      if (state.historyIds.find(id => id === action.payload)) {
        state.historyIds
      } else {
        if (state.historyIds.length === MAX_HISTORY_LENGTH) {
          state.historyIds.shift() // Elimina el primer elemento si la cola está llena
        }
        // Añade el nuevo elemento al final de la cola
        state.historyIds.push(action.payload)
      }
    },
  },
})

export const { addHistory } = historySlice.actions

export default historySlice.reducer
