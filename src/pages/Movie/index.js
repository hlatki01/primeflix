import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../services/api"
import './movie.css'
import { toast } from 'react-toastify'

function Movie() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState({})
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    async function loadMovie() {
      const response = await api.get(`movie/${id}`, {
        params: {
          api_key: "d7ec56362dcaa0f2937240a028dbea86",
          language: "en-US"
        }
      })
      .then((response)=>{
        setMovie(response.data)
        setLoading(false)
      })
      .catch(()=>{
        navigate('/', { replace: true })
        return
      })

      
    }
    loadMovie();

    return () => {
        console.log('desmontou o componente');
    }
  }, [navigate, id]);

  function salvarFilme() {
    const myMovies = localStorage.getItem('@primeflix')
    let savedMovies = JSON.parse(myMovies) || []

    const hasMovie = savedMovies.some( (savedMovie) => savedMovie.id === movie.id)

    if(hasMovie){
      toast.warn('This movie is already on your list.')
      return;
    }

    savedMovies.push(movie)
    localStorage.setItem('@primeflix', JSON.stringify(savedMovies))
    toast.success('Movie was sucessfully saved!')
    
  }

  if(loading){
    return(
        <div className="loading">
            <h2>Loading movie....</h2>
        </div>
    )
  }

  return (
    <div className="movie-info" >
        <h1>{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>
        <h3>Movie Overview</h3>
        <span>{movie.overview}</span>
        <strong>Voting: {movie.vote_average.toFixed(1)}/10</strong>
        <div className="buttons">
            <button onClick={salvarFilme}>Save</button>
            <button><a target='blank' rel='external' href={`https://youtube.com/results?search_query=${movie.title}`}>Trailer</a></button>
        </div>
    </div>
  );
}

export default Movie;
