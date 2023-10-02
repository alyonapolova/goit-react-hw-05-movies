import { getTrendMovies } from 'components/Api/Api';
import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TrendyMovies = () => {
  const [trendyMov, setTrendyMov] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  // console.log(location);
  useEffect(() => {
    const showTrendyMov = async () => {
      try {
        setIsLoading(true);
        const data = await getTrendMovies();
        setTrendyMov([...trendyMov, ...data.results]);
        // console.log(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    showTrendyMov();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {isLoading && <Loader />}
        {trendyMov.map(movie => (
          <li key={movie.id}>
            {' '}
            <Link to={`movies/${movie.id}`} state={location}>
              {movie.title ? movie.title : movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TrendyMovies;
