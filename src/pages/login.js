import { useForm } from "react-hook-form";
import styles from "@/assets/styles/modal.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import request from "@/service";
import { notify } from "@/heplers/notify";
import OverLayLoading from "@/components/Common/OverlayLoading";
import { useState } from "react";
import { useRouter } from "next/router";

const scheme = new yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function Login() {
  const [isOverLayLoading, setIsOverLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheme),
  });

  const onSubmit = async (data) => {
    setIsOverLoading(true);
    await request
      .post("auth/login", data, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(({ message }) => {
        notify.success(message);
        router.push("/admin");
      })
      .catch((message) => notify.error(message))
      .finally(() => setIsOverLoading(false));
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  aria-invalid={errors.mail ? "true" : "false"}
                  name="email"
                  type="text"
                  autoComplete="email"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className={`text-xs mt-2 ${styles.required}`}>
                {errors.email?.message}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  {...register("password")}
                  name="password"
                  type="text"
                  autoComplete="current-password"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className={`text-xs mt-2  ${styles.required}`}>
                {errors.password?.message}
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
        {isOverLayLoading && <OverLayLoading />}
      </div>
    </>
  );
}
