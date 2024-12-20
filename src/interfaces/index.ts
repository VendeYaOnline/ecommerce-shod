export interface Attribute {
  color: { name: string; color: string }[];
  size: string[];
  weight: string[];
  dimension: string[];
  mililitir: string[];
  gender: string[];
}

export interface AttributeData {
  attribute_name: string;
  attribute_type: string;
  value: any[];
}

export type AttributeValues = string[] | { name: string; value: string }[];

export interface AttributeUpdated {
  id: number;
  attribute_name: string;
  attribute_type: string;
  value: AttributeValues;
}

export interface ProductsResponse {
  id: number;
  image_product: string;
  title: string;
  price: string;
  attributes: string;
  description: string;
  feature: string;
  discount: number;
  images: string[];
}

export interface AttributeFind {
  attributes: AttributeUpdated[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}

export interface ImagesFind {
  images: {
    Key: string;
    LastModified: string;
    Size: number;
    Url: string;
  }[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}

export interface ProductFind {
  products: ProductsResponse[];
  total: number;
  grandTotal: number;
  page: number;
  totalPages: number;
}

export type TpeValue =
  | "Color"
  | "Talla"
  | "Peso"
  | "Dimensión"
  | "Mililitro"
  | "Género";

export interface ValuesAttributes {
  Talla: string[];
  Peso: string[];
  Dimensión: string[];
  Género: string[];
  Mililitro: string[];
  Color: {
    name: string;
    color: string;
  }[];
}

export interface Product {
  title: string;
  price: string;
  discount: string;
  description: string;
  image_product: FormData;
  images: string[];
  attributes: string[];
}

export interface ProductTable {
  attributes: ValuesAttributes;
  id: number;
  image_product: string;
  title: string;
  price: string;
  description: string;
  feature: string;
  discount: number;
  images: string[];
}
