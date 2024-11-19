"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import classes from "./ModalImages.module.css";
import { CircleX, Images, MonitorUp } from "lucide-react";
import { useQueryImages } from "@/api/queries";
import Image from "next/image";
import Input from "../../input/Input";
import Pagination from "../../pagination/Pagination";

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
  const { data, refetch, isFetching } = useQueryImages(currentPage, search, 10);
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
    setSearch("");
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

  useEffect(() => {
    if (search === "") {
      return;
    }
    const time = setTimeout(() => {
      refetch();
    }, 500);
    return () => clearTimeout(time);
  }, [search, refetch]);

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
              setSearch("");
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

              {!isFetching && data?.images.length === 0 && (
                <div className="w-full h-[150px] flex justify-center items-center flex-col gap-5">
                  <h2 className="text-lg">No hay imagenes</h2>
                  <Images size={50} />
                </div>
              )}

              {data && data.images.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={data.totalPages}
                />
              )}
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
