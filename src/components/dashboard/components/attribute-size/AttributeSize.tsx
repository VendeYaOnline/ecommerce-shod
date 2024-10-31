import { CirclePlus, CircleX } from "lucide-react";
import Input from "../input/Input";
import classes from "./AttributeSize.module.css";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Attribute } from "@/interfaces";

interface Props {
  attributes: Attribute;
  setValueAttribute: Dispatch<SetStateAction<Attribute>>;
  nameAttribute: string;
  setisValid: Dispatch<SetStateAction<boolean>>;
}

const Size = ({
  attributes,
  setValueAttribute,
  nameAttribute,
  setisValid,
}: Props) => {
  const [valueSize, setValueSize] = useState<string>("");
  const [error, setError] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueSize(e.target.value);
  };

  const addSize = () => {
    if (!attributes.size.find((i) => i === valueSize)) {
      setValueAttribute({
        ...attributes,
        size: [...attributes.size, valueSize],
      });
      setError(false);
      setValueSize("");
    } else {
      setError(true);
    }
  };

  const removeSize = (name: string) => {
    const newSizes = attributes.size.filter((i) => i !== name);
    setValueAttribute({ ...attributes, size: newSizes });
  };

  useEffect(() => {
    if (nameAttribute !== "" && attributes.size.length) {
      setisValid(true);
    } else {
      setisValid(false);
    }
  }, [nameAttribute, attributes.size]);

  return (
    <div>
      <label className="text-slate-600 block mb-2">Valor</label>
      <div className="flex gap-2">
        <Input
          type="string"
          value={valueSize}
          onChange={onChange}
          placeholder="S,M,XL o 32,34,40..."
        />
        <button
          className={
            valueSize !== ""
              ? classes["add-color-active"]
              : classes["add-color"]
          }
          onClick={addSize}
          disabled={valueSize !== "" ? false : true}
        >
          <CirclePlus />
        </button>
      </div>
      {error && (
        <span className="text-xs text-red-700">La talla ya existe</span>
      )}
      <div className="flex flex-wrap gap-2 mt-3">
        {attributes.size.map((size, index) => (
          <div key={index} className={classes.burble}>
            {size}

            <CircleX
              size={14}
              className="cursor-pointer"
              onClick={() => removeSize(size)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Size;
