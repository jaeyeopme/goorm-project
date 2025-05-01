import Banner from '../components/home/Banner'
import MovieSlider from '../components/home/MovieSlider'
import { categories } from '../constants/constants'

const Home = () => {
  return (
    <main>
      <Banner />
      {Object.entries(categories).map(([key, category]) => (
        <MovieSlider key={key} category={category} />
      ))}
    </main>
  )
}

export default Home
