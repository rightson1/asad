"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline, MdEdit, MdOutlineMoreHoriz } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  deleteFile,
  uploadFile,
  useCustomToast,
} from "@/components/helpers/functions";
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
import { ImageInput, ImageInputWithView } from "../utils/image_inputs";
import { InputChangeEventTypes } from "@/types";
import { useCreateTurf } from "@/utils/hooks/useTurf";
import { useUser } from "@/utils/authContextUser";
export const List_Turf = ({ trigger }: { trigger: React.ReactNode }) => {
  const { loading, customToast, modalOpen, setModalOpen } = useCustomToast();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const { user } = useUser();

  const { mutateAsync: addTurf } = useCreateTurf();
  const [images, setImages] = useState<File[]>([]);
  const [values, setValues] = useState({
    title: "",
    size: "",
    county: "",
    location: "",
    description: "",
    status: "",
    dailyRate: "",
    hourlyRate: "",
  });
  const edit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let thumbnailUrl = "";
    let imagesUrl: string[] = [];

    customToast({
      func: async () => {
        if (thumbnail) {
          thumbnailUrl = await uploadFile(
            thumbnail,
            `turf/thumbnail/${values.title + Date.now()}`
          );
        }
        if (images.length > 0) {
          imagesUrl = await Promise.all(
            images.map(async (image) => {
              return await uploadFile(
                image,
                `turf/images/${values.title + Date.now()}`
              );
            })
          );
        }
        const data = {
          ...values,
          dailyRate: parseInt(values.dailyRate),
          hourlyRate: parseInt(values.hourlyRate),
          thumbnail: thumbnailUrl,
          images: imagesUrl,
          owner: user._id,
          status: values.status as "published" | "unpublished",
        };
        await addTurf(data);
      },
      suc: "Turf added successfully",
      err: "Failed to add turf",
      efunc: async () => {
        if (thumbnailUrl) {
          await deleteFile(thumbnailUrl);
        }
        if (imagesUrl.length > 0) {
          await Promise.all(
            imagesUrl.map(async (url) => {
              await deleteFile(url);
            })
          );
        }
      },
    });
  };
  const handleChange = (e: React.ChangeEvent<InputChangeEventTypes>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <CustomModal
      title="List a Turf"
      onSubmit={edit}
      disableSubmit={loading}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      trigger={trigger}
    >
      <div className="grid md:grid-cols-1 w-full  gap-4 py-5">
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="title">Name *</Label>
          <Input
            name="title"
            placeholder="Name of turf"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="size">Size in Meters *</Label>
          <Input
            name="size"
            placeholder="Width * Height"
            required
            onChange={handleChange}
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
          />
        </div>
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="dailyRate">Price Per Hour *</Label>
          <Input
            name="hourlyRate"
            placeholder="Kshs per day"
            type="number"
            required
            onChange={handleChange}
          />
        </div>

        {/* status ,either published or unpublished */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Status</Label>
          <Select
            required
            onValueChange={(value) => {
              setValues((prev) => ({ ...prev, status: value }));
            }}
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
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="county">County</Label>
          <Select
            name="county"
            required
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
          />
        </div>

        <div className="flex flex-col space-y-1.5 col-span-2">
          <Label htmlFor="Description">Description *</Label>
          <Textarea
            required
            name="description"
            placeholder="Type your description here."
            onChange={handleChange}
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <ImageInputWithView file={thumbnail} setFile={setThumbnail} />
        </div>
        <div className="col-span-2">
          <Label htmlFor="thumbnail">Images</Label>
          <ImageInputWithView
            files={images}
            setFiles={setImages}
            multiple={true}
          />
        </div>
      </div>
    </CustomModal>
  );
};
