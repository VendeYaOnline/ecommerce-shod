import { Button } from "@/components";
import { useRef, useState } from "react";
import { ModalProduct } from "../../components/modals";
import TableProducts from "../../components/tables/table-products/TableProducts";
import { ProductsResponse } from "@/interfaces";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const selectedItem = useRef<ProductsResponse | undefined>(undefined);
  const onClose = () => {
    setOpenModal(false);
  };
  return (
    <section>
      <div className="mb-5">
        <Button onClik={() => setOpenModal(true)}>Crear producto</Button>
      </div>
      <TableProducts
        selectedItem={selectedItem}
        setActiveModal={setActiveModal}
      />
      <ModalProduct active={openModal} onClose={onClose} />
    </section>
  );
};

export default Products;
