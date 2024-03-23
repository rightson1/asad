import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IOrderBase, IOrderFetched } from "@/types";
import { eCheck } from "@/components/helpers/functions";

// Hook for creating a new order
export const useCreateOrder = () => {
  const queryClient = useQueryClient(); // Get the query client from React Query

  // Function to create a new order
  const createOrder = async (order: IOrderBase) => {
    await axios.post("/api/orders", order).then(eCheck); // Send a POST request to the "/api/orders" endpoint
  };

  // Use a mutation from React Query
  return useMutation({
    mutationFn: createOrder, // The function to run when the mutation is triggered
    mutationKey: ["createOrder"], // The key for this mutation
    onSettled: () => {
      // After the mutation is settled
      queryClient.invalidateQueries({
        // Invalidate any queries with the key "orders"
        queryKey: ["orders"],
      });
    },
  });
};

// Hook for getting orders by owner or user
export const useGetOrders = ({
  _owner,
  _user,
}: {
  _owner?: string;
  _user?: string;
}) => {
  const query = _owner ? { _owner } : { _user }; // Determine the query based on the provided parameters

  // Function to get orders
  const getOrder = async () => {
    return await axios
      .get("/api/orders", {
        params: { ...query }, // Send a GET request to the "/api/orders" endpoint with the query parameters
      })
      .then(eCheck); // Handle the response
  };

  // Use a query from React Query
  return useQuery<IOrderFetched[]>({
    queryFn: getOrder, // The function to run when the query is triggered
    queryKey: ["orders", query], // The key for this query
    enabled: !!_owner || !!_user, // Only enable the query if either the owner or user is provided
  });
};

// Hook for editing an existing order
export const useEditOrder = () => {
  const queryClient = useQueryClient(); // Get the query client from React Query

  // Function to edit an order
  const editOrder = async (order: { _id: string; status: string }) => {
    await axios.put("/api/orders", order).then(eCheck); // Send a PUT request to the "/api/orders" endpoint
    queryClient.invalidateQueries({
      // Invalidate any queries with the key "orders"
      queryKey: ["orders"],
    });
  };

  // Use a mutation from React Query
  return useMutation({
    mutationFn: editOrder, // The function to run when the mutation is triggered
    mutationKey: ["editOrder"], // The key for this mutation
  });
};
