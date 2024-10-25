import React from "react";

const categories = [
  "T-Shirt",
  "Sweatshirt",
  "Dress",
  "Pants and Skirt",
  "Swimsuit",
  "Stuff and Accessories",
];

const types = ["Basic", "Pattern", "Hoodie", "Zipper", "Oversize"];
const colors = ["Black", "Red", "Brown", "Multicolor", "Grey", "Blue"];

export default function Sidebar() {
  return (
    <aside className="w-64 p-6 border-r min-h-screen">
      <div className="mb-8">
        <h3 className="font-semibold mb-4">Category</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category}
              className={`text-sm cursor-pointer ${
                category === "Sweatshirt"
                  ? "text-indigo-600 font-medium"
                  : "text-gray-600"
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-4">Filter by:</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Type</h4>
            {types.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 text-sm text-gray-600 mb-2"
              >
                <input type="checkbox" className="rounded text-indigo-600" />
                {type}
              </label>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Colour</h4>
            {colors.map((color) => (
              <label
                key={color}
                className="flex items-center gap-2 text-sm text-gray-600 mb-2"
              >
                <input type="checkbox" className="rounded text-indigo-600" />
                {color}
              </label>
            ))}
          </div>

          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
            Apply
          </button>
        </div>
      </div>
    </aside>
  );
}
