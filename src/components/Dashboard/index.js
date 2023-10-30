// import styles
import styles from "@/assets/styles/dashboard.module.scss";

// import library
import { AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

const Dashboard = ({ products, categories, users }) => {
  return (
    <div className={styles.wrapper}>
      <div className="flex justify-between ">
        <div className={`${styles.statistical} bg-sky-500`}>
          <p>{users.length}</p>
          <h6>Total User</h6>
          <span>
            <AiOutlineUser />
          </span>
        </div>
        <div className={`${styles.statistical} bg-emerald-600`}>
          <p>{categories.length}</p>
          <h6>Total Category</h6>
          <span>
            <BiCategory />
          </span>
        </div>
        <div className={`${styles.statistical} bg-rose-600`}>
          <p>{products.length}</p>
          <h6>Total Product</h6>
          <span>
            <AiOutlineInbox />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
