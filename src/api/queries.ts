import { useQuery } from "@tanstack/react-query";
import { getAttributes, getImages, getProducts } from "./request";

export const useQueryAttribute = (currentPage: number, search: string) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["attributes", validPage],
    queryFn: () => getAttributes(validPage, search),
    refetchOnWindowFocus: false,
    enabled: currentPage > 0,
  });
};

export const useQueryProducts = (currentPage: number, search: string) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["products", validPage],
    queryFn: () => getProducts(validPage, search),
    refetchOnWindowFocus: false,
    enabled: currentPage > 0,
  });
};

export const useQueryImages = (
  currentPage: number,
  search: string,
  limit: number
) => {
  const validPage = currentPage > 0 ? currentPage : 1;
  return useQuery({
    queryKey: ["images", validPage],
    queryFn: () => getImages(validPage, search, limit),
    refetchOnWindowFocus: false,
    enabled: currentPage > 0,
  });
};
