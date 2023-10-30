//  import library
import React, { useRef, useState, useContext } from "react";
import { BiLoaderCircle } from "react-icons/bi";

//  import common
import { notify } from "@/heplers/notify";
import request from "@/service";
import { regex } from "@/utils/validation";
import { createUser, setIsModalSuccess } from "@/actions";
import { userStore } from "@/store/users";
import { appStore } from "@/store/app";

//  import component
import Button from "@/components/Common/Button";

//  import styles
import styles from "@/assets/styles/modal.module.scss";

const ModalAddUser = () => {
  const [inputValue, setInputValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [userState, userDispatch] = useContext(userStore);
  const [appState, appDispatch] = useContext(appStore);
  const formRef = useRef(null);

  const { email, number } = regex;

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

  const handleBlurEmail = () => {
    if (inputValue.email) {
      if (!email.test(inputValue.email)) {
        setErrors({ ...errors, email: `Invalid email` });
      } else {
        setErrors({ ...errors, email: null });
      }
    }
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

  const handleBlurPassword = () => {
    if (inputValue.password) {
      if (inputValue.password.length < 6) {
        setErrors({ ...errors, password: `password more than 6 characters` });
      } else {
        setErrors({ ...errors, password: null });
      }
    }
  };

  const handleBlurPasswordRepeat = () => {
    if (inputValue.password_repeat) {
      if (inputValue.password !== inputValue.password_repeat) {
        setErrors({ ...errors, password_repeat: `Passwords do not match.` });
      } else {
        setErrors({ ...errors, password_repeat: null });
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

    if (!inputValue.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: `This field is required.`,
      }));
    }

    if (!inputValue.number) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        number: `This field is required.`,
      }));
    }

    if (!inputValue.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: `This field is required.`,
      }));
    }

    if (!inputValue.password_repeat) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password_repeat: `This field is required.`,
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
        .post("users", {
          ...inputValue,
        })
        .then(({ message }) => {
          userDispatch(
            createUser({
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
      <h1>Create User</h1>
      <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Your Name
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
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Your Email
          </label>
          <input
            type="text"
            name="email"
            defaultValue={inputValue?.email}
            onChange={(e) => handleChange(e)}
            onBlur={handleBlurEmail}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className={`text-xs min-h-[14px] ${styles.required}`}>
            {errors && errors.email}
          </p>
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Your Number
          </label>
          <input
            name="number"
            onChange={(e) => handleChange(e)}
            onBlur={handleBlurNumber}
            defaultValue={inputValue?.number}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className={`text-xs min-h-[14px] ${styles.required}`}>
            {errors && errors.number}
          </p>
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Your Password
          </label>
          <input
            name="password"
            onChange={(e) => handleChange(e)}
            onBlur={handleBlurPassword}
            defaultValue={inputValue?.password}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className={`text-xs min-h-[14px] ${styles.required}`}>
            {errors && errors.password}
          </p>
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Your Confirm Password
          </label>
          <input
            type="type"
            name="password_repeat"
            onChange={(e) => handleChange(e)}
            onBlur={handleBlurPasswordRepeat}
            defaultValue={inputValue?.password_repeat}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className={`text-xs min-h-[14px] ${styles.required}`}>
            {errors && errors.password_repeat}
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

export default ModalAddUser;
