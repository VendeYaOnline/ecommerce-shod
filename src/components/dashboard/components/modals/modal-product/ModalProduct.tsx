"use client";

import Button from "../../button/Button";
import classes from "./ModalProduct.module.css";
import { CircleX, ImageUp } from "lucide-react";
import Input from "../../input/Input";
import Select from "../../select/Select";
import Textarea from "../../textarea/Textarea";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMutationProduct } from "@/api/mutations";
import IconDelete from "/public/icon-delete.png";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useQueryAttribute, useQueryProducts } from "@/api/queries";
import SelectAttribute from "../../select-attribute/SelectAttribute";
import { AttributeValues, TpeValue, ValuesAttributes } from "@/interfaces";
import { convertPrice } from "@/functions";

interface Props {
  active: boolean;
  onClose: () => void;
}

const ModalProduct = ({ active, onClose }: Props) => {
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const imagesProducts = useRef<File[]>([]);
  const { refetch } = useQueryProducts(1);
  const selectedType = useRef("");
  const [value, setValue] = useState({ valueString: "", valueObject: "" });
  const [valuesForm, setValuesForm] = useState({
    title: "",
    price: "",
    discount: "0",
    description: "",
  });
  const [valuesAttributes, setValuesAttributes] = useState<ValuesAttributes>({
    Color: [],
    Dimensión: [],
    Peso: [],
    Talla: [],
    Mililitro: [],
  });
  const [attributeValue, setAttributeValue] = useState<AttributeValues>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const { mutateAsync, isPending } = useMutationProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useQueryAttribute(currentPage);

  useEffect(() => {
    if (data && data?.attributes?.length) {
      const values = data.attributes
        ?.filter((i) => i.attribute_name === selectedAttribute)
        .map((e) => e.value);
      setAttributeValue(values[0]);
      const type = data.attributes.filter(
        (i) => i.attribute_name === selectedAttribute
      )[0]?.attribute_type;
      selectedType.current = type;
    }
  }, [selectedAttribute, data?.attributes]);

  const validAttribute = () => {
    if (selectedAttribute !== "") {
      if (
        valuesAttributes.Color.length ||
        valuesAttributes.Dimensión.length ||
        valuesAttributes.Mililitro.length ||
        valuesAttributes.Peso.length ||
        valuesAttributes.Talla.length
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const isValid = () => {
    if (
      validAttribute() &&
      selectedFile &&
      valuesForm.title &&
      valuesForm.price &&
      valuesForm.discount &&
      valuesForm.description
    ) {
      return false;
    } else {
      return true;
    }
  };

  const cleanField = useCallback(() => {
    setValuesForm({ title: "", price: "", discount: "0", description: "" });
    setValuesAttributes({
      Color: [],
      Dimensión: [],
      Peso: [],
      Talla: [],
      Mililitro: [],
    });
    setSelectedAttribute("");
    imagesProducts.current = [];
    setAttributeValue([]);
    setSelectedFile(null);
    setImagePreview(null);
    setProductImages([]);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid()) {
      const formData = new FormData();
      formData.append("file", selectedFile!);
      imagesProducts.current.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("attributes", JSON.stringify(valuesAttributes));
      // Agrega el resto de los valores del formulario
      Object.entries(valuesForm).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await mutateAsync(formData);
      toast.success("Producto creado");
      refetch();
      cleanField();
      onClose();
    }
  };

  const deleteImage = useCallback(() => {
    setSelectedFile(null);
    setImagePreview(null);
  }, []);

  const listAttributes = useMemo(() => {
    if (data?.attributes?.length) {
      return data.attributes.map((attribute) => ({
        id: attribute.id,
        name: attribute.attribute_name,
        type: attribute.attribute_type,
      }));
    } else {
      return [];
    }
  }, [data?.attributes]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        // Validar extensión de archivo
        const allowedExtensions = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedExtensions.includes(file.type)) {
          toast.error(
            "Solo se pueden subir imágenes en formato PNG, JPG o WEBP"
          );
          return;
        } else {
          setSelectedFile(file);
          const imageUrl = URL.createObjectURL(file);
          setImagePreview(imageUrl);
        }
      }
    },
    []
  );

  const handleUpImages = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        // Validar extensión de archivo
        const allowedExtensions = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedExtensions.includes(file.type)) {
          toast.error(
            "Solo se pueden subir imágenes en formato PNG, JPG o WEBP"
          );
          return;
        } else {
          imagesProducts.current = [...imagesProducts.current, file];
          const imageUrl = URL.createObjectURL(file);
          setProductImages((prev) => [...prev, imageUrl]);
          event.target.value = "";
        }
      }
    },
    [productImages]
  );

  const deleteImageProduct = useCallback((image: string) => {
    const images = productImages.filter((i) => i !== image);
    setProductImages(images);
  }, []);

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
                cleanField();
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
                    value={undefined}
                    className={classes["container-image"]}
                    onChange={handleFileChange}
                  />
                </div>
              )}

              <section className="flex flex-col gap-3 ml-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="title">Titulo</label>
                  <Input
                    type="string"
                    value={valuesForm.title}
                    onChange={(e) => {
                      if (e.target.value.length < 30) {
                        setValuesForm({ ...valuesForm, title: e.target.value });
                      }
                    }}
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="title">Precio</label>
                    <Input
                      type="string"
                      value={valuesForm.price}
                      placeholder="$"
                      onChange={(e) =>
                        setValuesForm({
                          ...valuesForm,
                          price: convertPrice(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="title">Descuento</label>
                    <Input
                      type="string"
                      value={valuesForm.discount}
                      placeholder="0"
                      onChange={(e) => {
                        const value = Math.max(
                          0,
                          Math.min(100, Number(e.target.value) || 0)
                        );
                        setValuesForm({
                          ...valuesForm,
                          discount: value + "",
                        });
                      }}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
          {data && data.totalPages > 1 && (
            <nav className="flex items-center space-x-2">
              {Array.from({ length: data?.totalPages || 0 }, (_, index) => (
                <button
                  key={index}
                  className={`w-5 h-5 rounded-md text-xs font-medium ${
                    currentPage === index + 1
                      ? "text-white bg-indigo-600"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          )}

          <div className="mt-1 flex flex-col gap-1">
            <label>Atributo</label>
            <Select
              data={listAttributes}
              value={selectedAttribute}
              setValue={(value) => {
                setSelectedAttribute(value),
                  setValue({ valueObject: "", valueString: "" });
              }}
              placeholder="Selecciona un atributo"
            />
          </div>

          {selectedAttribute && attributeValue?.length && (
            <div className="mt-1 flex flex-col gap-1">
              <label>Valores</label>
              <SelectAttribute
                value={value}
                setValue={setValue}
                selectedType={selectedType.current as TpeValue}
                attributeValue={attributeValue}
                valuesAttributes={valuesAttributes}
                setValuesAttributes={setValuesAttributes}
                placeholder="Selecciona un valor"
              />
            </div>
          )}

          <div className="mt-1 flex flex-col gap-1">
            <label>Descripcion</label>
            <Textarea
              value={valuesForm.description}
              onChange={(e) =>
                setValuesForm({ ...valuesForm, description: e.target.value })
              }
            />
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
          <Button disabled={isValid() || isPending}>
            {isPending ? <div className="loader" /> : "Guardar producto"}{" "}
          </Button>
        </form>
      </section>
    )
  );
};

export default ModalProduct;
