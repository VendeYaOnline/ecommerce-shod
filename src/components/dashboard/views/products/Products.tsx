import { Button } from "@/components";
import { useState } from "react";
import ModalForm from "../../modal-form/ModalForm";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const onClose = () => {
    setOpenModal(false);
  };
  return (
    <section>
      <Button onClik={() => setOpenModal(true)}>asdasd</Button>
      <ModalForm active={openModal} onClose={onClose} />
    </section>
  );
};

export default Products;
