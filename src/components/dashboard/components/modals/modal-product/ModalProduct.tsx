"use client";

import Button from "../../button/Button";
import classes from "./ModalProduct.module.css";
import { CircleX, ImageUp } from "lucide-react";
import Input from "../../input/Input";
import Select from "../../select/Select";
import Textarea from "../../textarea/Textarea";
import {
  Dispatch,
  FormEvent,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMutationProduct, useMutationUpdatedProduct } from "@/api/mutations";
import IconDelete from "/public/icon-delete.png";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useQueryAttribute, useQueryProducts } from "@/api/queries";
import SelectAttribute from "../../select-attribute/SelectAttribute";
import {
  AttributeValues,
  ProductTable,
  TpeValue,
  ValuesAttributes,
} from "@/interfaces";
import { convertPrice } from "@/functions";

interface Props {
  currentPage: number;
  selectedItem: MutableRefObject<ProductTable | undefined>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  active: boolean;
  onClose: () => void;
}

const ModalProduct = ({
  currentPage,
  selectedItem,
  setCurrentPage,
  active,
  onClose,
}: Props) => {
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const imagesProducts = useRef<File[]>([]);
  const { refetch } = useQueryProducts(currentPage);
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
  const nameImagesProducts = useRef<string[]>([]);
  const { mutateAsync: mutateAsyncUpdated, isPending: isPendingUpdated } =
    useMutationUpdatedProduct();
  const { data } = useQueryAttribute(currentPage);
  const { data: products } = useQueryProducts(currentPage);

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

  useEffect(() => {
    if (selectedItem.current) {
      setImagePreview(selectedItem.current.image_product);
      setValuesForm({
        title: selectedItem.current.title,
        description: selectedItem.current.description,
        discount: selectedItem.current.discount + "",
        price: selectedItem.current.price,
      });
      setProductImages(selectedItem.current.images);
      setValuesAttributes(selectedItem.current.attributes);
    }
  }, [selectedItem.current]);

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
      imagePreview &&
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
    setAttributeValue([]);
    setSelectedFile(null);
    setImagePreview(null);

    imagesProducts.current = [];
    nameImagesProducts.current = [];
    setProductImages([]);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedItem.current) {
      try {
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
          await mutateAsyncUpdated({
            id: selectedItem.current.id,
            data: formData,
          });
          toast.success("Producto actualizado");
          refetch();
          cleanField();
          onClose();
        }
      } catch (error) {
        toast.error("Error inesperado al crear el producto");
      }
    } else {
      if (!products?.products.some((i) => i.title === valuesForm.title)) {
        try {
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
        } catch (error) {
          toast.error("Error inesperado al actualizar el producto");
        }
      } else {
        toast.error("Ya existe un producto con el mismo titulo");
      }
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
          if (!nameImagesProducts.current.some((i) => i === file.name)) {
            imagesProducts.current = [...imagesProducts.current, file];
            nameImagesProducts.current = [
              ...nameImagesProducts.current,
              file.name,
            ];
            const imageUrl = URL.createObjectURL(file);
            setProductImages((prev) => [...prev, imageUrl]);
            event.target.value = "";
          } else {
            toast.error("La imagen ya existe");
          }
        }
      }
    },
    [productImages, nameImagesProducts.current]
  );
  const deleteImageProduct = useCallback(
    (image: string) => {
      const images = productImages.filter((i) => i !== image);
      setProductImages(images);
    },
    [productImages]
  );

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
            <h1 className="mb-2 font-bold text-xl">
              {selectedItem.current
                ? "Editar un producto"
                : "Crear un producto"}{" "}
            </h1>
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
          <Button disabled={isValid() || isPending || isPendingUpdated}>
            {isPending || isPendingUpdated ? (
              <div className="loader" />
            ) : selectedItem ? (
              "Guardar cambios"
            ) : (
              "Crear producto"
            )}{" "}
          </Button>
        </form>
      </section>
    )
  );
};

export default ModalProduct;
