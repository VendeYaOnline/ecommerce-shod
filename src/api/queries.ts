import { useQuery } from "@tanstack/react-query";
import { getAttributes, getImages, getProducts } from "./request";

export const useQueryAttribute = (currentPage: number) => {
  return useQuery({
    queryKey: ["attributes", currentPage],
    queryFn: () => getAttributes(currentPage),
  });
};

export const useQueryProducts = (currentPage: number) => {
  return useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => getProducts(currentPage),
  });
};

export const useQueryImages = (currentPage: number) => {
  return useQuery({
    queryKey: ["iamges", currentPage],
    queryFn: () => getImages(currentPage),
  });
};
