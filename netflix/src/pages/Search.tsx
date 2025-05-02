import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Modal from '../components/home/Modal'
import { endpoints } from '../constants/constants'
import { useDebounce } from '../hooks'
import theMovieAPI from '../services/api'
import { Movie } from '../types'
import { hasValidBackdrop } from '../utils'
import './Search.css'

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''

  const [error, setError] = useState<string | null>(null)
  const [isNotFound, setIsNotFound] = useState<boolean>(false)
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([])
  const debouncedQuery = useDebounce<string>(query, 300)

  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie)
    setIsSelected(true)
  }

  useEffect(() => {
    if (debouncedQuery === '') {
      setSearchedMovies([])
      return
    }

    const fetchSearchMovies = async () => {
      try {
        setIsNotFound(false)

        const response = await theMovieAPI.get(`${endpoints.SEARCH}`, {
          params: {
            query: debouncedQuery,
          },
        })

        const searchedMovies: Movie[] = response.data.results
          .filter((movie: Movie) => hasValidBackdrop(movie))
          .map((movie: Movie) => {
            return {
              ...movie,
              release_date: movie.release_date
                ? new Date(movie.release_date)
                : null,
            }
          })

        setSearchedMovies(searchedMovies)
        if (searchedMovies.length === 0) setIsNotFound(true)
      } catch (error) {
        if (error instanceof Error)
          setError(`Search movie fetch error: ${error.message}`)
      }
    }

    fetchSearchMovies()
  }, [debouncedQuery])

  if (error) {
    console.error(error)
    return (
      <div className='search-container'>
        <div className='search-error'>
          <p>영화 정보를 불러오는 데 실패했습니다.</p>
        </div>
      </div>
    )
  }

  if (isNotFound) {
    return (
      <div className='search-container'>
        <div className='search-empty'>
          <p>검색 결과가 없습니다.</p>
          <p className='search-suggestion'>다른 키워드로 검색해보세요.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='search-container'>
        <div className='search-header'>
          <h1 className='search-title'>
            "{query}"에 대한 검색 결과
            {searchedMovies.length > 0 && (
              <span className='result-count'>({searchedMovies.length})</span>
            )}
          </h1>
        </div>

        <div className='search-results'>
          {searchedMovies.map((movie) => (
            <div key={movie.id} className='movie-card'>
              <img
                onClick={() => handleMovieClick(movie)}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || ''}
                className='movie-poster'
              />
              <div className='movie-info'>
                <h3 className='movie-title'>{movie.title}</h3>
                <p className='movie-date'>
                  {movie.release_date && movie.release_date.getFullYear()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isSelected && (
        <Modal
          selectedMovie={selectedMovie as Movie}
          setIsModalOpen={setIsSelected}
        />
      )}
    </>
  )
}

export default Search
