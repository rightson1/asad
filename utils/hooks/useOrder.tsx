import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IOrderBase, IOrderFetched } from "@/types";
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

//get order by _owner
export const useGetOrder = (_owner: string) => {
  const getOrder = async () => {
    return await axios
      .get("/api/orders", {
        params: { _owner },
      })
      .then(eCheck);
  };
  return useQuery<IOrderFetched[]>({
    queryFn: getOrder,
    queryKey: ["getOrder"],
    enabled: !!_owner,
  });
};
