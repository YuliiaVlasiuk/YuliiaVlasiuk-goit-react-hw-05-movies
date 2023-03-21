import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { BackLink } from '../components/BackLink';

import {
  GenresList,
  InfoBox,
  MovieBox,
  MovieInfo,
  Title,
} from './MovieDetails.styled';

import { useState, useEffect } from 'react';
import axios from 'axios';
const API_KEY = '7fcadb4f45c26a7f0b88a5d0e3a0d367';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});

  const { movieId } = useParams();

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  const fetchFullInfoMovie = async id => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  };

  useEffect(() => {
    fetchFullInfoMovie(movieId).then(data => {
      setMovie(data);
    });
  }, [movieId]);

  const { original_title, overview, genres, poster_path, vote_average } = movie;
  const score = vote_average * 10;
  const scoreToFixed = score.toFixed(2);

  return (
    <main>
      <BackLink to={backLinkHref}>Back to products</BackLink>

      <MovieBox>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          width={200}
          loading="lazy"
          alt="poster"
        />
        <MovieInfo>
          <Title>{original_title}</Title>
          <h3>User score: {scoreToFixed}%</h3>
          <h3>Overview</h3>
          <p>{overview} </p>
          <h3>Genres</h3>
          <GenresList>
            {genres &&
              genres.length &&
              genres.map(({ id, name }) => <li key={id}>{name}</li>)}
          </GenresList>
        </MovieInfo>
      </MovieBox>
      <InfoBox>
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to="cast" state={{ ...location.state }}>
              Cast
            </Link>
          </li>
          <li>
            {' '}
            <Link to="reviews" state={{ ...location.state }}>
              Reviews
            </Link>
          </li>
        </ul>
      </InfoBox>
      <Outlet />
    </main>
  );
};

export default MovieDetails;
