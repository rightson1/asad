import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IOrderBase, IOrderFetched } from "@/types";
import { eCheck } from "@/components/helpers/functions";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const createOrder = async (order: IOrderBase) => {
    await axios.post("/api/orders", order).then(eCheck);
  };
  return useMutation({
    mutationFn: createOrder,
    mutationKey: ["createOrder"],
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

//get order by _owner
export const useGetOrders = ({
  _owner,
  _user,
}: {
  _owner?: string;
  _user?: string;
}) => {
  const query = _owner ? { _owner } : { _user };
  console.log(query);
  const getOrder = async () => {
    return await axios
      .get("/api/orders", {
        params: { ...query },
      })
      .then(eCheck);
  };
  return useQuery<IOrderFetched[]>({
    queryFn: getOrder,
    queryKey: ["orders", query],
    enabled: !!_owner || !!_user,
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
