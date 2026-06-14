import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

type Movie = {
  id: string
  original_title: string
  poster_path: string
  overview: string
  year: number
  rating: number
  runtime: number
  score: number
  genres: string[]
}

type MovieDetailJson = {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: null
  budget: number
  genres: { id: number; name: string }[]
  homepage: string
  id: string
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

function MovieDetail() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  useEffect(() => {
    fetchMovieDetail()
  }, [])

  const fetchMovieDetail = async () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ja&page=1&append_to_response=credits`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })

    const data = (await response.json()) as MovieDetailJson
    setMovie({
      id: data.id,
      original_title: data.original_title,
      poster_path: data.poster_path,
      overview: data.overview,
      year: new Date(data.release_date).getFullYear(),
      rating: data.vote_average,
      runtime: data.runtime,
      score: data.vote_average,
      genres: data.genres.map((genre) => genre.name),
    })
  }

  return (
    <div>
      {movie && (
        <div>
          <h2>{movie.original_title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
          />
          <p>{movie.overview}</p>
          <p>Year: {movie.year}</p>
          <p>Rating: {movie.rating}</p>
          <p>Runtime: {movie.runtime} minutes</p>
          <p>Score: {movie.score}</p>
          <p>Genres: {movie.genres.join(', ')}</p>
        </div>
      )}
    </div>
  )
}

export default MovieDetail
