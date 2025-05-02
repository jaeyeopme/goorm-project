import { useEffect, useRef } from 'react'
import { Movie } from '../../types'
import './Modal.css'

interface Props {
  selectedMovie: Movie
  closeModal: () => void
  isPlayer?: boolean
}

const Modal = ({ selectedMovie, closeModal, isPlayer = false }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const eventListener = (e: MouseEvent) => {
      const target = e.target as HTMLButtonElement
      if (modalRef.current && !modalRef.current.contains(target)) closeModal()
    }
    document.addEventListener('click', eventListener, true)
    return () => document.removeEventListener('click', eventListener, true)
  }, [modalRef, closeModal])

  return (
    <div className='modal__overlay'>
      <section
        className={`modal ${isPlayer ? 'modal__player' : 'modal__info'}`}
        ref={modalRef}
      >
        <span
          onClick={() => closeModal()}
          className='modal__close'
          aria-label='닫기'
        >
          X
        </span>
        {isPlayer ? (
          selectedMovie?.videos?.results[0]?.key ? (
            <iframe
              title={`${
                selectedMovie.title || selectedMovie.name || '영화'
              } 예고편`}
              src={`https://www.youtube.com/embed/${selectedMovie.videos.results[0].key}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              loading='lazy'
            ></iframe>
          ) : (
            <div className='modal__fallback'>
              <p>예고편을 찾을 수 없습니다.</p>
            </div>
          )
        ) : (
          <>
            <img
              className='modal__image'
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`}
              alt={selectedMovie.name || selectedMovie.title || ''}
            />
            <div className='modal__content'>
              <p className='modal__detail'>
                <span className='modal__percent'>100% for you</span>
                {selectedMovie.release_date
                  ? selectedMovie.release_date.toLocaleDateString('ko')
                  : ''}
              </p>
              <h2 className='modal__title'>
                {selectedMovie.title || selectedMovie.name || ''}
              </h2>
              <p className='modal__overview'>
                {' '}
                평점: {selectedMovie.vote_average}
              </p>
              <p className='modal__overview'> {selectedMovie.overview}</p>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Modal
