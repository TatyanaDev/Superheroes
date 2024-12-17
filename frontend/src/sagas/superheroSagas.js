import { put } from "redux-saga/effects";
import * as API from "../api";
import * as ActionCreators from "../actions";

export function* createSuperheroSaga(action) {
  try {
    const { superhero } = action.payload;

    const { data: createdSuperhero } = yield API.createSuperhero(superhero);

    yield put(ActionCreators.createSuperheroSuccess(createdSuperhero));
  } catch (err) {
    const error = err.response?.data?.errors[0]?.message || "An unknown error occurred";

    yield put(ActionCreators.createSuperheroError(error));
  }
}

export function* updateSuperheroSaga(action) {
  try {
    const { id, newSuperheroData } = action.payload;

    const { data: updatedSuperhero } = yield API.updateSuperhero(
      id,
      newSuperheroData
    );

    yield put(ActionCreators.updateSuperheroSuccess(updatedSuperhero));
  } catch (err) {
    const error = err.response?.data?.errors[0]?.message || "An unknown error occurred";

    yield put(ActionCreators.updateSuperheroError(error));
  }
}

export function* getSuperheroesSaga(action) {
  try {
    const { data: superheroes } = yield API.getSuperheroes(action.payload);

    yield put(ActionCreators.getSuperheroesSuccess(superheroes));
  } catch (err) {
    const error = err.response?.data?.errors[0]?.message || "An unknown error occurred";

    yield put(ActionCreators.getSuperheroesError(error));
  }
}

export function* deleteSuperheroSaga(action) {
  try {
    const { id } = action.payload;

    const { data: deletedSuperheroId } = yield API.deleteSuperhero(id);

    yield put(ActionCreators.deleteSuperheroSuccess(deletedSuperheroId));
  } catch (err) {
    const error = err.response?.data?.errors[0]?.message || "An unknown error occurred";

    yield put(ActionCreators.deleteSuperheroError(error));
  }
}
