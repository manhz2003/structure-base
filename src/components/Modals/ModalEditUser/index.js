//  import library
import React, { useState, useContext, useEffect } from "react";
import { BiLoaderCircle } from "react-icons/bi";

//  import common
import { userStore } from "@/store/users";
import request from "@/service";
import { notify } from "@/heplers/notify";
import { setIsModalSuccess, updateUser } from "@/actions";
export { regex } from "@/utils/validation";

//  import component
import Button from "@/components/Common/Button";

// import styles
import styles from "@/assets/styles/modal.module.scss";
import { regex } from ".";
import { appStore } from "@/store/app";

const ModalEditUser = ({ user }) => {
  const [inputValue, setInputValue] = useState({});
  const [userState, userDispatch] = useContext(userStore);
  const [appState, appDispatch] = useContext(appStore);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { number } = regex;
  const { _id } = user;

  useEffect(() => {
    setInputValue(user);
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

  const handleBlurNumber = () => {
    if (inputValue.number) {
      if (!number.test(inputValue.number)) {
        setErrors({ ...errors, number: `Invalid number` });
      } else {
        setErrors({ ...errors, number: null });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: `This field is required.`,
      }));
    }

    if (!inputValue.number) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        number: `This field is required.`,
      }));
    }

    let isError = false;

    for (const key in errors) {
      if (errors[key] != null) isError = true;
    }

    if (!isError) {
      setIsLoading(true);
      const newUser = {
        name: inputValue.name || user.name,
        number: inputValue.number || user.number,
      };

      await request
        .put(`users/${_id}`, newUser)
        .then(({ message }) => {
          userDispatch(updateUser(newUser));
          notify.success(message);
        })
        .catch((error) => notify.error(error))
        .finally(() => {
          appDispatch(setIsModalSuccess(true));
          setIsLoading(false);
        });
    }
  };
  return (
    <div className={styles.wrapper}>
      <h1>Edit user</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={inputValue.name}
            onChange={(e) => handleChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className={`text-xs min-h-[14px] ${styles.required}`}>
            {errors && errors.name}
          </p>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Your Number
          </label>
          <input
            name="number"
            onChange={(e) => handleChange(e)}
            defaultValue={inputValue.number}
            onBlur={() => handleBlurNumber()}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className={`text-xs min-h-[14px] ${styles.required}`}>
            {errors && errors.number}
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

export default ModalEditUser;
