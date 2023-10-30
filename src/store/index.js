import React, { useReducer } from "react";
import AppProvider from "./app";
import UserProvider, { userStore } from "./users";
import ProductProvider from "./products";
import CategoryProvider from "./categories";
import {
  initialAppState,
  initialUserState,
  initialProductState,
  initialCategoryState,
} from "@/utils/initial-state";

import {
  reducerApp,
  reducerUser,
  reducerCategory,
  reducerProduct,
} from "@/reducers";

const Store = ({ children }) => {
  const [appState, appDispatch] = useReducer(reducerApp, initialAppState);
  const [userState, userDispatch] = useReducer(reducerUser, initialUserState);
  const [productState, productDispatch] = useReducer(
    reducerProduct,
    initialProductState
  );
  const [categoryState, categoryDispatch] = useReducer(
    reducerCategory,
    initialCategoryState
  );

  return (
    <AppProvider value={[appState, appDispatch]}>
      <UserProvider value={[userState, userDispatch]}>
        <CategoryProvider value={[categoryState, categoryDispatch]}>
          <ProductProvider value={[productState, productDispatch]}>
            {children}
          </ProductProvider>
        </CategoryProvider>
      </UserProvider>
    </AppProvider>
  );
};

export default Store;
