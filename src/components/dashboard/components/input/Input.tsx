import { ChangeEvent } from "react";
import classes from "./Input.module.css";

interface Props {
  value?: string | number;
  type?: "string" | "number";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, onChange, type }: Props) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={classes.input}
      id="title"
    />
  );
};

export default Input;
