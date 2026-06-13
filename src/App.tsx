import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const defaultMovieList = [
    {
      id: 1,
      name: '君の名は。',
      image:
        'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/yLglTwyFOUZt5fNKm0PWL1PK5gm.jpg',
      overview:
        '高校生の男女が、ある日突然、夢の中で入れ替わってしまう。入れ替わりをきっかけに、二人はお互いの生活を体験しながら、次第に惹かれ合っていく。しかし、二人の運命は思わぬ方向へと進んでいく。',
    },
    {
      id: 2,
      name: 'ハウルの動く城',
      image:
        'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/v0K2e1t6ocUNnkZ9BeiFdcOT9LG.jpg',
    },
    {
      id: 3,
      name: 'もののけ姫',
      image:
        'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/mVdz3vlmioKWZaHTGfu99zIuayZ.jpg',
    },
    {
      id: 4,
      name: 'バック・トゥ・ザ・フューチャー',
      image:
        'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/oHaxzQXWSvIsctZfAYSW0tn54gQ.jpg',
    },
  ]

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
    return data.result
  }

  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    fetchMovieList()
  }, [])

  return (
    <div>
      <input type="text" onChange={(e) => setKeyword(e.target.value)} />
      <div>{keyword}</div>
      {defaultMovieList
        .filter((movie) => movie.name.includes(keyword))
        .map((movie) => (
          <div key={movie.id}>
            <h2>{movie.name}</h2>
            <img src={movie.image} alt={movie.name} />
            <p>{movie.overview}</p>
          </div>
        ))}
    </div>
  )
}

export default App
