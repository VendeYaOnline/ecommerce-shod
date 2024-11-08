"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import classes from "./SelectAttribute.module.css";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { AttributeValues, ValuesAttributes } from "@/interfaces";
import { getContrastingColor } from "@/functions";

interface Values {
  valueString: string;
  valueObject: string;
}

interface ValueObject {
  name: string;
  color: string;
}

interface Props {
  values: Values;
  setValues: Dispatch<SetStateAction<Values>>;
  attributeValue: AttributeValues;
  setValuesAttributes: Dispatch<SetStateAction<ValuesAttributes>>;
  valuesAttributes: ValuesAttributes;
  placeholder: string;
}

const SelectAttribute = ({
  values,
  setValues,
  attributeValue,
  placeholder,
  valuesAttributes,
  setValuesAttributes,
}: Props) => {
  const [activeSelect, setActiveSelect] = useState(false);

  const onCloseString = useCallback(
    (newValue: string) => {
      if (!valuesAttributes.valueString.some((i) => i === newValue)) {
        setActiveSelect(false);
        setValues({ valueObject: "", valueString: newValue });
        setValuesAttributes({
          valueObject: [],
          valueString: [...valuesAttributes.valueString, newValue],
        });
      } else {
        setActiveSelect(false);
        setValues({ valueObject: "", valueString: "" });
        const valueRemove = valuesAttributes.valueString.filter(
          (i) => i !== newValue
        );
        setValuesAttributes({
          valueObject: [],
          valueString: valueRemove,
        });
      }
    },
    [valuesAttributes]
  );

  const onCloseObject = useCallback(
    (newValue: ValueObject) => {
      setActiveSelect(false);
      if (!valuesAttributes.valueObject.some((i) => i.name === newValue.name)) {
        setValues({ valueString: "", valueObject: newValue.name });
        setValuesAttributes({
          valueString: [],
          valueObject: [...valuesAttributes.valueObject, newValue],
        });
      } else {
        setValues({ valueString: "", valueObject: "" });
        const valueRemove = valuesAttributes.valueObject.filter(
          (i) => i.name !== newValue.name
        );
        setValuesAttributes({
          valueString: [],
          valueObject: valueRemove,
        });
      }
    },
    [valuesAttributes]
  );

  const onChange = () => {
    setActiveSelect((prev) => !prev);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent, activeSelect: boolean) => {
      const elemento = document.getElementById("select-attribute");
      if (elemento && !elemento.contains(event.target as Node)) {
        if (activeSelect) {
          setActiveSelect(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener("click", (e) =>
      handleClickOutside(e, activeSelect)
    );
    return () => {
      document.removeEventListener("click", (e) =>
        handleClickOutside(e, activeSelect)
      );
    };
  }, [activeSelect]);

  return (
    <div className={classes["container-select"]} id="select-attribute">
      {attributeValue.every((elemento) => typeof elemento === "string") ? (
        <>
          <div
            className={
              activeSelect
                ? classes["select-active"]
                : classes["select-disabled"]
            }
            onClick={onChange}
          >
            <span className="text-slate-400 ml-1 flex justify-between items-center">
              {values.valueString !== "" ? values.valueString : placeholder}
              {activeSelect ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </span>
          </div>
          {activeSelect && (
            <div className={classes.list}>
              {attributeValue.map((item, index) => (
                <span
                  key={index}
                  onClick={() => onCloseString(item as string)}
                  className={
                    valuesAttributes.valueString.some((i) => i === item)
                      ? `${classes.active} flex justify-between items-center`
                      : "flex justify-between items-center"
                  }
                >
                  {item as string}
                  {valuesAttributes.valueString.some((i) => i === item) && (
                    <Check size={12} />
                  )}
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2 mt-3">
            {valuesAttributes.valueString.map((value, index) => (
              <div key={index} className="burble">
                {value}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            className={
              activeSelect
                ? classes["select-active"]
                : classes["select-disabled"]
            }
            onClick={onChange}
          >
            <span className="text-slate-400 ml-1 flex justify-between items-center">
              {values.valueObject !== "" ? values.valueObject : placeholder}
              {activeSelect ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </span>
          </div>
          {activeSelect && (
            <div className={classes.list}>
              {attributeValue.map((item: any, index) => (
                <span
                  key={index}
                  onClick={() => onCloseObject(item as ValueObject)}
                  className={
                    valuesAttributes.valueObject.some(
                      (i) => i.name === item.name
                    )
                      ? `${classes.active} flex justify-between items-center`
                      : "flex justify-between items-center"
                  }
                >
                  {item.name}
                  {valuesAttributes.valueObject.some(
                    (i) => i.name === item.name
                  ) && <Check size={12} />}
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2 mt-3">
            {valuesAttributes.valueObject.map(({ name, color }, index) => (
              <div
                className="rounded-lg py-1 px-3 text-sm"
                key={index}
                style={{
                  backgroundColor: color,
                  color: getContrastingColor(color),
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectAttribute;
