import { ChangeEvent } from "react";
import classes from "./Input.module.css";

interface Props {
  placeholder?: string;
  value?: string | number;
  type?: "string" | "number";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, onChange, type, placeholder }: Props) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className={classes.input}
      id="title"
    />
  );
};

export default Input;
