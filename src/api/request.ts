import { AttrbuteData } from "@/interfaces";
import { axiosConfig } from "./config";

export const getAttributes = async () => {
  return (
    await axiosConfig.get<{
      attributes: {
        id: number;
        attribute_name: string;
        attribute_type: string;
        value: any[];
      }[];
    }>("/get-attributes")
  ).data.attributes;
};

export const createAttribute = async (data: AttrbuteData) => {
  return axiosConfig.post("/create-attribute", data);
};
