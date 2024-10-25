import React from "react";
import ProductCard from "./ProductCard/ProductCard";
import Tenis1 from "/public/products/tenis-1_1.png";
import Tenis2 from "/public/products/tenis-2_1.png";
import Tenis3 from "/public/products/tenis-3_1.png";
import Tenis4 from "/public/products/tenis-4_1.png";
import Tenis5 from "/public/products/tenis-5_1.png";
import Tenis6 from "/public/products/tenis-6_1.png";
import Tenis7 from "/public/products/tenis-7_1.png";
import Tenis8 from "/public/products/tenis-8_1.png";
import Tenis9 from "/public/products/tenis-9_1.png";
import Tenis10 from "/public/products/tenis-10_1.png";
import Tenis11 from "/public/products/tenis-11_1.png";
import Tenis12 from "/public/products/tenis-12_1.png";

const products = [
  {
    image: Tenis1.src,
    title: "Line-Pattern Zipper Sweatshirt",
    price: 200,
    tag: "NEW",
  },
  {
    image: Tenis2.src,
    title: "Black Fantasy Sweatshirt",
    price: 200,
  },
  {
    image: Tenis3.src,
    title: "Black Fantasy Sweatshirt",
    price: 200,
  },

  {
    image: Tenis4.src,
    title: "Black Fantasy Sweatshirt",
    price: 200,
  },

  {
    image: Tenis5.src,
    title: "Black Fantasy Sweatshirt",
    price: 200,
  },

  {
    image: Tenis6.src,
    title: "Black Fantasy Sweatshirt",
    price: 200,
  },

  {
    image: Tenis7.src,
    title: "Black Fantasy Sweatshirt",
    price: 200,
  },

  {
    image: Tenis8.src,
    title: "Black Fantasy Sweatshirt",
    price: 200,
  },

  {
    image: Tenis9.src,
    title: "Black Fantasy Sweatshirt",
    price: 200,
  },

  {
    image: Tenis10.src,
    title: "Black Fantasy Sweatshirt",
    price: 200,
  },

  {
    image: Tenis11.src,
    title: "Black Fantasy Sweatshirt",
    price: 200,
  },

  {
    image: Tenis12.src,
    title: "Black Fantasy Sweatshirt",
    price: 200,
  },
];

export default function ProductGrid() {
  return (
    <div className="p-6 bg-[#e5e5e5] w-full">
      <div className="flex items-center justify-between mb-6">
        <select className="px-4 py-2 border rounded-lg text-sm">
          <option>Most Popular</option>
          <option>Newest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      <div className="grid gap-6 xs-grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      <div className="flex justify-center flex-wrap gap-2 mt-8">
        <button className="px-4 py-2 text-sm text-gray-600">Previous</button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`w-8 h-8 rounded-lg text-sm ${
              page === 3
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
        <button className="px-4 py-2 text-sm text-gray-600">Next</button>
      </div>
    </div>
  );
}
