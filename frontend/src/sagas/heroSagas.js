import { put } from 'redux-saga/effects';
import * as API from '../api';
import * as HeroActionCreators from '../actions/heroCreators';

export function * getHeroesSaga (action) {
  try {
    const {
      data: { data: heroes },
    } = yield API.getHeroes(action.payload);

    yield put(HeroActionCreators.getHeroSuccess({ heroes }));
  } catch (error) {
    yield put(HeroActionCreators.getHeroError({ error }));
  }
}

export function * createHeroSaga (action) {
  try {
    const {
      data: {
        data: [hero],
      },
    } = yield API.createHero(action.values);
    
    yield put(HeroActionCreators.createHeroSuccess(hero));
  } catch (error) {
    yield put(HeroActionCreators.createHeroError(error));
  }
}


