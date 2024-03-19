import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IUser, IUserFetched } from "@/types";
import toast from "react-hot-toast";

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
