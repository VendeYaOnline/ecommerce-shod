export interface Attribute {
  color: { name: string; color: string }[];
  size: string[];
  weight: string[];
  dimension: string[];
  mililitir: string[];
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

export interface AttributeFind {
  attributes: AttributeUpdated[];
}

export interface ValuesAttributes {
  valueString: string[];
  valueObject: {
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
