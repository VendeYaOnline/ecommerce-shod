import { useMutation } from "@tanstack/react-query";
import { createAttribute } from "./request";

export const useMutationAttribute = () => {
  return useMutation({ mutationFn: createAttribute });
};
