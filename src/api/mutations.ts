import { useMutation } from "@tanstack/react-query";
import {
  createAttribute,
  deleteAttribute,
  updatedAttribute,
  createProduct,
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
