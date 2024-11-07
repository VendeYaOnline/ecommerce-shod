"use client";

import { list } from "@/functions";
import Button from "../../button/Button";
import classes from "./ModalProduct.module.css";
import { CircleX, ImageUp } from "lucide-react";
import Input from "../../input/Input";
import Select from "../../select/Select";
import Textarea from "../../textarea/Textarea";
import { FormEvent, useMemo, useState } from "react";
import { useMutationProduct } from "@/api/mutations";
import IconDelete from "/public/icon-delete.png";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useQueryAttribute } from "@/api/queries";

interface Props {
  active: boolean;
  onClose: () => void;
}

const ModalProduct = ({ active, onClose }: Props) => {
  const [value, setValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const { mutateAsync } = useMutationProduct();
  const { data: attributes } = useQueryAttribute();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      await mutateAsync(formData);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Validar extensión de archivo
      const allowedExtensions = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedExtensions.includes(file.type)) {
        toast.error("Solo se pueden subir imágenes en formato PNG, JPG o WEBP");
        return;
      } else {
        setSelectedFile(file);

        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
        toast.success("Imagen cargada correctamente");
      }
    }
  };

  const deleteImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const listAttributes = useMemo(() => {
    if (attributes?.length) {
      return attributes.map((attribute) => ({
        id: attribute.id,
        name: attribute.attribute_name,
      }));
    } else {
      return [];
    }
  }, [attributes]);

  const handleUpImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedExtensions = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedExtensions.includes(file.type)) {
        toast.error("Solo se pueden subir imágenes en formato PNG, JPG o WEBP");
      } else {
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        if (productImages.includes(imageUrl)) {
          return;
        } else {
          setProductImages((prev) => [...prev, imageUrl]);
        }
      }
    }
  };

  const deleteImageProduct = (image: string) => {
    const images = productImages.filter((i) => i !== image);
    setProductImages(images);
  };

  return (
    active && (
      <section className={classes["container-modal"]}>
        <form
          className={classes["form-modal"]}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <CircleX
              className="absolute right-5 cursor-pointer"
              onClick={() => {
                onClose();
                setSelectedFile(null);
                setImagePreview(null);
                setProductImages([]);
              }}
            />
            <h1 className="mb-2 font-bold text-xl">Crear un producto</h1>
          </div>

          <div className="relative mt-1">
            <div className="flex gap-2">
              {imagePreview ? (
                <div>
                  <Image
                    src={imagePreview}
                    alt="Imagen subida"
                    className="rounded-[5px]"
                    width={200}
                    height={200}
                  />
                  <button
                    className={classes["button-delete-img"]}
                    onClick={deleteImage}
                  >
                    Eliminar imagen
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <div className={classes.capa}>
                    <ImageUp size={60} strokeWidth={1} />
                  </div>
                  <input
                    type="file"
                    className={classes["container-image"]}
                    onChange={handleFileChange}
                  />
                </div>
              )}

              <section className="flex flex-col gap-3 ml-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="title">Titulo</label>
                  <Input type="string" />
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="title">Precio</label>
                    <Input type="number" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="title">Descuento</label>
                    <Input type="number" />
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-1 flex flex-col gap-1">
            <label>Atributo</label>
            <Select
              data={listAttributes}
              value={value}
              setValue={setValue}
              placeholder="Selecciona atributo"
            />
          </div>

          <div className="mt-1 flex flex-col gap-1">
            <label>Descripcion</label>
            <Textarea />
          </div>

          <h2>{`Imagenes del producto ${productImages.length}/5`}</h2>
          <section className="flex flex-wrap gap-3">
            {productImages.map((image, index) => (
              <div className="relative" key={index}>
                <div style={{ width: 80, height: 80 }}>
                  <img
                    src={image}
                    alt="Imagen del producto"
                    className="rounded-[5px]"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>

                <Image
                  src={IconDelete}
                  width={20}
                  height={20}
                  onClick={() => deleteImageProduct(image)}
                  alt="icono de eliminar imagen"
                  className={classes["icon-delete-image"]}
                />
              </div>
            ))}

            {productImages.length < 5 && (
              <div className="relative">
                <div className={classes["capa-2"]}>
                  <ImageUp size={30} strokeWidth={1} />
                </div>
                <input
                  type="file"
                  className={classes["container-image-products"]}
                  onChange={handleUpImages}
                />
              </div>
            )}
          </section>
          <br />
          <Button>Guardar producto</Button>
        </form>
      </section>
    )
  );
};

export default ModalProduct;
