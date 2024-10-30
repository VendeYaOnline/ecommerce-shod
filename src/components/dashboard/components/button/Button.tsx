import { ReactNode } from "react";
import classes from "./Button.module.css";

interface Props {
  children: string | ReactNode;
  disabled?: boolean;
  onClik?: () => void;
}

const Button = ({ children, onClik, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClik}
      className={
        disabled ? classes["button-disabled"] : classes["button-active"]
      }
    >
      {children}
    </button>
  );
};

export default Button;
