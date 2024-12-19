import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { counterSlice } from "../features/counter/counterSlice"
import { quotesApiSlice } from "../features/quotes/quotesApiSlice"
import { loadState, saveState } from "../utils/local-storage-util"
import { rickAndMortyApiSlice } from "./slices/rickAndMortyApiSlice"
import { favoritesSlice } from "./slices/favoritesSlice"


const rootReducer = combineSlices(counterSlice, quotesApiSlice, rickAndMortyApiSlice, favoritesSlice)

export type RootState = ReturnType<typeof rootReducer>

const preloadedState = loadState<Partial<RootState>>();

export const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(quotesApiSlice.middleware, rickAndMortyApiSlice.middleware)
    },
    preloadedState,
  })

  setupListeners(store.dispatch)

store.subscribe(() => {
  saveState({
    counter: store.getState().counter,
    favorites: store.getState().favorites,
    quotesApi: store.getState().quotesApi,
    rickAndMortyApi: store.getState().rickAndMortyApi, 
  });
});




export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
