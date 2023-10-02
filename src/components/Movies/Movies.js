import { getSearchMovie } from 'components/Api/Api';
import Loader from 'components/Loader/Loader';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import SearchForm from './SearchForm/SearchForm';

const Movies = () => {
  const [searchMov, setSearchMov] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const query = searchParams.get('query');
  const ref = useRef(query);

  const handleSetSearchQuery = value => {
    setSearchValue(value);
  };

  const showSearchMovie = useCallback(async searchValue => {
    try {
      setIsLoading(true);

      const data = await getSearchMovie(searchValue);
      setSearchMov([...data.results]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    searchValue && showSearchMovie(searchValue);
  }, [showSearchMovie, searchValue]);

  useEffect(() => {
    ref.current && showSearchMovie(ref.current);
  }, [showSearchMovie]);

  return (
    <div>
      <SearchForm submit={handleSetSearchQuery} />

      <ul>
        {isLoading && <Loader />}
        {searchMov &&
          searchMov.map(mov => (
            <li key={mov.id}>
              <Link to={`${mov.id}`} state={location}>
                {mov.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Movies;
