import { useEffect, useState } from 'react'
import { endpoints } from '../../constants/constants'
import theMovieAPI from '../../services/api'
import { Movie } from '../../types/types'
import Button from '../common/Button'
import './Banner.css'
import Modal from './Modal'

const generateRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max)
}

const truncateString = (str: string, n: number) => {
  return str?.length > n ? str.substring(0, n - 1) + '...' : str
}

const hasValidBackdrop = (movie: Movie) =>
  movie.backdrop_path !== undefined && movie.backdrop_path !== ''

const Banner = () => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isPlayed, setIsPlayed] = useState<boolean>(false)
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await theMovieAPI.get(endpoints.NOW_PLAYING)

        const filteredMovies: Movie[] = response.data.results.filter(
          (movie: Movie) => hasValidBackdrop(movie)
        )

        const randomNumber = generateRandomNumber(filteredMovies?.length)
        const selectedMovie = filteredMovies[randomNumber]

        const detailResponse = await theMovieAPI.get(
          `movie/${selectedMovie.id}`,
          {
            params: {
              append_to_response: 'videos',
            },
          }
        )

        const randomMovie = {
          ...detailResponse.data,
          release_date: new Date(detailResponse.data.release_date),
        }

        setMovie(randomMovie)
      } catch (error) {
        if (error instanceof Error)
          setError(`Banner movie fetch error: ${error.message}`)
      }
    }

    fetchMovies()
  }, [])

  if (error) {
    console.error(error)
    return <p>영화 정보를 불러오는 데 실패했습니다.</p>
  }

  return (
    <>
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
            <Button
              onClick={() => setIsPlayed(true)}
              text='play'
              className='banner-btn play'
            />
            <Button
              onClick={() => setIsSelected(true)}
              text='more information'
              className='banner-btn info'
            />
          </div>
          <h1 className='banner-description'>
            {truncateString(movie?.overview ?? '', 60)}
          </h1>
        </div>
        <div className='banner-fadeBottom' />
      </header>
      {isSelected && (
        <Modal selectedMovie={movie as Movie} setIsModalOpen={setIsSelected} />
      )}
      {isPlayed && (
        <Modal
          selectedMovie={movie as Movie}
          setIsModalOpen={setIsPlayed}
          isVideo={true}
        />
      )}
      )
    </>
  )
}

export default Banner
