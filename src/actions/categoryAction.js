export const listCategory = (payload) => {
  return {
    type: "CATEGORY/LIST",
    payload,
  };
};

export const createCategory = (payload) => {
  return {
    type: "CATEGORY/CREATE",
    payload,
  };
};

export const deleteCategory = (payload) => {
  return {
    type: "CATEGORY/DELETE",
    payload,
  };
};

export const updateCategory = (payload) => {
  return {
    type: "CATEGORY/UPDATE",
    payload,
  };
};
