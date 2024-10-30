import { CircleX } from "lucide-react";
import classes from "./ModalAttribute.module.css";
import Button from "../button/Button";
import Select from "../select/Select";
import { attributes } from "@/functions";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../input/Input";
import AttributeColor from "../attribute-color/AttributeColor";

interface Props {
  active: boolean;
  onClose: () => void;
}

const ModalAttribute = ({ active, onClose }: Props) => {
  const [type, setType] = useState("");
  const [colors, setColors] = useState<{ name: string; color: string }[]>([]);
  const [isValid, setisValid] = useState(false);
  const [nameAttribute, setNameAttribute] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Data", nameAttribute, colors);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameAttribute(e.target.value);
  };

  const typeAttribute = (value: string) => {
    switch (value) {
      case "Color":
        return (
          <AttributeColor
            nameAttribute={nameAttribute}
            colors={colors}
            setColors={setColors}
            setisValid={setisValid}
          />
        );

      case "Tamaño":
        return <h1>Tamaño</h1>;

      case "Talla":
        return <h1>Talla</h1>;
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
