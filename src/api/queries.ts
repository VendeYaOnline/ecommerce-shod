import { useQuery } from "@tanstack/react-query";
import { getAttributes, getProducts } from "./request";

export const useQueryAttribute = () => {
  return useQuery({ queryKey: ["attributes"], queryFn: getAttributes });
};

export const useQueryProducts = (currentPage: number) => {
  return useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => getProducts(currentPage),
  });
};
