"use client";

import { useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ArrowLeft } from "lucide-react";
import { Cant } from "@/components";
import classes from "./Tenis.module.css";
import Imagen1 from "/public/products/tenis-1_1.png";
import Imagen2 from "/public/products/tenis-1_2.png";
import Imagen3 from "/public/products/tenis-1_3.png";

const Product = () => {
  const [value, setValue] = useState(1);
  const [imageSelect, setImageSelect] = useState<StaticImageData>(Imagen1);

  return (
    <div>
      <nav className={classes["container-menu"]}>
        <Link href="/hombre-zapatillas">
          <button>
            <ArrowLeft color={"white"} />
          </button>
        </Link>
      </nav>
      <section className={classes["container-details"]}>
        <div className={classes["container-images"]}>
          <Image
            src={Imagen1}
            width={100}
            height={100}
            alt="Producto"
            className="rounded-xl cursor-pointer"
            onClick={() => setImageSelect(Imagen1)}
          />
          <Image
            src={Imagen2}
            width={100}
            height={100}
            alt="Producto"
            className="rounded-xl cursor-pointer"
            onClick={() => setImageSelect(Imagen2)}
          />
          <Image
            src={Imagen3}
            width={100}
            height={100}
            alt="Producto"
            className="rounded-xl cursor-pointer"
            onClick={() => setImageSelect(Imagen3)}
          />
        </div>
        <Image
          src={imageSelect}
          width={700}
          height={500}
          alt="image-product"
          className={classes["image-product"]}
        />

        <div className={classes["container-info"]}>
          <h1>Nike Dunk Low Retro SE Leather/Suede</h1>
          <span>Zapatillas - Hombre</span>
          <h2 className="text-xl">$840.000</h2>

          <h3>Color</h3>
          <div className={classes["container-colors"]}>
            <div className={classes.color} />
            <div className={classes.color} />
            <div className={classes.color} />
          </div>

          <h3 className="mt-5">Selecciona tu talla</h3>
          <div className={classes["container-size"]}>
            <div className={classes.size}>32</div>
            <div className={classes.size}>33</div>
            <div className={classes.size}>34</div>
            <div className={classes.size}>35</div>
            <div className={classes.size}>36</div>
            <div className={classes.size}>37</div>
            <div className={classes.size}>38</div>
            <div className={classes.size}>39</div>
            <div className={classes.size}>40</div>
            <div className={classes.size}>41</div>
            <div className={classes.size}>42</div>
            <div className={classes.size}>43</div>
            <div className={classes.size}>44</div>
          </div>
          <p className="mt-5">
            Inspirada en las AJ1 originales, esta edición de perfil medio
            mantiene el look icónico que más te gusta, y los colores elegidos y
            la piel impecable aportan una identidad distintiva.
          </p>
          <Cant value={value} setValue={setValue} />
          <button className={classes["button-pay"]}>Añadir a la cesta</button>
        </div>
      </section>
    </div>
  );
};

export default Product;
