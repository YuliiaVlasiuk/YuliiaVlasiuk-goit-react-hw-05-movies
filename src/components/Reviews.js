import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';
const API_KEY = '7fcadb4f45c26a7f0b88a5d0e3a0d367';
const BASE_URL = `https://api.themoviedb.org/3/`;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  async function getReviews(id) {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
      );

      setReviews(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getReviews(movieId);
  }, [movieId]);

  return (
    <ul>
      {reviews.length > 0
        ? reviews.map(({ author, content, id }) => (
            <li key={id}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))
        : "We don't have any reviews for this movie"}
    </ul>
  );
};
export default Reviews;
