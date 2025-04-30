import { useEffect, useState } from 'react'
import { bannerButtons, endpoints } from '../../constants/constants'
import theMovieAPI from '../../services/api'
import { Movie } from '../../types/types'
import Button from '../common/Button'
import './Banner.css'

const generateRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max)
}

const truncateString = (str: string, n: number) => {
  return str?.length > n ? str.substring(0, n - 1) + '...' : str
}

const Banner = () => {
  const [movie, setMovie] = useState<Movie>({} as Movie)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await theMovieAPI.get(endpoints.NOW_PLAYING)
        const movies = response.data.results
        const randomNumber = generateRandomNumber(movies?.length)
        const randomMovie = movies[randomNumber]

        setMovie(randomMovie.backdrop_path ? randomMovie : movies[0])
      } catch (error) {
        if (error instanceof Error)
          setError(`Banner movie fetch error: ${error.message}`)
      }
    }

    fetchMovie()
  }, [])

  if (error) return <p>영화 정보를 불러오는 데 실패했습니다.</p>

  return (
    <header
      className='banner'
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
    >
      <div className='banner-content'>
        <h1 className='banner-title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner-buttons'>
          <Button {...bannerButtons.PLAY} />
          <Button {...bannerButtons.INFO} />
        </div>
        <h1 className='banner-description'>
          {truncateString(movie?.overview, 100)}
        </h1>
      </div>
      <div className='banner-fadeBottom' />
    </header>
  )
}

export default Banner
