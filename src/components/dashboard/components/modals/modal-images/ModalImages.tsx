"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import classes from "./ModalImages.module.css";
import { CircleX, Images, MonitorUp } from "lucide-react";
import { useQueryImages } from "@/api/queries";
import Image from "next/image";
import Input from "../../input/Input";
import Button from "../../button/Button";

interface ValueImage {
  url: string;
  name: string;
}

interface Props {
  active: boolean;
  optionImage: number;
  setOptionImage: Dispatch<SetStateAction<number>>;
  onClose: () => void;
  setImagePreview: (value: SetStateAction<string | null>) => void;
}

const ModalImages = ({
  active,
  onClose,
  optionImage,
  setOptionImage,
  setImagePreview,
}: Props) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isPending, isFetching } = useQueryImages(
    currentPage,
    search
  );
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
    setOptionImage(0);
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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

  const selectedImageGalery = (imageUrl: string) => {
    onClose();
    setOptionImage(0);
    setImagePreview(imageUrl);
  };

  return (
    active && (
      <section
        className={classes["container-modal"]}
        onClick={handleContainerClick}
      >
        <div
          className={
            optionImage === 0
              ? classes["form-modal-1"]
              : classes["form-modal-2"]
          }
          onClick={handleFormClick}
        >
          <CircleX
            className="absolute right-5 cursor-pointer"
            onClick={() => {
              onClose();
              setOptionImage(0);
            }}
          />

          {optionImage === 0 && (
            <h1 className="text-xl m-auto">Elige una opción</h1>
          )}
          {optionImage === 2 && (
            <div className="flex gap-3 mt-8 mb-3">
              <Input
                placeholder="Buscar imagen"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                disabled={isPending || isFetching}
                onClik={() => {
                  refetch(), setCurrentPage(1);
                }}
              >
                Buscar
              </Button>
            </div>
          )}

          {optionImage === 2 ? (
            <div className={classes["container-images"]}>
              {isFetching && (
                <div className="w-full h-[100px] flex justify-center items-center">
                  <div className="loader-3" />
                </div>
              )}

              {!isFetching &&
                data &&
                data?.images.length > 0 &&
                data.images.map((image, index) => (
                  <div key={index} className={classes["skeleton-loader"]}>
                    <Image
                      className="rounded-[5px] bg-gray-300 cursor-pointer hover:opacity-[0.6]"
                      src={image.Url}
                      width={100}
                      height={100}
                      onClick={() => selectedImageGalery(image.Url)}
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

              {(!isFetching || !isFetching) && data?.images.length === 0 && (
                <div className="w-full h-[150px] flex justify-center items-center flex-col gap-5">
                  <h2 className="text-lg">No hay imagenes</h2>
                  <Images size={50} />
                </div>
              )}

              <div className="w-full">
                {data && !isFetching && !isPending && data.totalPages > 0 && (
                  <nav className="flex items-center justify-center space-x-2 mt-4">
                    <button
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </button>

                    {Array.from(
                      { length: data?.totalPages || 0 },
                      (_, index) => (
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
                      )
                    )}

                    <button
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
                      onClick={handleNextPage}
                      disabled={currentPage === data.totalPages}
                    >
                      Siguiente
                    </button>
                  </nav>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center gap-5">
              <div
                className={classes["card-option"]}
                onClick={() => {
                  setOptionImage(1), onClose();
                }}
              >
                Computadora
                <MonitorUp size={40} />
              </div>
              <div
                className={classes["card-option"]}
                onClick={() => {
                  setOptionImage(2);
                }}
              >
                Galeria
                <Images size={40} />
              </div>
            </div>
          )}
        </div>
      </section>
    )
  );
};

export default ModalImages;
