import { useEffect, useState } from 'react'
import { endpoints } from '../../constants/constants'
import { useModal } from '../../hooks'
import theMovieAPI from '../../services/api'
import { Movie } from '../../types'
import {
  generateRandomNumber,
  hasValidBackdrop,
  truncateString,
} from '../../utils'
import Button from '../common/Button'
import './Banner.css'
import Modal from './Modal'

const Banner = () => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [error, setError] = useState<string | null>(null)
  const {
    isModalOpen,
    selectedItem: selectedMovie,
    isPlayer,
    openModal,
    closeModal,
  } = useModal<Movie>()

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
        <div className='banner__content'>
          <h1 className='banner__title'>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <Button
            onClick={() => openModal(movie as Movie, true)}
            text='play'
            className='banner-btn play'
          />
          <Button
            onClick={() => openModal(movie as Movie)}
            text='more information'
            className='banner-btn info'
          />
          <h1 className='banner__description'>
            {truncateString(movie?.overview ?? '', 60)}
          </h1>
        </div>
        <div className='banner__fade-bottom' />
      </header>
      {isModalOpen && selectedMovie && (
        <Modal
          selectedMovie={selectedMovie}
          closeModal={closeModal}
          isPlayer={isPlayer}
        />
      )}
      )
    </>
  )
}

export default Banner
