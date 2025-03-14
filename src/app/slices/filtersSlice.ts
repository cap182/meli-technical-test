import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { actualFilter } from "../interfaces/characterInterfaces"

const initialState: actualFilter = {
   page: 1, name: "", species: "", status: "",
}

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilters: (state, action: PayloadAction<actualFilter>) => {
      state.page = action.payload.page
      state.name = action.payload.name
      state.species = action.payload.species
      state.status = action.payload.status
    }
  },
})

export const { changeFilters } = filtersSlice.actions

export default filtersSlice.reducer
