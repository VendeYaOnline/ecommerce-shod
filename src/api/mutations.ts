import { useMutation } from "@tanstack/react-query";
import {
  createAttribute,
  deleteAttribute,
  updatedAttribute,
  createProduct,
  updatedProduct,
  deleteProduct,
  uploadImages,
  deleteImage,
} from "./request";

// * ATRIBUTOS

export const useMutationAttribute = () => {
  return useMutation({ mutationFn: createAttribute });
};

export const useMutationUpdatedAttribute = () => {
  return useMutation({ mutationFn: updatedAttribute });
};

export const useMutationDeleteAttribute = () => {
  return useMutation({ mutationFn: deleteAttribute });
};

// * PRODUCTOS

export const useMutationProduct = () => {
  return useMutation({ mutationFn: createProduct });
};

export const useMutationUpdatedProduct = () => {
  return useMutation({ mutationFn: updatedProduct });
};

export const useMutationDeleteProduct = () => {
  return useMutation({ mutationFn: deleteProduct });
};

// * IMAGES

export const useMutationImages = () => {
  return useMutation({ mutationFn: uploadImages });
};

export const useMutationDeleteImage = () => {
  return useMutation({ mutationFn: deleteImage });
};
