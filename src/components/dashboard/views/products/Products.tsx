import { Button } from "@/components";
import { useState } from "react";
import { ModalProduct } from "../../components/modals";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const onClose = () => {
    setOpenModal(false);
  };
  return (
    <section>
      <Button onClik={() => setOpenModal(true)}>Crear producto</Button>
      <ModalProduct active={openModal} onClose={onClose} />
    </section>
  );
};

export default Products;
