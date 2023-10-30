import React from "react";
import styles from "@/assets/styles/button.module.scss";

const Button = ({ children, icon, type = "default", disabled = false }) => {
  const className = `${styles[type]} + inline-flex justify-center items-center`;

  return (
    <button disabled={disabled} className={className}>
      {icon && icon}
      {children && children}
    </button>
  );
};

export default Button;
