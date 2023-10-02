import { getCastInfo } from 'components/Api/Api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';

const Cast = () => {
  const { movieId } = useParams();
  const [castInfo, setCastInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(movieId);

  useEffect(() => {
    const showCastInfo = async () => {
      try {
        setIsLoading(true);
        const data = await getCastInfo(movieId);
        // console.log(data);
        setCastInfo(data.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    showCastInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <ul>
      {isLoading && <Loader />}
      {!isLoading && castInfo.length === 0 ? (
        <p>We don't have information about cast</p>
      ) : (
        castInfo.map(mov => (
          <li key={mov.id}>
            <img
              src={`${IMG_URL}${mov.profile_path}`}
              alt={mov.name}
              width="200"
            ></img>
            <h2>{mov.name}</h2>
            <p>Character: {mov.character}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default Cast;
