"use client";

import classes from "./ModalDeleteImage.module.css";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../button/Button";
import { useQueryImages } from "@/api/queries";
import { useMutationDeleteImage } from "@/api/mutations";
import { Dispatch, SetStateAction } from "react";
import { calculatePageAfterDeletion } from "@/functions";

interface Props {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalItems: number;
  active: boolean;
  onClose: () => void;
  idElement: string;
  search: string;
}

const ModalDeleteImage = ({
  totalItems,
  setCurrentPage,
  active,
  onClose,
  idElement,
  search,
}: Props) => {
  const { mutateAsync, isPending } = useMutationDeleteImage();
  const { refetch } = useQueryImages(
    calculatePageAfterDeletion(totalItems - 1, 40),
    search,
    40
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
      setCurrentPage(calculatePageAfterDeletion(totalItems - 1, 40));
      toast.success("Imagen eliminada");
      onClose();
    } catch (error) {
      toast.error("Error al eliminar la imagen");
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
          <h1 className="mb-2 font-bold">Eliminar imagen</h1>
          <p>¿Deseas eliminar la imagen?</p>
          <Button onClik={handleSubmit} disabled={isPending}>
            {isPending ? <div className="loader" /> : "Si, eliminar"}
          </Button>
        </div>
      </section>
    )
  );
};

export default ModalDeleteImage;
