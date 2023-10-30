//  import labrary
import React, { productef, useState } from "react";

//  import styles
import styles from "@/assets/styles/modal.module.scss";
import { getRule } from "@/heplers";

const ModalViewProduct = ({ product = {} }) => {
  return (
    <div className={styles.wrapper}>
      <h1>Detail</h1>
      <table>
        <tbody>
          <tr>
            <td>Title:</td>
            <td>
              <span>{product.title}</span>
            </td>
          </tr>
          <tr>
            <td>Price:</td>
            <td>
              <span>{product.price}</span>
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <span>{product.description}</span>
            </td>
          </tr>
          <tr>
            <td>Catecory</td>
            <td>
              <span>{product.category.name}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ModalViewProduct;
