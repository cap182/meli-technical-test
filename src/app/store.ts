import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { loadState, saveState } from "../utils/local-storage-util"
import { rickAndMortyApiSlice } from "./slices/rickAndMortyApiSlice"
import { favoritesSlice } from "./slices/favoritesSlice"
import { filtersSlice } from "./slices/filtersSlice"
import { historySlice } from "./slices/historySlice"

const rootReducer = combineSlices(rickAndMortyApiSlice, favoritesSlice, filtersSlice, historySlice)

export type RootState = ReturnType<typeof rootReducer>

const preloadedState = loadState<Partial<RootState>>()

export const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(rickAndMortyApiSlice.middleware)
  },
  preloadedState,
})

setupListeners(store.dispatch)

store.subscribe(() => {
  saveState({
    favorites: store.getState().favorites,
    history: store.getState().history,
    filters: store.getState().filters,
    rickAndMortyApi: store.getState().rickAndMortyApi,
  })
})

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
