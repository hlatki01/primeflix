import { useEffect, useState } from 'react'
import './favorites.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'


function Favorites(){

    const [movies, setMovies] = useState([])
    useEffect(() => {
        const myList = localStorage.getItem('@primeflix')
        setMovies(JSON.parse(myList) || []) 

    }, [])

    function deleteFavorite(id){
        let filter = movies.filter((movie)=>{
            return(movie.id !== id)
        })
        setMovies(filter)
        localStorage.setItem('@primeflix', JSON.stringify(filter))
        toast.success('Movie was deleted!')

        
    }

    return(
        <div className='my-movies'>
            <h1>My Movies</h1>
            {movies.length === 0 && <span>There's no favorite movies yet :(</span>}
            <ul>
                {movies.map((movie) => {
                    return(
                        <li key={movie.id}>
                            <span>{movie.title}</span>
                            <div>
                                <Link to={`/movie/${movie.id}`}>Details</Link>
                                <button onClick={ () => deleteFavorite(movie.id) }>Delete</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favorites