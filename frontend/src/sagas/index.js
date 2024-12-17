import { takeLatest } from "redux-saga/effects";
import {
  createSuperheroSaga,
  updateSuperheroSaga,
  deleteSuperheroSaga,
  getSuperheroesSaga,
} from "./superheroSagas";
import ACTION_TYPES from "../actions/types";

function* rootSaga() {
  yield takeLatest(ACTION_TYPES.CREATE_SUPERHERO_REQUEST, createSuperheroSaga);

  yield takeLatest(ACTION_TYPES.UPDATE_SUPERHERO_REQUEST, updateSuperheroSaga);

  yield takeLatest(ACTION_TYPES.GET_SUPERHEROES_REQUEST, getSuperheroesSaga);

  yield takeLatest(ACTION_TYPES.DELETE_SUPERHERO_REQUEST, deleteSuperheroSaga);
}

export default rootSaga;
