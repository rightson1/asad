import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IOrderBase } from "@/types";
import { eCheck } from "@/components/helpers/functions";

export const useCreateOrder = () => {
  const createOrder = async (order: IOrderBase) => {
    await axios.post("/api/orders", order).then(eCheck);
  };
  return useMutation({
    mutationFn: createOrder,
    mutationKey: ["createOrder"],
  });
};
