import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IUser, IUserFetched } from "@/types";
import toast from "react-hot-toast";
import { eCheck } from "@/components/helpers/functions";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (
      user: Partial<IUser> & {
        _id: string;
      }
    ) => axios.put("/api/users", user),
    onError: (error) => toast.error(error.message),
  });
};
//get all users who are sellers

export const useGetAllSellers = () => {
  return useQuery<IUserFetched[]>({
    queryKey: ["sellers"],
    queryFn: () => axios.get("/api/users/all").then(eCheck),
  });
};
//user by _id
export const useGetUser = (_id: string) => {
  return useQuery<IUserFetched>({
    queryKey: ["user", _id],
    queryFn: () => axios.get(`/api/users?_id=${_id}`).then(eCheck),
  });
};
