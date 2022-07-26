import { Link } from 'react-router-dom'
import './error.css'

function Error(){
    return(
        <div className="not-found"> 
            <h1>404</h1>
            <h2>Something is wrong</h2>
            <Link to='/'>Go back to the main page</Link>
        </div>
    )
}

export default Error