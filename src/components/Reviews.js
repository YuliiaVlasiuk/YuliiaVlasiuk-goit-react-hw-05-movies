import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';
const API_KEY = '7fcadb4f45c26a7f0b88a5d0e3a0d367';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  

  const getReviews = async id => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data;
  };
 
  
  useEffect(() => {
    getReviews(movieId).then(data => setReviews(data.results));
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
        : "Sorry, we don't have any review for this movie"}
    </ul>
  );
};
export default Reviews;