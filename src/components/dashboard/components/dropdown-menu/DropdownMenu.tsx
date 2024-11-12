import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Settings, UserCircle, LogOut } from "lucide-react";

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { text: "Color" },
    { text: "Talla" },
    { text: "Peso" },
    { text: "Dimensión" },
    { text: "Mililitro" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Menu"
      >
        <MoreVertical size={20} />
      </button>

      {isOpen && (
        <div className="h-[100px] overflow-auto absolute bottom-3 left-10 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-[100]">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="text-sm w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span>{item.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
