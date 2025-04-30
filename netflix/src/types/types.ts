type EndpointKey =
  | 'NOW_PLAYING'
  | 'NETFLIX_ORIGINALS'
  | 'TRENDING'
  | 'TOP_RATED'
  | 'ACTION_MOVIES'
  | 'COMEDY_MOVIES'
  | 'HORROR_MOVIES'
  | 'ROMANCE_MOVIES'
  | 'DOCUMENTARIES'

type CategoryKey =
  | 'NETFLIX_ORIGINALS'
  | 'TRENDING_NOW'
  | 'TOP_RATED'
  | 'ACTION_MOVIES'
  | 'COMEDY_MOVIES'

export interface Category {
  title: string
  endpoint: string
}

export type Endpoints = {
  [key in EndpointKey]: string
}

type SortButtonKey = 'DEFAULT' | 'POPULARITY' | 'RELEASE_DATE' | 'VOTE_AVERAGE'

type BannerButtonKey = 'PLAY' | 'INFO'

interface ButtonBase {
  text: string
  isActive?: boolean
  onClick?: () => void
}

export type SortButtons = {
  [key in SortButtonKey]: SortButton
}

export type BannerButtons = {
  [key in BannerButtonKey]: BannerButton
}

export interface SortButton extends ButtonBase {
  text: '기본순' | '인기순' | '최신순' | '평점순'
  className: 'sort-btn'
}

export interface BannerButton extends ButtonBase {
  text: 'play' | 'more information'
  className: 'banner-btn play' | 'banner-btn info'
}

export type Categories = {
  [key in CategoryKey]: Category
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
}
