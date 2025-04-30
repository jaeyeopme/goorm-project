import {
  BannerButtons,
  Categories,
  Endpoints,
  SortButtons,
} from '../types/types'

export const endpoints: Endpoints = {
  NOW_PLAYING: 'movie/now_playing',
  NETFLIX_ORIGINALS: '/discover/tv?with_networks=213',
  TRENDING: '/trending/all/week',
  TOP_RATED: '/movie/top_rated',
  ACTION_MOVIES: '/discover/movie?with_genres=28',
  COMEDY_MOVIES: '/discover/movie?with_genres=35',
  HORROR_MOVIES: '/discover/movie?with_genres=27',
  ROMANCE_MOVIES: '/discover/movie?with_genres=10749',
  DOCUMENTARIES: '/discover/movie?with_genres=99',
} as const

export const categories: Categories = {
  NETFLIX_ORIGINALS: {
    title: 'Netflix Originals',
    endpoint: endpoints.NOW_PLAYING,
  },
  TRENDING_NOW: {
    title: 'Trending Now',
    endpoint: endpoints.NETFLIX_ORIGINALS,
  },
  TOP_RATED: {
    title: 'Top Rated',
    endpoint: endpoints.TRENDING,
  },
  ACTION_MOVIES: {
    title: 'Action Movies',
    endpoint: endpoints.ACTION_MOVIES,
  },
  COMEDY_MOVIES: {
    title: 'Comedy Movies',
    endpoint: endpoints.COMEDY_MOVIES,
  },
} as const

export const sortButtons: SortButtons = {
  DEFAULT: { text: '기본순', className: 'sort-btn', isActive: true },
  POPULARITY: { text: '인기순', className: 'sort-btn' },
  RELEASE_DATE: { text: '최신순', className: 'sort-btn' },
  VOTE_AVERAGE: { text: '평점순', className: 'sort-btn' },
} as const

export const bannerButtons: BannerButtons = {
  PLAY: { text: 'play', className: 'banner-btn play' },
  INFO: { text: 'more information', className: 'banner-btn info' },
} as const
