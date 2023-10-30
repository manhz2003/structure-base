//  import library
import React, { useRef, useState, useContext } from "react";
import { BiLoaderCircle } from "react-icons/bi";

//  import common
import { notify } from "@/heplers/notify";
import request from "@/service";
import { setIsModalSuccess } from "@/actions";
import { appStore } from "@/store/app";
import { categoryStore } from "@/store/categories";
import { createCategory } from "@/actions/categoryAction";

//  import component
import Button from "@/components/Common/Button";

//  import styles
import styles from "@/assets/styles/modal.module.scss";

const ModalAddCategory = () => {
  const [inputValue, setInputValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [categoryState, categoryDispatch] = useContext(categoryStore);
  const [appState, appDispatch] = useContext(appStore);
  const formRef = useRef(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: `This field is required.`,
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
        .post("categories", {
          ...inputValue,
        })
        .then(({ message }) => {
          categoryDispatch(
            createCategory({
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
      <h1>Create Category</h1>
      <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={inputValue?.name}
            onChange={(e) => handleChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className={`text-xs min-h-[14px] ${styles.required}`}>
            {errors && errors.name}
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

export default ModalAddCategory;
