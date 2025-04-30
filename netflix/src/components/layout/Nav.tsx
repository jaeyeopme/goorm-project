import { useEffect, useState } from 'react'
import avatar from '../../assets/avatar.png'
import logo from '../../assets/logo.png'
import './Nav.css'

const Nav = () => {
  const SCROLL_THRESHOLD = 50
  const [isScrolled, setIsScrolled] = useState(false)

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

  return (
    <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <img className='nav-logo' src={logo} alt='logo' />
      <input
        type='text'
        className='nav-search'
        placeholder='영화를 검색해주세요.'
      />
      <img className='nav-avatar' src={avatar} alt='avatar' />
    </nav>
  )
}

export default Nav
