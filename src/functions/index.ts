export const attributes = [
  {
    id: 1,
    name: "Color",
  },

  {
    id: 2,
    name: "Talla",
  },

  {
    id: 3,
    name: "Peso",
  },
  {
    id: 4,
    name: "Dimensión",
  },

  {
    id: 5,
    name: "Mililitro",
  },
  {
    id: 6,
    name: "Género",
  },
];

export const nameKey = (type: string) => {
  switch (type) {
    case "Color":
      return "color";

    case "Talla":
      return "size";

    case "Peso":
      return "weight";

    case "Dimensión":
      return "dimension";
    case "Mililitro":
      return "mililitir";

    case "Género":
      return "gender";
    default:
      return "";
  }
};

export const dataGenders = [
  {
    id: 1,
    gender: "Masculino",
  },
  {
    id: 2,
    gender: "Femenino",
  },
  {
    id: 3,
    gender: "Hombre",
  },
  {
    id: 4,
    gender: "Mujer",
  },
  {
    id: 5,
    gender: "Niño",
  },
  {
    id: 6,
    gender: "Niña",
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

export function convertPrice(value: string) {
  // Paso 1: Eliminar cualquier carácter que no sea un dígito
  const numericValue = value.replace(/\D/g, "");

  // Paso 2: Verificar si el campo está vacío
  if (!numericValue) {
    return ""; // Retornar cadena vacía si no hay números
  }

  // Paso 3: Convertir a número
  const numberValue = parseInt(numericValue, 10);

  // Paso 4: Formatear en pesos colombianos
  const formattedValue = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(numberValue);

  return formattedValue; // Retorna el valor en formato "COP 10.000"
}

export function calculatePageAfterDeletion(
  totalItems: number,
  itemsPerPage: number
) {
  // Calcula el total de páginas antes de la eliminación
  return Math.ceil(totalItems / itemsPerPage);
}
