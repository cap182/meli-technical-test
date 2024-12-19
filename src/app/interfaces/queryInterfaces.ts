export interface QueryData {
  results?: { id: number; [key: string]: any }[] 
  id?: number
}

export type QueriesState = Record<string, { data?: QueryData }>
