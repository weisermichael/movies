import './App.css';
import React, {useState, useEffect} from 'react';

function Header() {
  return(
    <header>
      <h1>Movie Listings</h1>
      <h2>This website was built by Michael Weiser as a recruiting challenge</h2>
    </header>
  )
}

function MoviesDisplay() {

  return(
    <div class="movie-display">

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
          .then(data => {
            console.log(data)
            return(setMovieData(data.results))
          })
          .then(console.log(movieData))
  }, [])
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
