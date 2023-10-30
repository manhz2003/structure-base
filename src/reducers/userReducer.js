const listUser = (state, payload) => {
  {
    return {
      ...state,
      users: [...payload],
    };
  }
};

const createUser = (state, payload) => {
  {
    return {
      ...state,
      users: [...state.users, payload],
    };
  }
};

const updateUser = (state, payload) => {
  return {
    ...state,
    users: [
      ...state.users.filter((item) =>
        item.id != payload._id ? payload : item
      ),
    ],
  };
};

const deleteUser = (state, id) => {
  return {
    ...state,
    users: [...state.users.filter((item) => item._id !== id)],
  };
};

export const reducerUser = (state, action) => {
  switch (action.type) {
    case "USER/LIST":
      return listUser(state, action.payload);
    case "USER/CREATE":
      return createUser(state, action.payload);
    case "USER/UPDATE":
      return updateUser(state, action.payload);
    case "USER/DELETE":
      return deleteUser(state, action.payload);
    default:
      return state;
  }
};
