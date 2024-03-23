// Import necessary libraries and types
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ITurfBase, ITurfFetched } from "@/types";
import toast from "react-hot-toast";
import { eCheck } from "@/components/helpers/functions";

// Hook for creating a new turf
export const useCreateTurf = () => {
  const queryClient = useQueryClient(); // Get the query client from React Query

  // Function to create a new turf
  const createTurf = async (turf: ITurfBase) => {
    await axios.post("/api/turfs", turf).then(eCheck); // Send a POST request to the "/api/turfs" endpoint
  };

  // Use a mutation from React Query
  return useMutation({
    mutationFn: createTurf, // The function to run when the mutation is triggered
    mutationKey: ["createTurf"], // The key for this mutation
    onSuccess: () => {
      // After the mutation is successful
      queryClient.invalidateQueries({
        // Invalidate any queries with the key "turfs"
        queryKey: ["turfs"],
      });
      toast.success("Turf created successfully"); // Display a success toast
    },
  });
};

// Hook for getting all turfs
export const useGetAllTurfs = () => {
  // Use a query from React Query
  return useQuery({
    queryKey: ["turfs"], // The key for this query
    queryFn: async () => axios.get("/api/turfs/all").then(eCheck), // The function to run when the query is triggered
  });
};

// Hook for getting a turf by its ID
export const useGetTurf = (_id: string) => {
  // Use a query from React Query
  return useQuery<ITurfFetched>({
    queryKey: ["turf", _id], // The key for this query
    queryFn: async () => axios.get(`/api/turfs?_id=${_id}`).then(eCheck), // The function to run when the query is triggered
  });
};

// Hook for getting all turfs by the owner
export const useGetAllTurfsByOwner = (owner: string) => {
  // Use a query from React Query
  return useQuery<ITurfFetched[]>({
    queryKey: ["turfs", owner], // The key for this query
    queryFn: async () =>
      axios.get(`/api/turfs/all?owner=${owner}`).then(eCheck), // The function to run when the query is triggered
  });
};

// Hook for updating a turf
export const useUpdateTurf = () => {
  const queryClient = useQueryClient(); // Get the query client from React Query

  // Use a mutation from React Query
  return useMutation({
    mutationFn: async (
      turf: Partial<ITurfFetched> & {
        _id: string;
      }
    ): Promise<ITurfFetched> => {
      return await axios.put("/api/turfs", turf).then(eCheck); // The function to run when the mutation is triggered
    },
    mutationKey: ["updateTurf"], // The key for this mutation
    onSuccess: (turf) => {
      // After the mutation is successful
      console.log(turf);
      queryClient.invalidateQueries({
        // Invalidate any queries with the key "turf" and the turf's ID
        // queryKey: ["turf", turf._id],
      });
    },
  });
};

// Hook for deleting a turf
export const useDeleteTurf = () => {
  const queryClient = useQueryClient(); // Get the query client from React Query

  // Use a mutation from React Query
  return useMutation({
    mutationFn: async (_id: string) => {
      return await axios.delete(`/api/turfs?_id=${_id}`).then(eCheck); // The function to run when the mutation is triggered
    },
    mutationKey: ["deleteTurf"], // The key for this mutation
    onSuccess: () => {
      // After the mutation is successful
      queryClient.invalidateQueries({
        // Invalidate any queries with the key "turfs"
        queryKey: ["turfs"],
      });
    },
  });
};
