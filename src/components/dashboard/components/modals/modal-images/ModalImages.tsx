"use client";

import { Dispatch, SetStateAction } from "react";
import classes from "./ModalImages.module.css";
import { CircleX, Images, MonitorUp } from "lucide-react";
import { useMutationImages } from "@/api/mutations";
import { useQueryImages } from "@/api/queries";
import Image from "next/image";

interface ValueImage {
  url: string;
  name: string;
}

interface Props {
  active: boolean;
  optionImage: number;
  setOptionImage: Dispatch<SetStateAction<number>>;
  onClose: () => void;
}

const ModalImages = ({
  active,
  onClose,
  optionImage,
  setOptionImage,
}: Props) => {
  const { data } = useQueryImages(1);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
    setOptionImage(0);
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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
          <h1 className="mb-2 font-bold text-xl m-auto">
            Seleciona una opcion
          </h1>

          {optionImage === 2 ? (
            <div className={classes["container-images"]}>
              {data?.images.length ? (
                data.images.map((image, index) => (
                  <div key={index} className={classes["skeleton-loader"]}>
                    <Image
                      className="rounded-[5px] bg-gray-300 cursor-pointer"
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
