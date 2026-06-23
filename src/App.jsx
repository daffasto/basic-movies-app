import { useState, useEffect } from "react"
import axios from "axios"
import { Routes, Route } from "react-router-dom"
import MovieCard from "./components/MovieCard"
import MovieDetail from "./components/MovieDetail"
import './App.css'

function App() {
  const API_KEY = '8e0ff011904606653b3ce4cebcd8cef6'
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('popular')

  useEffect(() => {
    setLoading(true)
    axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`)
      .then(res => {
        setMovies(res.data.results)
        setLoading(false)
      })
      .catch(err => {
        console.log('Error:', err)
        setLoading(false)
      })
  }, [category])

  const filtered = movies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  )

  if (loading) return <p>Loading...</p>

  return (
    <Routes>
      <Route path="/" element={
        <div>
          <h1>Movies App</h1>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="categories">
            <button onClick={() => setCategory('popular')} className={category === 'popular' ? 'active' : ''}>Popular</button>
            <button onClick={() => setCategory('top_rated')} className={category === 'top_rated' ? 'active' : ''}>Top Rated</button>
            <button onClick={() => setCategory('now_playing')} className={category === 'now_playing' ? 'active' : ''}>Now Playing</button>
            <button onClick={() => setCategory('upcoming')} className={category === 'upcoming' ? 'active' : ''}>Upcoming</button>
          </div>
          <div className="grid">
            {filtered.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      }/>
      <Route path="/movie/:id" element={<MovieDetail API_KEY={API_KEY} />}/>
    </Routes>
  )
}

export default App