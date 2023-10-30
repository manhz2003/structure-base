// import labrary
import React, { useContext } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

//  import common
import request from "@/service";
import { notify } from "@/heplers/notify";

// import component

// import styles
import Button from "@/components/Common/Button";
import { categoryStore } from "@/store/categories";
import { deleteCategory } from "@/actions/categoryAction";

const ItemCategory = ({ category, onShow, onRemove, onEdit }) => {
  const [categoryState, categoryDispatch] = useContext(categoryStore);

  const { _id } = category;
  const handleRemove = async () => {
    await request
      .delete(`categories/${_id}`)
      .then(({ message }) => {
        categoryDispatch(deleteCategory(_id));
        notify.success(message);
      })
      .catch((error) => notify.error(error));
  };

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
      >
        {category.name}
      </th>
      <td className="px-6 py-4">{category.slug}</td>
      <td className="flex">
        <span onClick={() => onShow(category)}>
          <Button type="border" icon={<AiOutlineEye />} />
        </span>

        <span onClick={() => onEdit(category)}>
          <Button type="green" icon={<AiOutlineEdit />}></Button>
        </span>
        <span onClick={() => onRemove(category)}>
          <Button type="red" icon={<AiOutlineDelete />}></Button>
        </span>
      </td>
    </tr>
  );
};

export default ItemCategory;
