"use client";

import { Dispatch, SetStateAction, useState } from "react";
import classes from "./Select.module.css";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  value: string;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string>>;
  data: { id: number; name: string }[];
}

const Select = ({ data = [], value, setValue, placeholder }: Props) => {
  const [activeSelect, setActiveSelect] = useState(false);

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
        <span className="text-slate-400 ml-1 flex justify-between items-center">
          {value !== "" ? value : placeholder}
          {activeSelect ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </div>
      {activeSelect && (
        <div className={classes.list}>
          {data.map((item) => (
            <span
              key={item.id}
              onClick={() => onClose(item.name)}
              className={
                item.name === value
                  ? `${classes.active} flex justify-between items-center`
                  : "flex justify-between items-center"
              }
            >
              {item.name}
              {item.name === value && <Check size={12} />}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;