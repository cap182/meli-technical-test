export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface CharactersResponse {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Character[]
}

export interface FavoritesList {
  favoriteIds: number[]
}
export interface HistoryList {
  historyIds: number[]
}

export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
  }

  export interface actualFilter {
    page: number;
    name: string; 
    species: string;
    status: string; 
  }