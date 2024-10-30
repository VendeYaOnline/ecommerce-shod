import { ChangeEvent } from "react";
import classes from "./Input.module.css";

interface Props {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, onChange }: Props) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className={classes.input}
      id="title"
    />
  );
};

export default Input;
