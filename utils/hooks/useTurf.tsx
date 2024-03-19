import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ITurfBase } from "@/types";
import toast from "react-hot-toast";
import { eCheck } from "@/components/helpers/functions";

// Create a turf
export const useCreateTurf = () => {
  const createTurf = async (turf: ITurfBase) => {
    await axios.post("/api/turfs", turf).then(eCheck);
  };
  return useMutation({
    mutationFn: createTurf,
    mutationKey: ["createTurf"],
  });
};
