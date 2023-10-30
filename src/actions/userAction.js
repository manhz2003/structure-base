export const listUser = (payload) => {
  return {
    type: "USER/LIST",
    payload,
  };
};

export const createUser = (payload) => {
  return {
    type: "USER/CREATE",
    payload,
  };
};

export const deleteUser = (payload) => {
  return {
    type: "USER/DELETE",
    payload,
  };
};

export const updateUser = (payload) => {
  return {
    type: "USER/UPDATE",
    payload,
  };
};
