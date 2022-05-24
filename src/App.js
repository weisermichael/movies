import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function Header() {
  return(
    <header>
      <h1>Movie Listings</h1>
      <h2>This website was built by Michael Weiser as a recruiting challenge</h2>
    </header>
  )
}

function MoviesDisplay() {

  const [movieData, setMovieData] = useState([])
  
  return(
    <div>

    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
