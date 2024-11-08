import { ChangeEvent } from "react";
import classes from "./Textarea.module.css";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({ value, onChange }: Props) => {
  return (
    <textarea value={value} onChange={onChange} className={classes.textarea} />
  );
};

export default Textarea;
