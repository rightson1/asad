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
    queryKey: ["orders"],
    enabled: !!_owner,
  });
};
//edit order
export const useEditOrder = () => {
  const queryClient = useQueryClient();
  const editOrder = async (order: { _id: string; status: string }) => {
    await axios.put("/api/orders", order).then(eCheck);
    queryClient.invalidateQueries({
      queryKey: ["orders"],
    });
  };
  return useMutation({
    mutationFn: editOrder,
    mutationKey: ["editOrder"],
  });
};
