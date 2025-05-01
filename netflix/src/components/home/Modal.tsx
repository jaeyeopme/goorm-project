import { useEffect, useRef } from 'react'
import { Movie } from '../../types/types'
import './Modal.css'

interface Props {
  selectedMovie: Movie
  setIsModalOpen: (isOpen: boolean) => void
  isVideo?: boolean
}

const Modal = ({ selectedMovie, setIsModalOpen, isVideo = false }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const eventListener = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (modalRef.current && !modalRef.current.contains(target))
        setIsModalOpen(false)
    }

    document.addEventListener('click', eventListener, true)

    return () => document.removeEventListener('click', eventListener, true)
  }, [modalRef, setIsModalOpen])

  return (
    <div className='modal-overlay'>
      <section className='modal' ref={modalRef}>
        <span
          onClick={() => setIsModalOpen(false)}
          className='modal-close'
          aria-label='닫기'
        >
          X
        </span>
        {isVideo ? (
          // 비디오 표시
          selectedMovie?.videos?.results[0]?.key ? (
            <iframe
              className='modal-movie banner-player'
              title={`${
                selectedMovie?.title || selectedMovie?.name || '영화'
              } 예고편`}
              src={`https://www.youtube.com/embed/${selectedMovie.videos.results[0].key}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              loading='lazy'
            ></iframe>
          ) : (
            <div className='banner-player-fallback'>
              <p>예고편을 찾을 수 없습니다.</p>
            </div>
          )
        ) : (
          <>
            <img
              className='modal-movie'
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`}
              alt={selectedMovie.name || selectedMovie.title || ''}
            />
            <div className='modal-content'>
              <p className='modal-detail'>
                <span className='modal-percent'>100% for you</span>
                {selectedMovie.release_date
                  ? selectedMovie.release_date.toLocaleDateString('ko')
                  : selectedMovie.name}
              </p>
              <h2 className='modal-title'>
                {selectedMovie.title ? selectedMovie.title : selectedMovie.name}
              </h2>
              <p className='modal-overview'>
                {' '}
                평점: {selectedMovie.vote_average}
              </p>
              <p className='modal-overview'> {selectedMovie.overview}</p>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Modal
