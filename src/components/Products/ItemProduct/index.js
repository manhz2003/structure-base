// import labrary
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

// import styles
import Button from "@/components/Common/Button";

const ItemProduct = ({ product, onShow, onRemove, onEdit }) => {
  const { _id } = product;
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
      >
        {product.title}
      </th>
      <td className="px-6 py-4">{product.price}</td>
      <td className="px-6 py-4">{product.description}</td>
      <td className="px-6 py-4">{product.category.name}</td>
      <td className="flex">
        <span onClick={() => onShow(product)}>
          <Button type="border" icon={<AiOutlineEye />} />
        </span>

        <span onClick={() => onEdit(product)}>
          <Button type="green" icon={<AiOutlineEdit />}></Button>
        </span>
        <span onClick={() => onRemove(product)}>
          <Button type="red" icon={<AiOutlineDelete />}></Button>
        </span>
      </td>
    </tr>
  );
};

export default ItemProduct;
