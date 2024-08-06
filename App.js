import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import MovieCard from './MovieCard';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://www.omdbapi.com/', {
        params: {
          s: query,
          apikey: 'a83a1676'
        }
      });
      setMovies(response.data.Search || []);
      setError(response.data.Error || '');
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Film adını girin"
        />
        <button onClick={handleSearch}>Ara</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
