import { Button } from "@/components";
import { useRef, useState } from "react";
import { ModalProduct } from "../../components/modals";
import TableProducts from "../../components/tables/table-products/TableProducts";
import { ProductTable } from "@/interfaces";
import { Package } from "lucide-react";

const Products = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const selectedItem = useRef<ProductTable | undefined>(undefined);

  return (
    <section>
      <div className="mb-5">
        <Button onClik={() => setActiveModal(true)}>
          Crear producto <Package size={18} />
        </Button>
      </div>

      <ModalProduct
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        active={activeModal}
        selectedItem={selectedItem}
        search={search}
        onClose={() => {
          setActiveModal(false), (selectedItem.current = undefined);
        }}
      />
      <TableProducts
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedItem={selectedItem}
        setActiveModal={setActiveModal}
        setSearch={setSearch}
        search={search}
      />
    </section>
  );
};

export default Products;
