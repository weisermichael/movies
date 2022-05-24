import './App.scss';
import React, {useState, useEffect} from 'react';

function Header() {
  return(
    <header>
      <h1>Movie Listings</h1>
      <h2>This website was built by Michael Weiser as a recruiting challenge</h2>
    </header>
  )
}

function MovieCard({poster_path, title, rating, genre}){
  const imgSrc = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + poster_path
  return(
    <div class="movie-card">
      <img class="poster" src={imgSrc} alt="poster"/>
      <p>
        <span>
          {title}
        </span>
        <span>
          rating: {rating}
        </span>
        <span>
          genre: {genre}
        </span>
      </p>
    </div>
  )
}

function MoviesDisplay({movieData}) {

  return(
    <div class="movie-display">
      {movieData.map(movie => 
        <MovieCard 
          poster_path={movie.poster_path}
          title={movie.title}
          rating={movie.vote_average}
          genre={movie.genre_ids}/>)}
    </div>
  )
}

function App() {
  //init state for search text, movies array, and filtered movies array
  const [search, setSearch] = useState('')
  const [movieData, setMovieData] = useState([])
  const [searchResults, setSearchResults] = useState([])

  //effect for movies database
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=666376e7ed7c6a4d1e103f6bfcfe0cbd&page=1')
          .then(response => response.json())
          .then(data => setMovieData(data.results))
          }
  , [])


  return (
    <div className="App">
      <Header />
      <MoviesDisplay movieData={movieData}/>
    </div>
  );
}

export default App;
