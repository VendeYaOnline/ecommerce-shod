import {
  AttributeData,
  AttributeFind,
  AttributeUpdated,
  ImagesFind,
  ProductFind,
  ValuesAttributes,
} from "@/interfaces";
import { axiosConfig } from "./config";

// * ATRIBUTOS

export const getAttributes = async (page: number, search: string = "") => {
  return (
    await axiosConfig.get<AttributeFind>(
      `/get-attributes?page=${page}&search=${search}`
    )
  ).data;
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

export const getProducts = async (page: number, search: string = "") => {
  const result = (
    await axiosConfig.get<ProductFind>(
      `/get-products?page=${page}&search=${search}`
    )
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

export const updatedProduct = async ({
  id,
  data,
}: {
  id: number;
  data: FormData;
}) => {
  return axiosConfig.put(`/updated-product/${id}`, data);
};

export const deleteProduct = async (idElement: number) => {
  return axiosConfig.delete(`/delete-product/${idElement}`);
};

//* IMAGES

export const uploadImages = async (data: FormData) => {
  console.log("data", data.get("images"));
  return axiosConfig.post("/upload-images", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getImages = async (
  page: number,
  search: string,
  limit: number
) => {
  const result = (
    await axiosConfig.get<ImagesFind>(
      `/get-images?page=${page}&search=${search}&limit=${limit}`
    )
  ).data;
  return result;
};
