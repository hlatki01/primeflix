import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from 'react-router-dom'
import './home.css'

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  async function loadMore() {
    setLoading(true)
    const response = await api.get("movie/now_playing", {
      params: {
        api_key: "d7ec56362dcaa0f2937240a028dbea86",
        language: "en-US",
        page: page + 1
      },
    });
    response.data.results.map((element)=>{
      setMovies(movies => [...movies, element])
    })
    setPage(page + 1)
    setLoading(false)
  }


  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "d7ec56362dcaa0f2937240a028dbea86",
          language: "en-US",
          page: page,
        },
      });

      setMovies(response.data.results)
      setLoading(false)
      
    }
    loadMovies();
  }, []);

  if(loading){
    return(
        <div className="loading">
            <h2>Loading movies....</h2>
        </div>
    )
  }

  return (
    <div className="container">
        <div className="movie-list">
            {movies.map((movie)=>{
                return(
                    <article key={movie.id}>
                        <strong>{movie.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
                        <Link to={`/movie/${movie.id}`}>View</Link>
                    </article>
                )
            })}
        </div>
        <div className="load-more">
          <button onClick={loadMore}>Load More</button>
        </div>
    </div>
  );
}

export default Home;
