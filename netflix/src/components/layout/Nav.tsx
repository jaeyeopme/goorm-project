import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import avatar from '../../assets/avatar.png'
import logo from '../../assets/logo.png'
import './Nav.css'

const SCROLL_THRESHOLD = 50

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    })

    return () => window.addEventListener('scroll', () => {})
  }, [])

  useEffect(() => {
    setSearchQuery(searchParams.get('query') || '')
  }, [searchParams])

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim().length === 0) {
      navigate('/')
    } else {
      navigate(`/search?query=${query}`)
    }
  }

  const handleLogoClick = () => {
    navigate('/')
    setSearchQuery('')
  }

  return (
    <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <img
        onClick={handleLogoClick}
        className='nav-logo'
        src={logo}
        alt='logo'
      />
      <input
        value={searchQuery}
        onChange={(e) => handleSearchInputChange(e)}
        type='text'
        className='nav-search'
        placeholder='영화를 검색해주세요.'
      />
      <img className='nav-avatar' src={avatar} alt='avatar' />
    </nav>
  )
}

export default Nav
