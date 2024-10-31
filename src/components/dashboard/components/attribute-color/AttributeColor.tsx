import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import classes from "./AttributeColor.module.css";
import Input from "../input/Input";
import { CircleX } from "lucide-react";
import { getContrastingColor } from "@/functions";
import { Attribute } from "@/interfaces";

interface Props {
  nameAttribute: string;
  attributes: Attribute;
  setisValid: Dispatch<SetStateAction<boolean>>;
  setValueAttribute: Dispatch<SetStateAction<Attribute>>;
}

const AttributeColor = ({
  nameAttribute,
  attributes,
  setValueAttribute,
  setisValid,
}: Props) => {
  const [name, setname] = useState("");
  const [error, setError] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#1A1A19");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
  };

  const addColor = () => {
    if (!attributes.color.find((i) => i.name === name)) {
      setValueAttribute({
        ...attributes,
        color: [...attributes.color, { name: name, color: selectedColor }],
      });
      setname("");
      setSelectedColor("#FF9D3D");
      setError(false);
    } else {
      setError(true);
    }
  };

  const removeColor = (name: string) => {
    const newColors = attributes.color.filter((i) => i.name !== name);
    setValueAttribute({ ...attributes, color: newColors });
  };

  useEffect(() => {
    if (nameAttribute !== "" && attributes.color.length) {
      setisValid(true);
    } else {
      setisValid(false);
    }
  }, [nameAttribute, attributes.color]);
  return (
    <>
      <div className="flex gap-5 justify-between items-center ">
        <div>
          <label>Nombre del color</label>
          <Input
            value={name}
            onChange={onChange}
            placeholder="Rojo, Azul, Negro..."
          />
        </div>
        <div>
          <input
            type="color"
            value={selectedColor}
            className={classes["select-color"]}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
        </div>
      </div>
      {error && (
        <span className="text-xs text-red-700">El color ya existe</span>
      )}
      <div className="flex flex-wrap gap-2">
        {attributes.color.map((item, index) => (
          <div
            key={index}
            className={classes.burble}
            style={{
              backgroundColor: item.color,
              color: getContrastingColor(item.color),
            }}
          >
            {item.name}{" "}
            <CircleX
              size={14}
              className="cursor-pointer"
              onClick={() => removeColor(item.name)}
            />
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          onClick={addColor}
          className={
            name !== "" ? classes["add-color-active"] : classes["add-color"]
          }
          disabled={name !== "" ? false : true}
        >
          Agregar color
        </button>
      </div>
    </>
  );
};

export default AttributeColor;
