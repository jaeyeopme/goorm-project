import { BannerButton, SortButton } from '../../types'
import './Button.css'

type Props = SortButton | BannerButton

const Button = ({ text, className, onClick }: Props) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  )
}

export default Button
