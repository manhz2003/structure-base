//  import labrary
import React, { useRef, useState } from "react";

//  import styles
import styles from "@/assets/styles/modal.module.scss";
import { getRule } from "@/heplers";

const ModalViewUser = ({ user = {} }) => {
  return (
    <div className={styles.wrapper}>
      <h1>Detail</h1>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>
              <span>{user.name}</span>
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              <span>{user.email}</span>
            </td>
          </tr>
          <tr>
            <td>Number</td>
            <td>
              <span>{user.number}</span>
            </td>
          </tr>
          <tr>
            <td>Role</td>
            <td>
              <span>{getRule(user.role)}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ModalViewUser;
