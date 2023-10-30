// import labrary
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

// import styles
import Button from "@/components/Common/Button";

const ItemUser = ({ user, onShow, onRemove, onEdit }) => {
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
      >
        {user.name}
      </th>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.number}</td>
      <td className="flex">
        <span onClick={() => onShow(user)}>
          <Button type="border" icon={<AiOutlineEye />} />
        </span>

        <span onClick={() => onEdit(user)}>
          <Button type="green" icon={<AiOutlineEdit />}></Button>
        </span>
        <span onClick={() => onRemove(user)}>
          <Button type="red" icon={<AiOutlineDelete />}></Button>
        </span>
      </td>
    </tr>
  );
};

export default ItemUser;
