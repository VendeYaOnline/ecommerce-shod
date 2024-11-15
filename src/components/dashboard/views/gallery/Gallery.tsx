import { ImagePlus } from "lucide-react";
import Button from "../../components/button/Button";
import classes from "./Gallery.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

import { useMutationImages } from "@/api/mutations";
import { useQueryImages } from "@/api/queries";
import { ModalUploadImages } from "../../components/modals";

const Gallery = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { mutateAsync, isPending } = useMutationImages();
  const [openModal, setOpenModal] = useState(false);
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);
  const { data, refetch } = useQueryImages(currentPage);
  const refImages = useRef<File[]>([]);

  const handleButtonClick = useCallback(async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef.current]);

  const handleUpImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles: File[] = [];

      Array.from(event.target.files).forEach((file) => {
        // Validar extensión de archivo
        if (file.size > 2000000) {
          toast.error("La imagen supera el tamaño máximo, que son 2 MB");
        } else if (refImages.current.some((i) => i.name === file.name)) {
          toast.error(`La imagen ${file.name} ya existe.`);
        } else {
          refImages.current = [...refImages.current, file];
          newFiles.push(file);
          setOpenModal(true);
        }
      });

      // Actualizar el estado con las nuevas imágenes
      if (newFiles.length > 0) {
        const newImages = newFiles.map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...newImages]);
      }

      // Resetear el valor del input
      event.target.value = "";
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < (data?.totalPages || 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onClose = () => {
    setOpenModal(false);
    refImages.current = [];
    setImages([]);
  };

  return (
    <>
      <ModalUploadImages
        images={images}
        setImages={setImages}
        refImages={refImages}
        active={openModal}
        onClose={onClose}
        isPending={isPending}
        mutateAsync={mutateAsync}
        refetch={refetch}
      />
      <input
        type="file"
        multiple
        accept=".jpg, .jpeg, .png, .webp"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleUpImages}
      />
      <Button onClik={handleButtonClick}>
        Cargar imagenes
        <ImagePlus />
      </Button>
      <div
        className={classes["container-gallery"]}
        style={{
          justifyContent: images.length ? "flex-start" : "center",
          alignItems: images.length ? "flex-start" : "center",
        }}
      >
        <div className={classes["container-images"]}>
          {data?.images.length ? (
            data.images.map((image, index) => (
              <div key={index} className={classes["skeleton-loader"]}>
                <Image
                  className="rounded-[5px] bg-gray-300"
                  src={image.Url}
                  width={100}
                  height={100}
                  style={{
                    width: 100,
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 100,
                  }}
                  alt={`Imagen/${image.Key}`}
                  onLoad={() => {
                    const div = document.querySelector(`[key="${index}"]`);
                    if (div) {
                      div.classList.remove(classes["skeleton-loader"]);
                    }
                  }}
                />
              </div>
            ))
          ) : (
            <div className="w-full h-[450px] flex justify-center items-center">
              <div className="loader-3" />
            </div>
          )}
        </div>
      </div>
      {data && data.totalPages > 0 && (
        <nav className="flex items-center justify-center space-x-2 mt-4">
          <button
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          {Array.from({ length: data?.totalPages || 0 }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === index + 1
                  ? "text-white bg-indigo-600"
                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
            onClick={handleNextPage}
            disabled={currentPage === data.totalPages}
          >
            Siguiente
          </button>
        </nav>
      )}
    </>
  );
};

export default Gallery;
