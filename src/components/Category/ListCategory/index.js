//  import styles
import styles from "@/app/globals.css";

// import component
import NoDate from "@/components/Common/NoData";
import ItemCategory from "../ItemCategory";

const ListCategories = ({ categories, onShow, onRemove, onEdit }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-black">
        <thead className="text-xs text-gray-700 uppercase dark:bg-gray-300 dark:text-gray-900">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Slug
            </th>

            <th width={200} scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((item, index) => (
              <ItemCategory
                onShow={onShow}
                key={index}
                category={item}
                onEdit={onEdit}
                onRemove={onRemove}
              ></ItemCategory>
            ))
          ) : (
            <NoDate />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategories;
