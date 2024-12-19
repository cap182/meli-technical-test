import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  Character,
  CharactersResponse,
  Episode,
} from "../interfaces/characterInterfaces"
import { BASE_URLS } from "../constants/constants"

export const rickAndMortyApiSlice = createApi({
  reducerPath: "rickAndMortyApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URLS.RICK_AND_MORTY_API }),
  endpoints: builder => ({
    getCharacters: builder.query<CharactersResponse,{ page: number; name?: string; species?: string; status?: string }>({
      query: ({ page, name, species, status }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          ...(name && { name }),
          ...(species && { species }),
          ...(status && { status }),
        })
        return `/character?${params.toString()}`
      },
    }),
    getCharactersByIds: builder.query<Character[], number[]>({
      query: ids => `/character/${ids.join(",")}`,
      transformResponse: (response: Character | Character[]) =>
        Array.isArray(response) ? response : [response],
    }),
    getCharacterById: builder.query<Character, number>({
      query: id => `/character/${id}`,
    }),
    getEpisodesByIds: builder.query<Episode[], string>({
      query: (ids) => `/episode/${ids}`,
      transformResponse: (response: Episode | Episode[]) =>
        Array.isArray(response) ? response : [response],
    }),
  }),
})

export const {
  useGetCharactersQuery,
  useGetCharactersByIdsQuery,
  useGetCharacterByIdQuery,
  useGetEpisodesByIdsQuery,
} = rickAndMortyApiSlice
