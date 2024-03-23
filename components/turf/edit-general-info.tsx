"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { InputChangeEventTypes, ITurfFetched } from "@/types";
import toast from "react-hot-toast";
import { useUpdateTurf } from "@/utils/hooks/useTurf";
import { useCustomToast } from "../helpers/functions";
import { CustomModal } from "../helpers/CustomModal";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { kenyanCounties } from "@/utils/data";
export const EditGeneralInfo = ({ product }: { product: ITurfFetched }) => {
  const [values, setValues] = useState<Partial<ITurfFetched>>({
    title: product.title,
    dailyRate: product.dailyRate,
    status: product.status,
    description: product.description,
    county: product.county,
    location: product.location,
    hourlyRate: product.hourlyRate,
  });
  const handleChange = (e: ChangeEvent<InputChangeEventTypes>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { mutateAsync } = useUpdateTurf();
  const { customToast, loading } = useCustomToast();
  const updateGeneralInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customToast({
      func: async () => {
        await mutateAsync({
          _id: product._id,
          ...values,
        });
      },
    });
  };
  return (
    <CustomModal
      title="Edit General Information"
      disableSubmit={loading}
      onSubmit={updateGeneralInfo}
      trigger={
        <Button size="icon" variant={"ghost"}>
          <MdOutlineMoreHoriz className="text-xl" />
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 w-full  gap-4 ">
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="title">Name *</Label>
          <Input
            name="title"
            placeholder="Name of turf"
            required
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="size">Size in Meters *</Label>
          <Input
            name="size"
            placeholder="Width * Height"
            required
            onChange={handleChange}
            value={values.size}
          />
        </div>

        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="dailyRate">Price Per Day *</Label>
          <Input
            name="dailyRate"
            placeholder="Kshs per day"
            type="number"
            required
            onChange={handleChange}
            value={values.dailyRate}
          />
        </div>
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="hourlyRate">Price Per Hour *</Label>
          <Input
            name="hourlyRate"
            placeholder="Kshs per day"
            type="number"
            required
            onChange={handleChange}
            value={values.hourlyRate}
          />
        </div>

        {/* status ,either published or unpublished */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Status</Label>
          <Select
            required
            onValueChange={(value) => {
              setValues((prev) => ({
                ...prev,
                status: value as ITurfFetched["status"],
              }));
            }}
            defaultValue={values.status}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="unpublished">Unpublished</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5 col-span-2">
          <Label htmlFor="county">County</Label>
          <Select
            name="county"
            required
            defaultValue={values.county}
            onValueChange={(value) => {
              setValues((prev) => ({ ...prev, county: value }));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select County" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Counties</SelectLabel>
                {kenyanCounties.map((county, index) => (
                  <SelectItem key={index} value={county}>
                    {county}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* location */}
        <div className="flex flex-col space-y-1.5 col-span-2">
          <Label htmlFor="location">Location *</Label>
          <Textarea
            name="location"
            placeholder="Detailed infomation about location"
            required
            onChange={handleChange}
            value={values.location}
          />
        </div>

        <div className="flex flex-col space-y-1.5 col-span-2">
          <Label htmlFor="Description">Description *</Label>
          <Textarea
            required
            name="description"
            placeholder="Type your description here."
            onChange={handleChange}
            value={values.description}
          />
        </div>
      </div>
    </CustomModal>
  );
};
