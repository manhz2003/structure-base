const listCategory = (state, payload) => {
  {
    return {
      ...state,
      categories: [...payload],
    };
  }
};

const createCategory = (state, payload) => {
  {
    return {
      ...state,
      categories: [...state.categories, payload],
    };
  }
};

const updateCategory = (state, payload) => {
  return {
    ...state,
    categories: [
      ...state.categories.filter((item) =>
        item.id != payload._id ? payload.newCategory : item
      ),
    ],
  };
};

const deleteCategory = (state, id) => {
  return {
    ...state,
    categories: [...state.categories.filter((item) => item._id !== id)],
  };
};

export const reducerCategory = (state, action) => {
  switch (action.type) {
    case "CATEGORY/LIST":
      return listCategory(state, action.payload);
    case "CATEGORY/CREATE":
      return createCategory(state, action.payload);
    case "CATEGORY/UPDATE":
      return updateCategory(state, action.payload);
    case "CATEGORY/DELETE":
      return deleteCategory(state, action.payload);
    default:
      return state;
  }
};
