//  import styles
import styles from "@/app/globals.css";

// import component
import NoDate from "@/components/Common/NoData";
import ItemProduct from "../ItemProduct";

const ListProduct = ({ products, onShow, onRemove, onEdit }) => {
  return (
    <div className="relative overflow-x-auto ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-black">
        <thead className="text-xs text-gray-700 uppercase dark:bg-gray-300 dark:text-gray-900">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>

            <th width={200} scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((item, index) => (
              <ItemProduct
                onShow={onShow}
                key={index}
                product={item}
                onEdit={onEdit}
                onRemove={onRemove}
              ></ItemProduct>
            ))
          ) : (
            <NoDate />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;
