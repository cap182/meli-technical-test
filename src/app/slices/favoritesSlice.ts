import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FavoritesList } from "../interfaces/characterInterfaces"

const initialState: FavoritesList = {
  favoriteIds: {},
}

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      state.favoriteIds[action.payload] = true;
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      delete state.favoriteIds[action.payload];
    },
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions

export default favoritesSlice.reducer
