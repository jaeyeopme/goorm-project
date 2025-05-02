import { Movie } from '../types'

export const hasValidBackdrop = (movie: Movie) =>
  movie.backdrop_path !== null &&
  movie.backdrop_path !== undefined &&
  movie.backdrop_path !== ''

export const truncateString = (str: string, n: number) => {
  return str?.length > n ? str.substring(0, n - 1) + '...' : str
}

export const generateRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max)
}
