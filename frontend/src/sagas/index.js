import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import { createHeroSaga, getHeroesSaga } from './heroSagas';

function * rootSaga () {
  yield takeLatest(ACTION_TYPES.CREATE_HERO_REQUEST, createHeroSaga);
  yield takeLatest(ACTION_TYPES.GET_HERO_REQUEST, getHeroesSaga);
}

export default rootSaga;
