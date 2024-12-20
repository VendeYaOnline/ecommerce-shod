import { PencilRuler } from "lucide-react";
import Button from "../../components/button/Button";
import { useRef, useState } from "react";
import { AttributeUpdated } from "@/interfaces";
import { TableAttribute } from "../../components/tables";
import { ModalAttribute } from "../../components/modals";
import { useQueryAttribute } from "@/api/queries";

const Attributes = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data } = useQueryAttribute(currentPage, search);
  const selectedItem = useRef<AttributeUpdated | undefined>(undefined);
  return (
    <section>
      <div className="mb-5">
        <Button
          onClik={() => setActiveModal(true)}
          disabled={data && data?.grandTotal >= 30}
        >
          {data && data?.grandTotal >= 30
            ? "Límite alcanzado"
            : "Crear atributo"}{" "}
          <PencilRuler size={18} />
        </Button>
      </div>
      <ModalAttribute
        currentPage={currentPage}
        active={activeModal}
        selectedItem={selectedItem}
        search={search}
        onClose={() => {
          setActiveModal(false), (selectedItem.current = undefined);
        }}
      />
      <TableAttribute
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedItem={selectedItem}
        setActiveModal={setActiveModal}
        search={search}
        setSearch={setSearch}
      />
    </section>
  );
};

export default Attributes;
