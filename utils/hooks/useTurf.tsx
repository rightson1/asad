import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ITurfBase, ITurfFetched } from "@/types";
import toast from "react-hot-toast";
import { eCheck } from "@/components/helpers/functions";

// Create a turf
export const useCreateTurf = () => {
  const queryClient = useQueryClient();
  const createTurf = async (turf: ITurfBase) => {
    await axios.post("/api/turfs", turf).then(eCheck);
  };
  return useMutation({
    mutationFn: createTurf,
    mutationKey: ["createTurf"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["turfs"],
      });
      toast.success("Turf created successfully");
    },
  });
};
export const useGetAllTurfs = () => {
  return useQuery({
    queryKey: ["turfs"],
    queryFn: async () => axios.get("/api/turfs/all").then(eCheck),
  });
};
//get a turf by _id
export const useGetTurf = (_id: string) => {
  return useQuery<ITurfFetched>({
    queryKey: ["turf", _id],
    queryFn: async () => axios.get(`/api/turfs?_id=${_id}`).then(eCheck),
  });
};
//get all turfs by owner
export const useGetAllTurfsByOwner = (owner: string) => {
  return useQuery<ITurfFetched[]>({
    queryKey: ["turfs", owner],
    queryFn: async () =>
      axios.get(`/api/turfs/all?owner=${owner}`).then(eCheck),
  });
};
//update a turf
export const useUpdateTurf = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      turf: Partial<ITurfFetched> & {
        _id: string;
      }
    ): Promise<ITurfFetched> => {
      return await axios.put("/api/turfs", turf).then(eCheck);
    },
    mutationKey: ["updateTurf"],
    onSuccess: (turf) => {
      console.log(turf);
      queryClient.invalidateQueries({
        // queryKey: ["turf", turf._id],
      });
    },
  });
};
//use delete turf
export const useDeleteTurf = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      return await axios.delete(`/api/turfs?_id=${_id}`).then(eCheck);
    },
    mutationKey: ["deleteTurf"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["turfs"],
      });
    },
  });
};
