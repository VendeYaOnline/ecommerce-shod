import { AttributeData, AttributeUpdated } from "@/interfaces";
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

export const createAttribute = async (data: AttributeData) => {
  return axiosConfig.post("/create-attribute", data);
};

export const updatedAttribute = async ({ id, ...data }: AttributeUpdated) => {
  return axiosConfig.put(`/updated-attribute/${id}`, data);
};

export const deleteAttribute = async (idElement: number) => {
  return axiosConfig.delete(`/delete-attribute/${idElement}`);
};
