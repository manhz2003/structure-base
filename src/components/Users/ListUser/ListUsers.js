//  import styles
import styles from "@/app/globals.css";

// import component
import ItemUser from "../ItemUser";
import NoDate from "@/components/Common/NoData";

const ListUsers = ({ users, onShow, onRemove, onEdit }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-black">
        <thead className="text-xs text-gray-700 uppercase dark:bg-gray-300 dark:text-gray-900">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Number
            </th>

            <th width={200} scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((item, index) => (
              <ItemUser
                onShow={onShow}
                key={index}
                user={item}
                onEdit={onEdit}
                onRemove={onRemove}
              ></ItemUser>
            ))
          ) : (
            <NoDate />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsers;
