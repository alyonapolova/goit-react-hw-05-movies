import { Dna } from 'react-loader-spinner';
import React from 'react';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <Dna />
    </div>
  );
};

export default Loader;
