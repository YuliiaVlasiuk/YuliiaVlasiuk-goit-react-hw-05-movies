import { useParams, useLocation, Outlet } from 'react-router-dom';
import { BackLink } from '../components/BackLink';
import { Suspense } from 'react';

import {
  GenresList,
  InfoBox,
  MovieBox,
  MovieInfo,
  Title,
  InfoLi,
  InfoLink,
} from './MovieDetails.styled';

import { useState, useEffect } from 'react';
import axios from 'axios';
const API_KEY = '7fcadb4f45c26a7f0b88a5d0e3a0d367';
const BASE_URL = `https://api.themoviedb.org/3/`;

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  async function fetchFullInfoMovie(id) {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      setMovie(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFullInfoMovie(movieId);
  }, [movieId]);

  const { original_title, overview, genres, poster_path, vote_average } = movie;
  const score = vote_average * 10;
  const scoreToFixed = score.toFixed(0);

  return (
    <main>
      <BackLink to={backLinkHref}>Back to products</BackLink>
      <MovieBox>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          width={240}
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
          <InfoLi>
            <InfoLink to="cast" state={{ ...location.state }}>
              {' '}
              Cast
            </InfoLink>
          </InfoLi>
          <InfoLi>
            <InfoLink to="reviews" state={{ ...location.state }}>
              {' '}
              Reviews
            </InfoLink>
          </InfoLi>
        </ul>
      </InfoBox>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};
export default MovieDetails;
