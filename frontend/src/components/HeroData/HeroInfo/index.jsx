import React from 'react'
import HeroList from './HeroList';

const HeroInfo = ({
  visibility,
  loadMore,
  isFetching,
  error,
  heroes,
  hidden,
}) => {
  return (
    <section>
      <button onClick={visibility}>Full info</button>
      <button onClick={loadMore}>Load more Heroes!</button>
      <h1>HeroList</h1>
      {isFetching && 'LOADING...'}
      {error && error.name}
      <article>
        {heroes.map((hero, index) => (
          <HeroList key={index} hero={hero} hidden={hidden} />
        ))}
      </article>
    </section>
  );
};

export default HeroInfo;
