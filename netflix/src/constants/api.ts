import { Categories, Endpoints } from '../types/api.types'

export const endpoints: Endpoints = {
  nowPlaying: 'movie/now_playing',
  netflixOriginals: '/discover/tv?with_networks=213',
  trending: '/trending/all/week',
  topRated: '/movie/top_rated',
  actionMovies: '/discover/movie?with_genres=28',
  comedyMovies: '/discover/movie?with_genres=35',
  horrorMovies: '/discover/movie?with_genres=27',
  romanceMovies: '/discover/movie?with_genres=10749',
  documentaries: '/discover/movie?with_genres=99',
} as const

export const categories: Categories = {
  NETFLIX_ORIGINALS: {
    title: 'Netflix Originals',
    endpoint: endpoints.netflixOriginals,
  },
  TRENDING_NOW: {
    title: 'Trending Now',
    endpoint: endpoints.trending,
  },
  TOP_RATED: {
    title: 'Top Rated',
    endpoint: endpoints.topRated,
  },
  ACTION_MOVIES: {
    title: 'Action Movies',
    endpoint: endpoints.actionMovies,
  },
  COMEDY_MOVIES: {
    title: 'Comedy Movies',
    endpoint: endpoints.comedyMovies,
  },
} as const
