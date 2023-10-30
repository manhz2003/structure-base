import { TOAST_DURATION_TIME } from "@/utils";
import { toast } from "react-toastify";

const options = {
  autoClose: TOAST_DURATION_TIME,
  hideProgressBar: false,
  position: toast.POSITION.TOP_RIGHT,
  pauseOnHover: true,
};

export const notify = {
  success: (content) => {
    toast.success(content, options);
  },

  info: (content) => {
    toast.info(content, options);
  },

  warning: (content) => {
    toast.warning(content, options);
  },

  error: (content) => {
    toast.error(content, options);
  },
};
