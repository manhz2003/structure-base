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
import { productStore } from "@/store/products";
import { deleteProduct, listProduct } from "@/actions/product";
import ListProduct from "@/components/Products/ListProduct";
import ModalViewProduct from "@/components/Modals/ModalViewProduct";
import ModalRemoveProduct from "@/components/Modals/ModalRemoveProduct";
import ModalAddProduct from "@/components/Modals/ModalAddProduct";
import ModalEditProduct from "@/components/Modals/ModalEditProduct";
import Pagination from "@/components/Common/Pagination";
import { LIMIT } from "@/utils";

export default function Product() {
  const [appState, appDispatch] = useContext(appStore);
  const [productState, productDispatch] = useContext(productStore);
  const [modalChildren, setModalChidren] = useState(null);
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [isAction, setIsAction] = useState(false);
  const [product, setProduct] = useState({});
  const [overLayLoading, setOverLayLoading] = useState(false);
  const [page, setPage] = useState(0);

  const fetchProduct = async (pageNumber = 1) => {
    appDispatch(setIsLoading(true));
    await request
      .get(`products?limit=${LIMIT}&page=${pageNumber}`)
      .then(({ data, message, metadata }) => {
        setPage(metadata.totalProducts);
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
    fetchProduct();
  }, []);

  const handleShowProduct = (product) => {
    setIsTitle(false);
    setIsAction(false);
    setModalChidren(<ModalViewProduct product={product} />);
  };

  const handleCreateProduct = () => {
    setIsTitle(false);
    setIsAction(false);
    setModalChidren(<ModalAddProduct />);
  };

  const handleRemoveProduct = (product) => {
    setProduct(product);
    setModalChidren(<ModalRemoveProduct title={product.title} />);
    setIsTitle("Remove Product");
    setIsAction(true);
  };

  const handleAgree = async () => {
    const { title } = product;
    const newTitle = title.replace(/ /g, "-");
    appDispatch(setIsModalSuccess(true));
    setOverLayLoading(true);
    await request
      .delete(`products/${newTitle}`)
      .then(({ message }) => {
        productDispatch(deleteProduct(product._id));

        notify.success(message);
      })
      .catch((message) => notify.error(message))
      .finally(() => {
        setProduct({});
        setOverLayLoading(false);
      });
  };

  const handleEditProduct = (product) => {
    setProduct(product);
    setIsTitle(false);
    setIsAction(false);
    setModalChidren(<ModalEditProduct product={product} />);
  };

  const handlePagination = (pageNumber) => {
    fetchProduct(pageNumber);
  };
  return (
    <>
      <LayoutAdmin>
        <span onClick={() => handleCreateProduct()}>
          <Button icon={<AiOutlineUserAdd />}>Create Product</Button>
        </span>
        {appState.isLoading ? (
          <Skeleton />
        ) : (
          <ListProduct
            onRemove={handleRemoveProduct}
            onEdit={handleEditProduct}
            onShow={handleShowProduct}
            products={productState.products}
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
      ></Modals>
      {overLayLoading && <OverLayLoading />}
    </>
  );
}
