import {
  AttributeData,
  AttributeFind,
  AttributeUpdated,
  ProductFind,
  ValuesAttributes,
} from "@/interfaces";
import { axiosConfig } from "./config";

// * ATRIBUTOS

export const getAttributes = async (page: number) => {
  return (await axiosConfig.get<AttributeFind>(`/get-attributes?page=${page}`))
    .data;
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

export const getProducts = async (page: number) => {
  const result = (
    await axiosConfig.get<ProductFind>(`/get-products?page=${page}`)
  ).data;

  return {
    ...result,
    products: result.products.map((i) => ({
      ...i,
      attributes: JSON.parse(i.attributes) as ValuesAttributes,
    })),
  };
};

export const createProduct = async (data: FormData) => {
  return axiosConfig.post("/create-product", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
