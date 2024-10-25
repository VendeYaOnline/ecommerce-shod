"use client";

import { usePathname } from "next/navigation";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import classes from "./ProductCard.module.css";
import Link from "next/link";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  tag?: string;
}

export default function ProductCard({
  image,
  title,
  price,
  tag,
}: ProductCardProps) {
  const params = usePathname();

  const route = (paramas: string, id: string) => {
    switch (paramas) {
      case `/hombre-zapatillas`:
        return `/hombre-zapatillas/${id}`;
      case `/mujer-zapatillas`:
        return `/mujer-zapatillas/${id}`;
      case `/ninos-zapatillas`:
        return `/ninos-zapatillas/${id}`;
      case `/ofertas`:
        return `/ofertas/${id}`;
      default:
        return "/";
    }
  };

  return (
    <div className={classes["card-product"]}>
      <Link href={route(params, "asd")}>
        <div className="relative">
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            priority
            className="w-full sm:h-auto md:h-80  lg:h-80 xl:h-80  object-cover"
          />
          <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white">
            <Heart className="w-5 h-5" />
          </button>
          {tag && (
            <span className="absolute top-4 left-4 px-3 py-1 text-xs bg-indigo-600 text-white rounded-full">
              {tag}
            </span>
          )}
        </div>
        <div className={classes["card-product"]}>
          <div className="p-4">
            <h3 className="font-medium mb-2">{title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-col">
                <span className="font-semibold">${price}</span>
                <div className={classes["container-colors"]}>
                  <div
                    className={classes["item-color"]}
                    style={{ backgroundColor: "red" }}
                  />
                  <div className={classes["item-color"]} />
                  <div className={classes["item-color"]} />
                </div>
              </div>
              <button className="p-2 bg-[#6439ff] text-white rounded-lg">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
