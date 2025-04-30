export interface Movie {
  id: number
  title: string | null
  name: string | null
  original_name: string | null
  overview: string
  poster_path: string
  backdrop_path: string
  popularity: number
  release_date: Date
  vote_average: number
}
