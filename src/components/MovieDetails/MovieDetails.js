import { getSingleMovie } from 'components/Api/Api';
import Loader from 'components/Loader/Loader';
import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import css from './MovieDetails.module.css';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';
const MovieDetails = () => {
  const { movieId } = useParams();
  const [singleMov, setSingleMov] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const goBackRef = useRef(location.state ? location.state : '/movies');
  const navigate = useNavigate();

  // console.log(location);
  //console.log(movieId);

  useEffect(() => {
    const showSingleMovie = async () => {
      try {
        setIsLoading(true);
        setSingleMov(null);
        const data = await getSingleMovie(movieId);
        // console.log(data);
        setSingleMov(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    showSingleMovie();
    // eslint-disable-next-line
  }, []);
  const handleClickBtn = () => {
    navigate(goBackRef.current);
  };
  return (
    <div>
      {isLoading && <Loader />}
      <button className={css.button1} onClick={handleClickBtn}>
        Go back
      </button>

      {singleMov && (
        <div>
          <div className={css.first_part}>
            <img
              src={`${IMG_URL}${singleMov.poster_path}`}
              alt={singleMov.title}
            ></img>
            <div className={css.right_part}>
              <h1> {singleMov.title}</h1>
              <p>
                User score: {((singleMov.vote_average / 10) * 100).toFixed(2)}%
              </p>
              <h2>Overview</h2>
              <p>{singleMov.overview}</p>
              <h2>Genres</h2>
              <ul>
                {singleMov.genres.map(gen => (
                  <li key={gen.id}>{gen.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={css.line}></div>
          <h2>Additional information</h2>
          <ul className={css.bottom_part}>
            <li>
              <Link to="cast">Cast</Link>{' '}
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <div className={css.line}></div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
};
export default MovieDetails;
