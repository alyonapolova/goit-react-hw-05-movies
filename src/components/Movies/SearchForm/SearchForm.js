import { useSearchParams } from 'react-router-dom';
import css from '../../MovieDetails/MovieDetails.module.css';
const SearchForm = ({ submit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  const handleChange = ({ target: { value } }) => {
    value ? setSearchParams({ query: value }) : setSearchParams({});
  };

  const handleSubmit = e => {
    e.preventDefault();
    submit(query);
  };
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        onChange={handleChange}
        value={query || ''}
      ></input>
      <button className={css.button2}>Search</button>
    </form>
  );
};

export default SearchForm;
