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

function Search({value, handleChange}) {
  return(
    <div class="search">
      search: <input type='text' value={value} onChange={handleChange} />
    </div>
  )
}

function MovieCard({poster_path, title, rating, genre}){
  const imgSrc = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + poster_path
  return(
    <div class="movie-card">
      <div class="content">
        <div class="front">
          <img class="poster" src={imgSrc} alt="poster"/>
        </div>
        <div class="back">
          <div>
            <span>
            {title}
            </span>
            <span>
            rating: {rating}
            </span>
            <span>
            genre: {genre}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MoviesDisplay({movieData, genres}) {
  //create object to lookup genre id's
  const getGenreLookup = () => {
    const genreLookup = {}
    genres.forEach((genreObj) => {
      genreLookup[genreObj.id] = genreObj.name
    })
    return genreLookup;
  }
  const genreObject = getGenreLookup();

  const getGenreString = (genre_ids) => {
    let genreString = "";
    genre_ids.forEach(id => genreString += "" + genreObject[id] + ", ")
    genreString = genreString.replace(/,\s*$/, "");
    return genreString
  }

  return(
    <div class="movie-display">
      {movieData.map(movie => 
        <MovieCard 
          poster_path={movie.poster_path}
          title={movie.title}
          rating={movie.vote_average}
          //genre={movie.genre_ids}
          genre={getGenreString(movie.genre_ids)}
        />
        )
      }
    </div>
  )
}

function App() {
  //init state for search text, movies array, and filtered movies array
  const [search, setSearch] = useState('')
  const [movieData, setMovieData] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [genres, setGenres] = useState([])

  //effect for movies database
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=666376e7ed7c6a4d1e103f6bfcfe0cbd&page=1')
          .then(response => response.json())
          .then(data => setMovieData(data.results))
          }
  , [])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=666376e7ed7c6a4d1e103f6bfcfe0cbd&page=1&language=en-US')
          .then(response => response.json())
          .then(data => setGenres(data.genres))
  }, [])

  //search bar event handler
  const handleChange = (ev) => {
    setSearch(ev.target.value);

    const searchedMovies = movieData.filter((movie) => (movie.title.toLowerCase()).includes((ev.target.value).toLowerCase()))
    setSearchResults(searchedMovies);
  }

  return (
    <div className="App">
      <Header />
      <Search value={search} 
              handleChange={handleChange}/>
      <MoviesDisplay movieData={search === "" ? movieData : searchResults}
                     genres = {genres}/>
    </div>
  );
}

export default App;
