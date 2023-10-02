import { getReviewsInfo } from 'components/Api/Api';
import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const [reviewsMov, setReviewsMov] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  //console.log(movieId);

  useEffect(() => {
    const showReviews = async () => {
      try {
        setIsLoading(true);
        const data = await getReviewsInfo(movieId);
        setReviewsMov(data.results);
        // console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    showReviews();
    // eslint-disable-next-line
  }, []);

  return (
    <ul>
      {isLoading && <Loader />}
      {!isLoading && reviewsMov.length === 0 ? (
        <p>We don't have any reviews for this movie</p>
      ) : (
        reviewsMov.map(mov => (
          <li key={mov.id}>
            <h2>Author: {mov.author}</h2>
            <p>{mov.content}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default Reviews;
