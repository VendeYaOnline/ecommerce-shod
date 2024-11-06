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

export interface AttributeUpdated {
  id: number;
  attribute_name: string;
  attribute_type: string;
  value: any[];
}
