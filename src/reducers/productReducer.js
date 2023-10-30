const listProduct = (state, payload) => {
  {
    return {
      ...state,
      products: [...payload],
    };
  }
};

const createProduct = (state, payload) => {
  {
    return {
      ...state,
      products: [...state.products, payload],
    };
  }
};

const updateProduct = (state, payload) => {
  const { product, id } = payload;

  return {
    ...state,
    products: [
      ...state.products.filter((item) => (item._id == id ? product : item)),
    ],
  };
};

const deleteProduct = (state, id) => {
  return {
    ...state,
    products: [...state.products.filter((item) => item._id !== id)],
  };
};

export const reducerProduct = (state, action) => {
  switch (action.type) {
    case "PRODUCT/LIST":
      return listProduct(state, action.payload);
    case "PRODUCT/CREATE":
      return createProduct(state, action.payload);
    case "PRODUCT/UPDATE":
      return updateProduct(state, action.payload);
    case "PRODUCT/DELETE":
      return deleteProduct(state, action.payload);
    default:
      return state;
  }
};
