const ModalRemoveProduct = ({ title }) => {
  return (
    <div>
      <p>
        Are you sure you want to delete <strong>{title}</strong> ?
      </p>
    </div>
  );
};

export default ModalRemoveProduct;
