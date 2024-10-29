import classes from "./Button.module.css";

interface Props {
  children: string;
  onClik?: () => void;
}

const Button = ({ children, onClik }: Props) => {
  return (
    <button onClick={onClik} className={classes.button}>
      {children}
    </button>
  );
};

export default Button;
