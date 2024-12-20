import { CircleX } from "lucide-react";
import classes from "./ModalAttribute.module.css";
import { attributes, nameKey } from "@/functions";
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useEffect,
  useState,
} from "react";
import { Attribute, AttributeUpdated, AttributeValues } from "@/interfaces";
import {
  AttributeColor,
  AttributeDimension,
  AttributeGender,
  AttributeMilliliter,
  AttributeSize,
  AttributeWeight,
} from "../../attributes";
import {
  useMutationAttribute,
  useMutationUpdatedAttribute,
} from "@/api/mutations";
import { useQueryAttribute } from "@/api/queries";
import toast from "react-hot-toast";
import Input from "../../input/Input";
import Select from "../../select/Select";
import Button from "../../button/Button";

interface Props {
  currentPage: number;
  active: boolean;
  selectedItem: MutableRefObject<AttributeUpdated | undefined>;
  onClose: () => void;
  search: string;
}

const ModalAttribute = ({
  currentPage,
  active,
  onClose,
  selectedItem,
  search,
}: Props) => {
  const [type, setType] = useState("");
  const { data, refetch } = useQueryAttribute(currentPage, search);
  const [isValid, setisValid] = useState(false);
  const [nameAttribute, setNameAttribute] = useState("");
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useMutationAttribute();
  const { mutateAsync: mutateAsyncUpdated, isPending: isPendingUpdated } =
    useMutationUpdatedAttribute();
  const [valueAttribute, setValueAttribute] = useState<Attribute>({
    color: [],
    size: [],
    weight: [],
    dimension: [],
    mililitir: [],
    gender: [],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !selectedItem.current &&
      data?.attributes.some((i) => i.attribute_name === nameAttribute)
    ) {
      toast.error("Ya existe un atributo con ese nombre");
    } else {
      !selectedItem.current
        ? await mutateAsyncCreate({
            attribute_name: nameAttribute,
            attribute_type: type,
            value: resultValue(type),
          })
        : await mutateAsyncUpdated({
            id: selectedItem.current.id,
            attribute_name: nameAttribute,
            attribute_type: type,
            value: resultValue(type) as AttributeValues,
          });
      refetch();
      onClose();
      setValueAttribute({
        color: [],
        size: [],
        weight: [],
        dimension: [],
        mililitir: [],
        gender: [],
      });
      setNameAttribute("");
      setType("");
      toast.success("Atributo creado");
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 30) {
      setNameAttribute(e.target.value);
    }
  };

  useEffect(() => {
    if (selectedItem.current) {
      console.log("selectedItem.current", selectedItem.current);
      setNameAttribute(selectedItem.current.attribute_name);
      setType(selectedItem.current.attribute_type);
      setValueAttribute({
        ...valueAttribute,
        [nameKey(selectedItem.current.attribute_type)]:
          selectedItem.current.value,
      });
    } else {
      setValueAttribute({
        color: [],
        size: [],
        weight: [],
        dimension: [],
        mililitir: [],
        gender: [],
      });
    }
  }, [selectedItem.current]);

  const resultValue = (type: string) => {
    switch (type) {
      case "Color":
        return valueAttribute.color;

      case "Talla":
        return valueAttribute.size;

      case "Peso":
        return valueAttribute.weight;

      case "Dimensión":
        return valueAttribute.dimension;
      case "Mililitro":
        return valueAttribute.mililitir;

      case "Género":
        return valueAttribute.gender;
      default:
        return [];
    }
  };

  const typeAttribute = (value: string) => {
    switch (value) {
      case "Color":
        return (
          <AttributeColor
            nameAttribute={nameAttribute}
            attributes={valueAttribute}
            setValueAttribute={setValueAttribute}
            setisValid={setisValid}
          />
        );

      case "Talla":
        return (
          <AttributeSize
            attributes={valueAttribute}
            setValueAttribute={setValueAttribute}
            nameAttribute={nameAttribute}
            setisValid={setisValid}
          />
        );

      case "Peso":
        return (
          <AttributeWeight
            attributes={valueAttribute}
            nameAttribute={nameAttribute}
            setValueAttribute={setValueAttribute}
            setisValid={setisValid}
          />
        );

      case "Dimensión":
        return (
          <AttributeDimension
            attributes={valueAttribute}
            nameAttribute={nameAttribute}
            setValueAttribute={setValueAttribute}
            setisValid={setisValid}
          />
        );

      case "Mililitro":
        return (
          <AttributeMilliliter
            attributes={valueAttribute}
            nameAttribute={nameAttribute}
            setValueAttribute={setValueAttribute}
            setisValid={setisValid}
          />
        );

      case "Género":
        return (
          <AttributeGender
            attributes={valueAttribute}
            nameAttribute={nameAttribute}
            setValueAttribute={setValueAttribute}
            setisValid={setisValid}
          />
        );
    }
  };

  return (
    active && (
      <section className={classes["container-modal"]}>
        <form className={classes["form-modal"]} onSubmit={handleSubmit}>
          <div>
            <CircleX
              className="absolute right-5 cursor-pointer"
              onClick={() => {
                onClose();
                setType("");
                setNameAttribute("");
              }}
            />
            <h1 className="mb-2 font-bold text-xl">
              {selectedItem.current
                ? "Editar un atributo"
                : "Crear un atributo"}{" "}
            </h1>
          </div>
          <label className="text-slate-600">Nombre del atributo</label>
          <Input value={nameAttribute} onChange={onChange} />
          <label className="text-slate-600">Tipo de atributo</label>
          <Select
            data={attributes}
            value={type}
            setValue={setType}
            placeholder="Selecciona un valor"
          />
          {typeAttribute(type)}
          <br />
          <Button disabled={!isValid || isPendingCreate || isPendingUpdated}>
            {isPendingCreate || isPendingUpdated ? (
              <div className="loader" />
            ) : selectedItem.current ? (
              "Guardar cambios"
            ) : (
              "Crear atributo"
            )}
          </Button>
        </form>
      </section>
    )
  );
};

export default ModalAttribute;
