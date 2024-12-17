import ACTION_TYPES from "./types";

// Create superhero
export const createSuperheroRequest = (superhero) => ({
  type: ACTION_TYPES.CREATE_SUPERHERO_REQUEST,
  payload: { superhero },
});

export const createSuperheroSuccess = (superhero) => ({
  type: ACTION_TYPES.CREATE_SUPERHERO_SUCCESS,
  payload: { superhero },
});

export const createSuperheroError = (error) => ({
  type: ACTION_TYPES.CREATE_SUPERHERO_ERROR,
  payload: { error },
});

// Update superhero
export const updateSuperheroRequest = (id, newSuperheroData) => ({
  type: ACTION_TYPES.UPDATE_SUPERHERO_REQUEST,
  payload: { id, newSuperheroData },
});

export const updateSuperheroSuccess = (superhero) => ({
  type: ACTION_TYPES.UPDATE_SUPERHERO_SUCCESS,
  payload: { superhero },
});

export const updateSuperheroError = (error) => ({
  type: ACTION_TYPES.UPDATE_SUPERHERO_ERROR,
  payload: { error },
});

// Get superheroes
export const getSuperheroesRequest = ({ limit, offset }) => ({
  type: ACTION_TYPES.GET_SUPERHEROES_REQUEST,
  payload: { limit, offset },
});

export const getSuperheroesSuccess = (superheroes) => ({
  type: ACTION_TYPES.GET_SUPERHEROES_SUCCESS,
  payload: { superheroes },
});

export const getSuperheroesError = (error) => ({
  type: ACTION_TYPES.GET_SUPERHEROES_ERROR,
  payload: { error },
});

// Delete superhero
export const deleteSuperheroRequest = (id) => ({
  type: ACTION_TYPES.DELETE_SUPERHERO_REQUEST,
  payload: { id },
});

export const deleteSuperheroSuccess = (id) => ({
  type: ACTION_TYPES.DELETE_SUPERHERO_SUCCESS,
  payload: { id },
});

export const deleteSuperheroError = (error) => ({
  type: ACTION_TYPES.DELETE_SUPERHERO_ERROR,
  payload: { error },
});
