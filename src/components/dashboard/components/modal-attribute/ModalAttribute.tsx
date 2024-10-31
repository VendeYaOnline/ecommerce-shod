import { CircleX } from "lucide-react";
import classes from "./ModalAttribute.module.css";
import Button from "../button/Button";
import Select from "../select/Select";
import { attributes } from "@/functions";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Input from "../input/Input";
import { Attribute } from "@/interfaces";
import { AttributeColor, AttributeSize } from "../attributes";

interface Props {
  active: boolean;
  onClose: () => void;
}

const ModalAttribute = ({ active, onClose }: Props) => {
  const [type, setType] = useState("");
  const [valueAttribute, setValueAttribute] = useState<Attribute>({
    color: [],
    size: [],
  });

  const [isValid, setisValid] = useState(false);
  const [nameAttribute, setNameAttribute] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Nombre del atrobuto", nameAttribute);
    console.log("Tipo del atrobuto", type);
    console.log("Valor del atributo", valueAttribute);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameAttribute(e.target.value);
  };

  useEffect(() => {
    setValueAttribute({ color: [], size: [] });
  }, [type]);

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

      case "Peso":
        return <h1>Peso</h1>;

      case "Talla":
        return (
          <AttributeSize
            attributes={valueAttribute}
            setValueAttribute={setValueAttribute}
            nameAttribute={nameAttribute}
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
            <h1 className="mb-2 font-bold text-xl">Crear un atributo</h1>
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
          <Button disabled={!isValid}>Crear atributo</Button>
        </form>
      </section>
    )
  );
};

export default ModalAttribute;
