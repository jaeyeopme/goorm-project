import { useEffect, useState } from 'react'
import { categories } from '../../constants/api'
import theMovieAPI from '../../services/api'
import { Category } from '../../types/api.types'
import { Movie } from '../../types/components.types'
import './MovieSlider.css'

interface Props {
  category: Category
}

const MovieSlider = ({ category }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await theMovieAPI.get(category.endpoint)
        setMovies(response.data.results)
      } catch (error) {
        if (error instanceof Error)
          setError(`Banner movie fetch error: ${error.message}`)
      }
    }

    fetchMovies()
  }, [category.endpoint])

  if (error) return <p>영화 정보를 불러오는 데 실패했습니다.</p>

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
        <div className='movie-slider-sort-controls'></div>
      </div>
      <div className='movie-slider-posters'>
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
          />
        ))}
      </div>
    </>
  )
}

export default MovieSlider
