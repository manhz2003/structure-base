//  import library
import React, { useRef, useState, useContext, useEffect } from "react";
import { BiLoaderCircle } from "react-icons/bi";

//  import common
import { notify } from "@/heplers/notify";
import request from "@/service";
import { regex } from "@/utils/validation";
import { setIsModalSuccess } from "@/actions";
import { appStore } from "@/store/app";

//  import component
import Button from "@/components/Common/Button";

//  import styles
import styles from "@/assets/styles/modal.module.scss";
import { productStore } from "@/store/products";
import { createProduct } from "@/actions/product";
import { categoryStore } from "@/store/categories";
import { listCategory } from "@/actions/categoryAction";

const ModalAddProduct = () => {
  const [inputValue, setInputValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [productState, productDispatch] = useContext(productStore);
  const [categoryState, categoryDispatch] = useContext(categoryStore);
  const [appState, appDispatch] = useContext(appStore);

  const formRef = useRef(null);
  const { price } = regex;

  const fetchCategory = async () => {
    await request
      .get("categories")
      .then(({ data, message }) => {
        categoryDispatch(listCategory(data));
        notify.success(message);
      })
      .catch((error) => {
        notify.error(error);
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const validateEmpty = (value, name) => {
    if (value == "") {
      setErrors({ ...errors, [name]: `This field is required.` });
    } else {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    validateEmpty(value, name);
  };

  const handleBlurPrice = () => {
    if (inputValue.price) {
      if (!price.test(inputValue.price)) {
        setErrors({ ...errors, price: `Invalid price  ` });
      } else {
        setErrors({ ...errors, price: null });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.title) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: `This field is required.`,
      }));
    }

    if (!inputValue.price) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: `This field is required.`,
      }));
    }

    if (!inputValue.description) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: `This field is required.`,
      }));
    }

    if (!inputValue.category || inputValue.category == "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        category: `This field is required.`,
      }));
    }

    let isError = false;
    for (const key in errors) {
      if (errors[key] != null) isError = true;
    }
    if (Object.keys(errors).length == 0) {
      isError = true;
    }

    if (!isError) {
      setIsLoading(true);
      await request
        .post("products", {
          ...inputValue,
        })
        .then(({ message, data }) => {
          productDispatch(
            createProduct({
              ...inputValue,
            })
          );
          notify.success(message);
        })
        .catch((error) => notify.error(error))
        .finally(() => {
          setIsLoading(false);
          setInputValue("");
          formRef.current.reset();
          appDispatch(setIsModalSuccess(true));
        });
    }
  };
  return (
    <div className={styles.wrapper}>
      <h1>Create Product</h1>
      <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={inputValue?.title}
            onChange={(e) => handleChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className={`text-xs min-h-[14px] ${styles.required}`}>
            {errors && errors.title}
          </p>
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Price
          </label>
          <input
            type="text"
            name="price"
            defaultValue={inputValue?.price}
            onChange={(e) => handleChange(e)}
            onBlur={handleBlurPrice}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className={`text-xs min-h-[14px] ${styles.required}`}>
            {errors && errors.price}
          </p>
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Description
          </label>
          <input
            name="description"
            onChange={(e) => handleChange(e)}
            defaultValue={inputValue?.description}
            type="text"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className={`text-xs min-h-[14px] ${styles.required}`}>
            {errors && errors.description}
          </p>
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Category
          </label>
          <select
            name="category"
            onChange={(e) => handleChange(e)}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose a category </option>
            {categoryState.categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <p className={`text-xs min-h-[14px] ${styles.required}`}>
            {errors && errors.category}
          </p>
        </div>

        {isLoading ? (
          <Button type="default" disabled>
            <BiLoaderCircle className={styles.loading} />
          </Button>
        ) : (
          <Button type="default">Submit</Button>
        )}
      </form>
    </div>
  );
};

export default ModalAddProduct;
