import { PencilRuler } from "lucide-react";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import ModalAttribute from "../../components/modal-attribute/ModalAttribute";
import { useState } from "react";

const Attributes = () => {
  const [activeModal, setActiveModal] = useState(false);
  return (
    <section>
      <div className="mb-5">
        <Button onClik={() => setActiveModal(true)}>
          Crear atributo <PencilRuler size={18} />
        </Button>
      </div>
      <ModalAttribute
        active={activeModal}
        onClose={() => setActiveModal(false)}
      />
      <Table />
    </section>
  );
};

export default Attributes;
