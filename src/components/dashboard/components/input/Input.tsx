import { ChangeEvent } from "react";
import classes from "./Input.module.css";

interface Props {
  placeholder?: string;
  value?: string | number;
  type?: "string" | "number";
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

const Input = ({
  value,
  onChange,
  type,
  placeholder,
  disabled = false,
  maxLength,
}: Props) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className={classes.input}
      disabled={disabled}
      maxLength={maxLength}
      id="title"
    />
  );
};

export default Input;
