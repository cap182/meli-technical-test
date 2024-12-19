import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  Character,
  CharactersResponse,
} from "../interfaces/characterInterfaces"

export const rickAndMortyApiSlice = createApi({
  reducerPath: "rickAndMortyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api" }),
  endpoints: builder => ({
    getCharacters: builder.query<CharactersResponse, number>({
      query: (page = 1) => `/character?page=${page}`,
    }),
    getCharactersByIds: builder.query<Character[], number[]>({
      query: ids => `/character/${ids.join(",")}`,
    }),
    getCharacterById: builder.query<Character, number>({
      query: id => `/character/${id}`,
    }),
  }),
})

export const {
  useGetCharactersQuery,
  useGetCharactersByIdsQuery,
  useGetCharacterByIdQuery,
} = rickAndMortyApiSlice
