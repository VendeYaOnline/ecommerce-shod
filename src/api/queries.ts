import { useQuery } from "@tanstack/react-query";
import { getAttributes } from "./request";

export const useQueryAttribute = () => {
  return useQuery({ queryKey: ["attributes"], queryFn: getAttributes });
};
