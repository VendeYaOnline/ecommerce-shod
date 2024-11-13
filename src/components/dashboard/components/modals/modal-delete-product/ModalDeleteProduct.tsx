"use client";

import classes from "./ModalDeleteProduct.module.css";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../button/Button";
import { useQueryProducts } from "@/api/queries";
import { useMutationDeleteProduct } from "@/api/mutations";
import { calculatePageAfterDeletion } from "@/functions";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalItems: number;
  active: boolean;
  onClose: () => void;
  idElement: number;
}

const ModalDeleteProduct = ({
  setCurrentPage,
  totalItems,
  active,
  onClose,
  idElement,
}: Props) => {
  const { mutateAsync, isPending } = useMutationDeleteProduct();
  const { refetch } = useQueryProducts(
    calculatePageAfterDeletion(totalItems - 1, 5)
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
      toast.success("Producto eliminado");
      onClose();
    } catch (error) {
      toast.error("Error al eliminar el producto");
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
          <h1 className="mb-2 font-bold">Eliminar producto</h1>
          <p>¿Deseas eliminar este producto?</p>
          <Button onClik={handleSubmit} disabled={isPending}>
            {isPending ? <div className="loader" /> : "Si, eliminar"}
          </Button>
        </div>
      </section>
    )
  );
};

export default ModalDeleteProduct;
