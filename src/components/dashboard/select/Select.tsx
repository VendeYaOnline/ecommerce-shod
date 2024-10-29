"use client";

import { useState } from "react";
import classes from "./Select.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  list: { id: number; name: string }[];
}

const Select = ({ list = [] }: Props) => {
  const [activeSelect, setActiveSelect] = useState(false);
  const [value, setValue] = useState("");

  const onClose = (value: string) => {
    setActiveSelect(false);
    setValue(value);
  };

  const onChange = () => {
    setActiveSelect((prev) => !prev);
  };

  return (
    <div className={classes["container-select"]}>
      <div className={classes.select} onClick={onChange}>
        <span className="text-slate-400 ml-1 flex justify-between">
          {value !== "" ? value : "Seleciona un atributo"}
          {activeSelect ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>
      {activeSelect && (
        <div className={classes.list}>
          {list.map((item) => (
            <span key={item.id} onClick={() => onClose(item.name)}>
              {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
