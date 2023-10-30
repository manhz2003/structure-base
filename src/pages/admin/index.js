// import component
import { listUser, setIsLoading } from "@/actions";
import { listCategory } from "@/actions/categoryAction";
import { listProduct } from "@/actions/product";
import Dashboard from "@/components/Dashboard";
import LayoutAdmin from "@/components/Layout";
import { notify } from "@/heplers/notify";
import request from "@/service";
import { appStore } from "@/store/app";

// import common
import { categoryStore } from "@/store/categories";
import { productStore } from "@/store/products";
import { userStore } from "@/store/users";
import { useContext, useEffect } from "react";

const Admin = () => {
  const [appState, appDispatch] = useContext(appStore);
  const [userState, userDispatch] = useContext(userStore);
  const [categoryState, categoryDispatch] = useContext(categoryStore);
  const [productState, productDispatch] = useContext(productStore);

  const fetchCategory = async () => {
    appDispatch(setIsLoading(true));
    await request
      .get("categories")
      .then(({ data, message }) => {
        categoryDispatch(listCategory(data));
        notify.success(message);
      })
      .catch((error) => {
        notify.error(error);
      })
      .finally(() => {
        appDispatch(setIsLoading(false));
      });
  };

  const fetchUser = async () => {
    appDispatch(setIsLoading(true));
    await request
      .get("users")
      .then(({ data, message }) => {
        userDispatch(listUser(data));
        notify.success(message);
      })
      .catch((error) => {
        notify.error(error);
      })
      .finally(() => {
        appDispatch(setIsLoading(false));
      });
  };

  const fetchProduct = async () => {
    appDispatch(setIsLoading(true));
    await request
      .get(`products`)
      .then(({ data, message }) => {
        productDispatch(listProduct(data));
        notify.success(message);
      })
      .catch((error) => {
        notify.error(error);
      })
      .finally(() => {
        appDispatch(setIsLoading(false));
      });
  };

  useEffect(() => {
    fetchCategory();
    fetchUser();
    fetchProduct();
  }, []);

  return (
    <>
      <LayoutAdmin>
        <Dashboard
          products={productState.products}
          categories={categoryState.categories}
          users={userState.users}
        />
      </LayoutAdmin>
    </>
  );
};

export default Admin;
