"use client";

import classes from "./ModalDeleteAttribute.module.css";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../button/Button";
import { useQueryAttribute } from "@/api/queries";
import { useMutationDeleteAttribute } from "@/api/mutations";

interface Props {
  active: boolean;
  onClose: () => void;
  idElement: number;
}

const ModalDeleteAttribute = ({ active, onClose, idElement }: Props) => {
  const { mutateAsync, isPending } = useMutationDeleteAttribute();
  const { refetch } = useQueryAttribute(1);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSubmit = async () => {
    try {
      await mutateAsync(idElement);
      refetch();
      toast.success("Elemento eliminado");
      onClose();
    } catch (error) {
      toast.error("Usuario no encontrado");
    }
  };

  return (
    active && (
      <section
        className={classes["container-modal"]}
        onClick={handleContainerClick}
      >
        <div className={classes["form-modal"]} onClick={handleFormClick}>
          <CircleX
            className="absolute right-5 cursor-pointer"
            onClick={() => {
              onClose();
            }}
          />
          <h1 className="mb-2 font-bold">Eliminar elemento</h1>
          <p>¿Deseas eliminar este elemento?</p>
          <Button onClik={handleSubmit} disabled={isPending}>
            {isPending ? <div className="loader" /> : "Si, eliminar"}
          </Button>
        </div>
      </section>
    )
  );
};

export default ModalDeleteAttribute;
