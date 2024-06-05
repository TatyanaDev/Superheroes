import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  heroes: [],
  isFetching: false,
  error: null,
};

function heroReducer (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_HERO_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ACTION_TYPES.GET_HERO_SUCCESS: {
      const {
        payload: { heroes: newHeroes },
      } = action;
      const { heroes } = state;
      return {
        ...state,
        isFetching: false,
        error: null,
        heroes: [...heroes, ...newHeroes],
      };
    }
    case ACTION_TYPES.GET_HERO_ERROR: {
      const {
        payload: { error },
      } = action;
      return {
        ...state,
        isFetching: false,
        error,
      };
    }
    case ACTION_TYPES.CREATE_HERO_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ACTION_TYPES.CREATE_HERO_SUCCESS: {
      const { values: hero } = action;
      const { heroes } = state;
      return {
        ...state,
        isFetching: false,
        error: null,
        heroes: [...heroes, hero],
      };
    }
    case ACTION_TYPES.CREATE_HERO_ERROR: {
      const { error } = action;
      return {
        ...state,
        isFetching: false,
        error,
      };
    }
    default:
      return state;
  }
}

export default heroReducer;
