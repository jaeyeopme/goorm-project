import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/layout/Footer'
import Nav from './components/layout/Nav'
import Home from './pages/Home'

const Layout = () => {
  return (
    <>
      <Nav />

      <Outlet />

      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
