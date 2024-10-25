"use client";

import { ShoppingCart, User } from "lucide-react";
import Logo from "/public/logo.jpg";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const paramas = usePathname();

  return (
    <nav className="py-4 px-6 flex items-center justify-between border-b">
      <div className="flex items-center gap-8">
        <div className="flex items-center">
          <Link href="/">
            <Image src={Logo} width={60} alt="logo" />
          </Link>
        </div>
      </div>

      <ul className="flex gap-5">
        <li
          className={
            paramas.includes("hombre-zapatillas")
              ? "text-[#6439FF]"
              : "text-black"
          }
        >
          <Link href="/hombre-zapatillas">Hombre</Link>
        </li>
        <li
          className={
            paramas.includes("mujer-zapatillas")
              ? "text-[#6439FF]"
              : "text-black"
          }
        >
          <Link href="/mujer-zapatillas">Mujer</Link>
        </li>
        <li
          className={
            paramas.includes("ninos-zapatillas")
              ? "text-[#6439FF]"
              : "text-black"
          }
        >
          <Link href="/ninos-zapatillas">Niño/a</Link>
        </li>
        <li
          className={
            paramas.includes("ofertas") ? "text-[#6439FF]" : "text-black"
          }
        >
          <Link href="/ofertas">Ofertas</Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg flex items-center gap-2">
          <ShoppingCart size={20} />
        </button>
        <button className="p-2">
          <User size={24} />
        </button>
      </div>
    </nav>
  );
}
