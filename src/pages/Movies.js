import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import { MovieList } from "../components/MovieList";
import { SearchBox } from "../components/SearchBox";


import axios from 'axios';
const API_KEY = '7fcadb4f45c26a7f0b88a5d0e3a0d367';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  
  async function getMovies() {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
      setMovies(response.data.results)
    } catch (error) {
    console.log(error);
    }
  };
  
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get("name") ?? "";

   const visibleMovies = movies.filter((movie) =>
     movie.title.toLowerCase().includes(movieName.toLowerCase())
   );

  const updateQueryString = (name) => {
     const nextParams = name !== "" ? { name } : {};
     setSearchParams(nextParams);
   };

  useEffect(() => {
    getMovies();
      }, []);

  return (
    <main>
    <SearchBox value={movieName} onChange={updateQueryString} />
    <MovieList movies={visibleMovies} />
  </main>
 )
};

export default Movies