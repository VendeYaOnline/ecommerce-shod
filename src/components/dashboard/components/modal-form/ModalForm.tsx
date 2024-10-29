"use client";

import { list } from "@/functions";
import Button from "../button/Button";
import classes from "./ModalForm.module.css";
import { CircleX, ImageUp } from "lucide-react";
import Input from "../input/Input";
import Select from "../select/Select";
import Textarea from "../textarea/Textarea";

interface Props {
  active: boolean;
  onClose: () => void;
}

const ModalForm = ({ active, onClose }: Props) => {
  return (
    active && (
      <section className={classes["container-modal"]}>
        <form className={classes["form-modal"]}>
          <div>
            <CircleX
              className="absolute right-5 cursor-pointer"
              onClick={() => {
                onClose();
              }}
            />
            <h1 className="mb-2 font-bold text-xl">Crear un producto</h1>
          </div>

          <div className="relative mt-1">
            <div className={classes.capa}>
              <ImageUp size={60} strokeWidth={1} />
            </div>
            <input className={classes["container-image"]} type="file" />
          </div>

          <div className="flex flex-col gap-1 mt-3">
            <label htmlFor="title">Titulo</label>
            <Input />
          </div>

          <div className="flex gap-3 mt-1">
            <div className="flex flex-col w-full">
              <label htmlFor="title">Precio</label>
              <Input />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="title">Descuento</label>
              <Input />
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-1">
            <label>Atributo</label>
            <Select list={list} />
          </div>

          <div className="mt-2 flex flex-col gap-1">
            <label>Descripcion</label>
            <Textarea />
          </div>

          <Button>Guardar producto</Button>
        </form>
      </section>
    )
  );
};

export default ModalForm;
