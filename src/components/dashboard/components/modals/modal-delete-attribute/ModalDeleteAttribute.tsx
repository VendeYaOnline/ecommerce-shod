"use client";

import classes from "./ModalDeleteAttribute.module.css";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../button/Button";
import { useQueryAttribute, useQueryProducts } from "@/api/queries";
import { useMutationDeleteAttribute } from "@/api/mutations";
import { Dispatch, SetStateAction } from "react";
import { calculatePageAfterDeletion } from "@/functions";

interface Props {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalItems: number;
  active: boolean;
  onClose: () => void;
  idElement: number;
  search: string;
}

const ModalDeleteAttribute = ({
  totalItems,
  setCurrentPage,
  active,
  onClose,
  idElement,
  search,
}: Props) => {
  const { mutateAsync, isPending } = useMutationDeleteAttribute();
  const { refetch } = useQueryAttribute(
    calculatePageAfterDeletion(totalItems - 1, 10),
    search
  );

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
      setCurrentPage(calculatePageAfterDeletion(totalItems - 1, 5));
      toast.success("Atributo eliminado");
      onClose();
    } catch (error) {
      toast.error("Error al eliminar el atributo");
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
          <h1 className="mb-2 font-bold">Eliminar atributo</h1>
          <p>¿Deseas eliminar este atributo?</p>
          <Button onClik={handleSubmit} disabled={isPending}>
            {isPending ? <div className="loader" /> : "Si, eliminar"}
          </Button>
        </div>
      </section>
    )
  );
};

export default ModalDeleteAttribute;
