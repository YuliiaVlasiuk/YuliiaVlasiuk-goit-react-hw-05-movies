import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MovieList } from '../components/MovieList';

import axios from 'axios';
const API_KEY = '7fcadb4f45c26a7f0b88a5d0e3a0d367';
const BASE_URL = `https://api.themoviedb.org/3/`;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const movieName = searchParams.get('name') ?? '';

  async function searchMovieByName(movieName) {
    try {
      const response = await axios.get(
        `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${movieName}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  const formSubmit = event => {
    event.preventDefault();
    const movieName = event.target.name.value;

    if (movieName.trim() === '') {
      alert('Please enter name');
      return;
    }

    if (movieName === '') {
      return setSearchParams({});
    }
    setSearchParams({ name: movieName });

    searchMovieByName(movieName);
    setName('');
  };

  const handleChange = event => {
    setName(event.currentTarget.value);
  };

  useEffect(() => {
    if (movieName === '') {
      setSearchParams({});
    }
  }, [movieName, setSearchParams]);


  useEffect(() => {
    if (movies === []) {
      return;
    }
    searchMovieByName(movieName);
    
  }, [movies, movieName]);
  
  return (
    <main>
      <div>
        <form onSubmit={formSubmit}>
          <input
            type="text"
            name="name"
            placeholder="enter movie name "
            value={name}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>

        <MovieList movies={movies} />
      </div>
    </main>
  );
};

export default Movies;
