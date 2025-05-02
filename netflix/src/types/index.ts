export type EndpointKey =
  | 'NOW_PLAYING'
  | 'NETFLIX_ORIGINALS'
  | 'TRENDING'
  | 'TOP_RATED'
  | 'ACTION_MOVIES'
  | 'COMEDY_MOVIES'
  | 'HORROR_MOVIES'
  | 'ROMANCE_MOVIES'
  | 'DOCUMENTARIES'
  | 'SEARCH'

export type CategoryKey =
  | 'NETFLIX_ORIGINALS'
  | 'TRENDING_NOW'
  | 'TOP_RATED'
  | 'ACTION_MOVIES'
  | 'COMEDY_MOVIES'

export type BannerButtonKey = 'PLAY' | 'INFO'

export interface Category {
  title: string
  endpoint: string
  sortButtons: SortButton[]
}

interface ButtonBase {
  text: string
  isActive?: boolean
  onClick?: () => void
}

export type SortOption =
  | 'DEFAULT'
  | 'POPULARITY'
  | 'RELEASE_DATE'
  | 'VOTE_AVERAGE'

export interface SortButton extends ButtonBase {
  text: '기본순' | '인기순' | '최신순' | '평점순'
  className: 'sort-btn' | 'sort-btn active'
  sortOption?: SortOption
}

export interface BannerButton extends ButtonBase {
  text: 'play' | 'more information'
  className: 'banner-btn play' | 'banner-btn info'
}

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
  videos?: Videos
}

export interface Video {
  key: string
  type: string
  site: string
}

export interface Videos {
  results: Video[]
}
