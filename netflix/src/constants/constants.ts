import { Category, CategoryKey, EndpointKey, SortButton } from '../types'

export const endpoints: Record<EndpointKey, string> = {
  NOW_PLAYING: 'movie/now_playing',
  NETFLIX_ORIGINALS: '/discover/tv?with_networks=213',
  TRENDING: '/trending/all/week',
  TOP_RATED: '/movie/top_rated',
  ACTION_MOVIES: '/discover/movie?with_genres=28',
  COMEDY_MOVIES: '/discover/movie?with_genres=35',
  HORROR_MOVIES: '/discover/movie?with_genres=27',
  ROMANCE_MOVIES: '/discover/movie?with_genres=10749',
  DOCUMENTARIES: '/discover/movie?with_genres=99',
  SEARCH: '/search/multi',
} as const

const defaultSortButton: SortButton = {
  text: '기본순',
  className: 'sort-btn',
  sortOption: 'DEFAULT',
}
const popularitySortButton: SortButton = {
  text: '인기순',
  className: 'sort-btn',
  sortOption: 'POPULARITY',
}
const releaseDateSortButton: SortButton = {
  text: '최신순',
  className: 'sort-btn',
  sortOption: 'RELEASE_DATE',
}
const ratingsSortButton: SortButton = {
  text: '평점순',
  className: 'sort-btn',
  sortOption: 'VOTE_AVERAGE',
}

const netflixSortButtons = [defaultSortButton, popularitySortButton]
const trendingSortButtons = [
  defaultSortButton,
  popularitySortButton,
  releaseDateSortButton,
]
const moviesSortButtons = [
  defaultSortButton,
  releaseDateSortButton,
  ratingsSortButton,
]

export const categories: Record<CategoryKey, Category> = {
  NETFLIX_ORIGINALS: {
    title: 'Netflix Originals',
    endpoint: endpoints.NOW_PLAYING,
    sortButtons: netflixSortButtons,
  },
  TRENDING_NOW: {
    title: 'Trending Now',
    endpoint: endpoints.NETFLIX_ORIGINALS,
    sortButtons: trendingSortButtons,
  },
  TOP_RATED: {
    title: 'Top Rated',
    endpoint: endpoints.TRENDING,
    sortButtons: moviesSortButtons,
  },
  ACTION_MOVIES: {
    title: 'Action Movies',
    endpoint: endpoints.ACTION_MOVIES,
    sortButtons: moviesSortButtons,
  },
  COMEDY_MOVIES: {
    title: 'Comedy Movies',
    endpoint: endpoints.COMEDY_MOVIES,
    sortButtons: moviesSortButtons,
  },
} as const
