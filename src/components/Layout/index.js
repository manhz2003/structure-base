import React, { useEffect, useState } from "react";
import styles from "@/assets/styles/layout.module.scss";
import Link from "next/link";
import { AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";

const LayoutAdmin = ({ children }) => {
  const [pathname, setPatchname] = useState("");
  useEffect(() => {
    setPatchname(window.location.pathname);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <div>
          <p className={styles.logo}>
            <RiAdminLine className={styles.logo_icon} />
            Admin
          </p>
        </div>
        <ul>
          <li>
            <Link
              className={pathname == "/admin/product" ? styles.active : ""}
              href={"/admin/product"}
            >
              <span>
                <AiOutlineInbox />
              </span>
              Products
            </Link>
          </li>
          <li>
            <Link
              className={pathname == "/admin/category" ? styles.active : ""}
              href={"/admin/category"}
            >
              <span>
                <BiCategory />
              </span>
              Categories
            </Link>
          </li>
          <li>
            <Link
              className={pathname == "/admin/user" ? styles.active : ""}
              href={"/admin/user"}
            >
              <span>
                <AiOutlineUser />{" "}
              </span>
              Users
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.content}>
        <div className={styles.content_top}>
          <h2>
            {pathname == "/admin/user" && "Users management"}
            {pathname == "/admin/category" && "Category management"}
            {pathname == "/admin/product" && "Products management"}
            {pathname == "/admin" && "Dashboard"}
          </h2>
          <span>
            Xin chào : <strong>Anh quân</strong>
          </span>
        </div>

        {children}
      </div>
    </div>
  );
};

export default LayoutAdmin;
