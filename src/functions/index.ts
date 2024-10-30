export const attributes = [
  {
    id: 1,
    name: "Color",
  },
  {
    id: 2,
    name: "Tamaño",
  },
  {
    id: 3,
    name: "Talla",
  },

  {
    id: 4,
    name: "Peso",
  },
  {
    id: 5,
    name: "Dimensión",
  },
];

export const list = [
  {
    id: 1,
    name: "Hombre",
  },
  {
    id: 2,
    name: "Mujer",
  },
  {
    id: 3,
    name: "Niños",
  },
];

export const getContrastingColor = (hexColor: string) => {
  // Convertir el color hex a valores RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calcular la luminancia relativa
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Si la luminancia es mayor que 128, el color es claro, si no, es oscuro
  return luminance > 128 ? "#000000" : "#FFFFFF";
};
