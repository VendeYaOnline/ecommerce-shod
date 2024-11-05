export interface Attribute {
  color: { name: string; color: string }[];
  size: string[];
  weight: string[];
  dimension: string[];
  mililitir: string[];
}

export interface AttrbuteData {
  attribute_name: string;
  attribute_type: string;
  value: any[];
}
