import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function MovieDetail({ API_KEY }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then(res => {
        setMovie(res.data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading...</p>

  return (
    <div className="detail">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-content">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="detail-info">
          <h1>{movie.title}</h1>
          <div className="card-meta">
            <span className="rating">★ {movie.vote_average.toFixed(1)}</span>
            <span className="date">{new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <p className="detail-overview">{movie.overview}</p>
          <p className="detail-runtime">Runtime: {movie.runtime} min</p>
          <p className="detail-genres">
            Genres: {movie.genres.map(g => g.name).join(', ')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail