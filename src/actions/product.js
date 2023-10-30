export const listProduct = (payload) => {
  return {
    type: "PRODUCT/LIST",
    payload,
  };
};

export const createProduct = (payload) => {
  return {
    type: "PRODUCT/CREATE",
    payload,
  };
};

export const deleteProduct = (payload) => {
  return {
    type: "PRODUCT/DELETE",
    payload,
  };
};

export const updateProduct = (payload) => {
  return {
    type: "PRODUCT/UPDATE",
    payload,
  };
};
