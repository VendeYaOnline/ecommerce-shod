import { PencilRuler } from "lucide-react";
import Button from "../../components/button/Button";
import { useRef, useState } from "react";
import { AttributeUpdated } from "@/interfaces";
import { TableAttribute } from "../../components/tables";
import { ModalAttribute } from "../../components/modals";

const Attributes = () => {
  const [activeModal, setActiveModal] = useState(false);
  const selectedItem = useRef<AttributeUpdated | undefined>(undefined);
  return (
    <section>
      <div className="mb-5">
        <Button onClik={() => setActiveModal(true)}>
          Crear atributo <PencilRuler size={18} />
        </Button>
      </div>
      <ModalAttribute
        active={activeModal}
        selectedItem={selectedItem}
        onClose={() => {
          setActiveModal(false), (selectedItem.current = undefined);
        }}
      />
      <TableAttribute
        selectedItem={selectedItem}
        setActiveModal={setActiveModal}
      />
    </section>
  );
};

export default Attributes;
