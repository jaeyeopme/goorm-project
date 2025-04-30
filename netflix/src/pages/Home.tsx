import Banner from '../components/home/Banner'
import MovieSlider from '../components/home/MovieSlider'
import { categories } from '../constants/api'

const Home = () => {
  return (
    <>
      <Banner />
      {Object.entries(categories).map(([key, category]) => (
        <MovieSlider key={key} category={category} />
      ))}
    </>
  )
}

export default Home
