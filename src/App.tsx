import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const fetchMovieList = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ja&page=1`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    )
    const data = await response.json()
    console.log(data.result)
    //return data.result
    setMovieList(data.results)
  }

  const [keyword, setKeyword] = useState('')
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    fetchMovieList()
  }, [])

  return (
    <div>
      <input type="text" onChange={(e) => setKeyword(e.target.value)} />
      <div>{keyword}</div>
      {movieList
        .filter((movie) => movie.original_title.includes(keyword))
        .map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.original_title} />
            <p>{movie.overview}</p>
          </div>
        ))}
    </div>
  )
}

export default App
