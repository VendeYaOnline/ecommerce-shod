import { useMutation } from "@tanstack/react-query";
import { createAttribute, deleteAttribute } from "./request";

export const useMutationAttribute = () => {
  return useMutation({ mutationFn: createAttribute });
};

export const useMutationDeleteAttribute = () => {
  return useMutation({ mutationFn: deleteAttribute });
};
