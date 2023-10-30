const ModalRemoveCategory = ({ name }) => {
  return (
    <div>
      <p>
        Are you sure you want to delete <strong>{name}</strong> ?
      </p>
    </div>
  );
};

export default ModalRemoveCategory;
