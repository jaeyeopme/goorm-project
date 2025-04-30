export type CategoryKey =
  | 'NETFLIX_ORIGINALS'
  | 'TRENDING_NOW'
  | 'TOP_RATED'
  | 'ACTION_MOVIES'
  | 'COMEDY_MOVIES'

export interface Category {
  title: string
  endpoint: string
}

export type Categories = {
  [key in CategoryKey]: Category
}

export type EndpointKey =
  | 'nowPlaying'
  | 'netflixOriginals'
  | 'trending'
  | 'topRated'
  | 'actionMovies'
  | 'comedyMovies'
  | 'horrorMovies'
  | 'romanceMovies'
  | 'documentaries'

export type Endpoints = {
  readonly [key in EndpointKey]: string
}
