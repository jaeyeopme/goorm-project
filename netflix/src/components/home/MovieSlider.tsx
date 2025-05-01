import { useEffect, useRef, useState } from 'react'
import { categories } from '../../constants/constants'
import theMovieAPI from '../../services/api'
import { Category, Movie, SortOption } from '../../types/types'
import Button from '../common/Button'
import Modal from './Modal'
import './MovieSlider.css'

interface Props {
  category: Category
}

const MovieSlider = ({ category }: Props) => {
  const [defaultMovies, setDefaultMovies] = useState<Movie[]>([])
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState<SortOption>('DEFAULT')
  const [isSorting, setIsSorting] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await theMovieAPI.get(category.endpoint)
        const movies: Movie[] = response.data.results.map((movie: Movie) => ({
          ...movie,
          release_date: movie.release_date
            ? new Date(movie.release_date)
            : new Date(),
        }))

        setMovies(movies)
        setDefaultMovies(movies)
      } catch (error) {
        if (error instanceof Error)
          setError(`Slider movie fetch error: ${error.message}`)
      }
    }

    fetchMovies()
  }, [category.endpoint])

  if (error) {
    console.error(error)
    return <p>영화 정보를 불러오는 데 실패했습니다.</p>
  }

  const handleSortButtonClick = (option: SortOption) => {
    if (sortOption === option) return

    if (sliderRef.current && sliderRef.current.scrollLeft > 0)
      sliderRef.current.scrollLeft = 0

    setIsSorting(true)
    setSortOption(option)

    setTimeout(() => {
      if (option === 'DEFAULT') {
        setMovies(defaultMovies)
      } else {
        const sortedMovies = [...defaultMovies].sort((a, b) => {
          switch (option) {
            case 'POPULARITY':
              return b.popularity - a.popularity
            case 'RELEASE_DATE':
              return b.release_date.getTime() - a.release_date.getTime()
            case 'VOTE_AVERAGE':
              return b.vote_average - a.vote_average
            default:
              return 0
          }
        })

        setMovies(sortedMovies)
      }

      setTimeout(() => {
        setIsSorting(false)
      }, 150)
    }, 300)
  }

  return (
    <>
      <div className='movie-slider-header'>
        <h2
          className='movie-slider-title'
          style={{
            textTransform:
              category === categories.NETFLIX_ORIGINALS
                ? 'uppercase'
                : 'capitalize',
          }}
        >
          {category.title}
        </h2>
        <div className='movie-slider-sort-controls'>
          {category.sortButtons.map((it) => (
            <Button
              key={it.text}
              text={it.text}
              className={
                sortOption === it.sortOption ? 'sort-btn active' : 'sort-btn'
              }
              onClick={() => handleSortButtonClick(it.sortOption ?? 'DEFAULT')}
            />
          ))}
        </div>
      </div>
      <div
        ref={sliderRef}
        className='movie-slider-posters'
        style={{ opacity: isSorting ? 0.5 : 1 }}
      >
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`movie-slider-poster ${
              category === categories.NETFLIX_ORIGINALS && 'large'
            }`}
            src={`https://image.tmdb.org/t/p/original${
              category === categories.NETFLIX_ORIGINALS
                ? movie.poster_path
                : movie.backdrop_path
            }`}
            alt={movie.name || movie.title || ''}
            onClick={() => handleMovieClick(movie)}
          />
        ))}
      </div>

      {isModalOpen && (
        <Modal
          selectedMovie={selectedMovie as Movie}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  )
}

export default MovieSlider
