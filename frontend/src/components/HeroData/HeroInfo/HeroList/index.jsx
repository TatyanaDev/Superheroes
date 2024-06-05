import React from 'react';

const HeroList = ({ index, hero, hidden }) => {
  return (
    <div key={index}>
      <>
        <div>{hero.images}</div>
        <div>{hero.nickName}</div>
      </>
      <div hidden={hidden}>
        <div>{hero.id}</div>
        <div>{hero.realName}</div>
        <div>{hero.originDescription}</div>
        <div>{hero.catchPhrase}</div>
        <div>{hero.superpowers}</div>
      </div>
    </div>
  );
};

export default HeroList;
