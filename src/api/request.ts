import { AttributeData, AttributeFind, AttributeUpdated } from "@/interfaces";
import { axiosConfig } from "./config";

// * ATRIBUTOS

export const getAttributes = async () => {
  return (await axiosConfig.get<AttributeFind>("/get-attributes")).data
    .attributes;
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

// * PRODUCTOS

export const createProduct = async (data: any) => {
  return axiosConfig.post("/create-product", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
