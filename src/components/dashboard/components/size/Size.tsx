import { CirclePlus, CircleX } from "lucide-react";
import Input from "../input/Input";
import classes from "./Size.module.css";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface Props {
  sizes: string[];
  setSizes: Dispatch<SetStateAction<string[]>>;
}

const Size = ({ sizes, setSizes }: Props) => {
  const [valueSize, setValueSize] = useState<string>("");
  const [error, setError] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueSize(e.target.value);
  };

  const addSize = () => {
    if (!sizes.find((i) => i === valueSize)) {
      setSizes([...sizes, valueSize]);
      setError(false);
      setValueSize("");
    } else {
      setError(true);
    }
  };

  const removeSize = (name: string) => {
    const newColors = sizes.filter((i) => i !== name);
    setSizes(newColors);
  };

  return (
    <div>
      <label className="text-slate-600">Valor</label>
      <div className="flex gap-2">
        <Input type="number" value={valueSize} onChange={onChange} />
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
        {sizes.map((size, index) => (
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
