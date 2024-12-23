import ACTION_TYPES from "../actions/types";

const initialState = {
  superheroes: [],
  isFetching: false,
  error: null,
};

const superheroReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create superhero
    case ACTION_TYPES.CREATE_SUPERHERO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPES.CREATE_SUPERHERO_SUCCESS: {
      const { superhero } = action.payload;

      return {
        ...state,
        superheroes: [superhero, ...state.superheroes],
        isFetching: false,
        error: null,
      };
    }

    case ACTION_TYPES.CREATE_SUPERHERO_ERROR: {
      const { error } = action.payload;

      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    // Update superhero
    case ACTION_TYPES.UPDATE_SUPERHERO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPES.UPDATE_SUPERHERO_SUCCESS: {
      const { superhero } = action.payload;

      return {
        ...state,
        superheroes: state.superheroes.map((existingSuperhero) =>
          existingSuperhero.id === superhero.id ? superhero : existingSuperhero
        ),
        isFetching: false,
        error: null,
      };
    }

    case ACTION_TYPES.UPDATE_SUPERHERO_ERROR: {
      const { error } = action.payload;

      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    // Get superheroes
    case ACTION_TYPES.GET_SUPERHEROES_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };

    case ACTION_TYPES.GET_SUPERHEROES_SUCCESS: {
      const { superheroes } = action.payload;

      return {
        ...state,
        superheroes: [...state.superheroes, ...superheroes],
        isFetching: false,
        error: null,
      };
    }

    case ACTION_TYPES.GET_SUPERHEROES_ERROR: {
      const { error } = action.payload;

      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    // Delete superhero
    case ACTION_TYPES.DELETE_SUPERHERO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPES.DELETE_SUPERHERO_SUCCESS: {
      const { id } = action.payload;

      return {
        ...state,
        superheroes: state.superheroes.filter(
          (superhero) => superhero.id !== parseInt(id)
        ),
        isFetching: false,
        error: null,
      };
    }

    case ACTION_TYPES.DELETE_SUPERHERO_ERROR: {
      const { error } = action.payload;

      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    default:
      return state;
  }
};

export default superheroReducer;
