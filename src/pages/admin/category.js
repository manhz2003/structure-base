// import library
import { AiOutlineUserAdd } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";

// import common
import { notify } from "@/heplers/notify";
import { appStore } from "@/store/app";
import request from "@/service/index";
import { setIsModalSuccess, setIsLoading } from "@/actions";

// import components

import Skeleton from "@/components/Common/Skeleton";
import LayoutAdmin from "@/components/Layout";
import Button from "@/components/Common/Button";
import Modals from "@/components/Common/Modal";
import OverLayLoading from "@/components/Common/OverlayLoading";
import ListCategories from "@/components/Category/ListCategory";
import { categoryStore } from "@/store/categories";
import { deleteCategory, listCategory } from "@/actions/categoryAction";
import ModalViewCategory from "@/components/Modals/ModalViewCategory";
import ModalRemoveCategory from "@/components/Modals/ModalRemoveCategory";
import ModalAddCategory from "@/components/Modals/ModalAddCategory";
import ModalEditCategory from "@/components/Modals/ModalEditCategory";
import { LIMIT } from "@/utils";
import Pagination from "@/components/Common/Pagination";

export default function Home() {
  const [appState, appDispatch] = useContext(appStore);
  const [categoryState, categoryDispatch] = useContext(categoryStore);
  const [modalChildren, setModalChidren] = useState(null);
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [isAction, setIsAction] = useState(false);
  const [category, setCategory] = useState({});
  const [overLayLoading, setOverLayLoading] = useState(false);
  const [page, setPage] = useState(0);

  const fetchCategory = async (pageNumber = 1) => {
    appDispatch(setIsLoading(true));
    await request
      .get("categories")
      .then(({ data, message }) => {
        setPage(data.length);
        const newCategories = data.filter((item, index) => {
          if (LIMIT * pageNumber > index && LIMIT * (pageNumber - 1) <= index) {
            return item;
          }
        });
        categoryDispatch(listCategory(newCategories));
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
  }, []);

  const handleShowCategory = (category) => {
    setIsTitle(false);
    setIsAction(false);
    setModalChidren(<ModalViewCategory category={category} />);
  };

  const handleCreateCategory = () => {
    setIsTitle(false);
    setIsAction(false);
    setModalChidren(<ModalAddCategory />);
  };

  const handleRemoveCategory = (category) => {
    setCategory(category);
    setModalChidren(<ModalRemoveCategory name={category.name} />);
    setIsTitle("Remove Category");
    setIsAction(true);
  };

  const handleAgree = async () => {
    const { _id } = category;
    appDispatch(setIsModalSuccess(true));
    setOverLayLoading(true);
    await request
      .delete(`categories/${_id}`)
      .then(({ message }) => {
        categoryDispatch(deleteCategory(_id));

        notify.success(message);
      })
      .catch((message) => notify.error(message))
      .finally(() => {
        setCategory({});
        setOverLayLoading(false);
      });
  };

  const handleEditUser = (category) => {
    setCategory(category);
    setIsTitle(false);
    setIsAction(false);
    setModalChidren(<ModalEditCategory category={category} />);
  };

  const handlePagination = (pageNumber) => {
    fetchUser(pageNumber);
  };

  return (
    <>
      <LayoutAdmin>
        <span onClick={() => handleCreateCategory()}>
          <Button icon={<AiOutlineUserAdd />}>Create Category</Button>
        </span>
        {appState.isLoading ? (
          <Skeleton />
        ) : (
          <ListCategories
            onRemove={handleRemoveCategory}
            onEdit={handleEditUser}
            onShow={handleShowCategory}
            categories={categoryState.categories}
          />
        )}
        <Pagination onPagination={handlePagination} page={page} />
      </LayoutAdmin>

      <Modals
        title={isTitle}
        action={isAction}
        isClose={isCloseModal}
        content={modalChildren}
        onAgree={handleAgree}
      />
      {overLayLoading && <OverLayLoading />}
    </>
  );
}
