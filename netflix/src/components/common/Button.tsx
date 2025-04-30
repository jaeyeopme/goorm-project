import { BannerButton, SortButton } from '../../types/types'
import './Button.css'

const Button = ({
  text,
  isActive = false,
  className,
}: SortButton | BannerButton) => {
  return (
    <button className={`${className} ${isActive ? 'active' : ''}`}>
      {text}
    </button>
  )
}

export default Button
