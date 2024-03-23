// Import necessary libraries and types
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IUser, IUserFetched } from "@/types";
import toast from "react-hot-toast";
import { eCheck } from "@/components/helpers/functions";

// Hook for updating a user
export const useUpdateUser = () => {
  // Use a mutation from React Query
  return useMutation({
    mutationFn: (
      user: Partial<IUser> & {
        _id: string;
      }
    ) => axios.put("/api/users", user), // The function to run when the mutation is triggered
    onError: (error) => toast.error(error.message), // Display an error toast if the mutation fails
  });
};

// Hook for getting all users who are sellers
export const useGetAllSellers = () => {
  // Use a query from React Query
  return useQuery<IUserFetched[]>({
    queryKey: ["sellers"], // The key for this query
    queryFn: () => axios.get("/api/users/all").then(eCheck), // The function to run when the query is triggered
  });
};

// Hook for getting a user by their ID
export const useGetUser = (_id: string) => {
  // Use a query from React Query
  return useQuery<IUserFetched>({
    queryKey: ["user", _id], // The key for this query
    queryFn: () => axios.get(`/api/users?_id=${_id}`).then(eCheck), // The function to run when the query is triggered
  });
};
