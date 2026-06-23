import { useNavigate } from "react-router-dom"

function MovieCard({ movie }) {
  const navigate = useNavigate()
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <img src={posterUrl} alt={movie.title} />
      <div className="card-info">
        <h3>{movie.title}</h3>
        <div className="card-meta">
          <span className="rating">★ {movie.vote_average.toFixed(1)}</span>
          <span className="date">{formatDate(movie.release_date)}</span>
        </div>
        <p>{movie.overview}</p>
      </div>
    </div>
  )
}

export default MovieCard