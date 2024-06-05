import ACTION_TYPES from './actionTypes';

export const createHeroRequest = values => ({
  type: ACTION_TYPES.CREATE_HERO_REQUEST,
  values,
});

export const createHeroSuccess = values => ({
  type: ACTION_TYPES.CREATE_HERO_SUCCESS,
  values,
});

export const createHeroError = error => ({
  type: ACTION_TYPES.CREATE_HERO_ERROR,
  error,
});

export const getHeroRequest = ({ offset, limit }) => ({
  type: ACTION_TYPES.GET_HERO_REQUEST,
  payload: { offset, limit },
});

export const getHeroSuccess = ({ heroes }) => ({
  type: ACTION_TYPES.GET_HERO_SUCCESS,
  payload: { heroes },
});

export const getHeroError = ({ error }) => ({
  type: ACTION_TYPES.GET_HERO_ERROR,
  payload: { error },
});
