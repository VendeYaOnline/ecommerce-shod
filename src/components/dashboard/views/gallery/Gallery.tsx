import { ImagePlus, Images } from "lucide-react";
import Button from "../../components/button/Button";
import classes from "./Gallery.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

import { useMutationImages } from "@/api/mutations";
import { useQueryImages } from "@/api/queries";
import { ModalUploadImages } from "../../components/modals";
import Pagination from "../../components/pagination/Pagination";
import Input from "../../components/input/Input";

const Gallery = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { mutateAsync, isPending } = useMutationImages();
  const [openModal, setOpenModal] = useState(false);
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);
  const [search, setSearch] = useState("");
  const firstLoad = useRef(false);
  const {
    data,
    refetch,
    isFetching,
    isPending: isPending2,
  } = useQueryImages(currentPage, search, 40);
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

  useEffect(() => {
    // Solo ejecuta refetch si no es la primera carga
    if (firstLoad.current) {
      const timeout = setTimeout(() => {
        refetch();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [search, refetch, firstLoad.current]);

  const handleChange = (value: string) => {
    setSearch(value);
    firstLoad.current = true;
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
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <input
            type="file"
            multiple
            accept=".jpg, .jpeg, .png, .webp"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleUpImages}
          />
          <Button onClik={handleButtonClick} disabled={data?.total === 600}>
            Cargar imagenes
            <ImagePlus />
          </Button>
        </div>

        <div className="flex">
          <Input
            placeholder="Buscar imagen"
            value={search}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>

      <div
        className={classes["container-gallery"]}
        style={{
          justifyContent: images.length ? "flex-start" : "center",
          alignItems: images.length ? "flex-start" : "center",
        }}
      >
        {isFetching && (
          <div className="w-full h-full flex justify-center items-center box-border">
            <div className="loader-3" />
          </div>
        )}
        {(!isFetching || !isPending2) && data?.images.length === 0 && (
          <div className="w-full h-full flex justify-center items-center flex-col gap-5">
            <h2 className="text-lg">No hay imagenes</h2>
            <Images size={50} />
          </div>
        )}

        <div className={classes["container-images"]}>
          {data &&
            !isFetching &&
            data?.images.length > 0 &&
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
            ))}
        </div>
      </div>
      {data && data.images.length > 0 && (
        <Pagination
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          setCurrentPage={setCurrentPage}
          totalPages={data.totalPages}
        />
      )}
    </>
  );
};

export default Gallery;
