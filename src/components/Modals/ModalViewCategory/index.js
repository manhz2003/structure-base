//  import styles
import styles from "@/assets/styles/modal.module.scss";

const ModalViewCategory = ({ category = {} }) => {
  return (
    <div className={styles.wrapper}>
      <h1>Detail</h1>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>
              <span>{category.name}</span>
            </td>
          </tr>
          <tr>
            <td>Slug:</td>
            <td>
              <span>{category.slug}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ModalViewCategory;
