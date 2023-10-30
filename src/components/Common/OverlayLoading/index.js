import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "@/assets/styles/overLay.module.scss";

const OverLayLoading = () => {
  return (
    <div className={styles.wrapper}>
      <div className="flex items-center justify-center h-full">
        <AiOutlineLoading3Quarters className={styles.icon_loading} />
      </div>
    </div>
  );
};

export default OverLayLoading;
