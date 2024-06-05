import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as HeroActionCreators from '../../actions/heroCreators';
import HeroInfo from './HeroInfo';

const HeroData = props => {
  const { heroes, isFetching, error, getHeroesRequest } = props;

  const [hidden, setHidden] = useState(true);

  const loadMore = () => getHeroesRequest({ offset: heroes.length });
  const visibility = () => {
    setHidden(hidden => !hidden);
  };

  useEffect(() => {
    getHeroesRequest();
  }, []);

  return (
    <HeroInfo
      visibility={visibility}
      loadMore={loadMore}
      isFetching={isFetching}
      error={error}
      heroes={heroes}
      hidden={hidden}
    />
  );
};

const mapStateToProps = ({ hero }) => hero;
const mapDispatchToProps = dispatch => ({
  getHeroesRequest: ({ limit, offset } = {}) =>
    dispatch(HeroActionCreators.getHeroRequest({ offset, limit })),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroData);
