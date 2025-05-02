import axios from 'axios'

const theMovieAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    Accept: 'application/json;charset=utf-8',
  },
  params: {
    language: 'ko-KR',
    include_adult: false,
  },
})

export default theMovieAPI
