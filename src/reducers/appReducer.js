export const reducerApp = (state, action) => {
  let newState;
  switch (action.type) {
    case "SET_IS_LOADING": {
      newState = {
        ...state,
        isLoading: action.payload,
      };
      return newState;
    }
    case "SET_IS_MODAL_SUCCESS":
      newState = {
        ...state,
        isModalSuccess: action.payload,
      };
      return newState;
    default:
      return newState;
  }
};
