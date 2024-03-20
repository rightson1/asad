"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline, MdEdit, MdOutlineMoreHoriz } from "react-icons/md";
import Image from "next/image";
import { uploadFile, useCustomToast } from "@/components/helpers/functions";
import { useUpdateTurf } from "@/utils/hooks/useTurf";
import { ITurfFetched } from "@/types";
import { CustomModal } from "../helpers/CustomModal";
import { ImageInput } from "../utils/image_inputs";

export const EditMedia = ({ product }: { product: ITurfFetched }) => {
  const [files, setFiles] = useState<File[]>([]);

  const { mutateAsync } = useUpdateTurf();
  const { customToast, loading } = useCustomToast();
  const updateMedia = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let mediaUrls: string[] = [];
    customToast({
      func: async () => {
        mediaUrls = await Promise.all(
          files.map(
            async (file) =>
              await uploadFile(
                file,
                `turf/images/${product.title + Date.now()}`
              )
          )
        );
        await mutateAsync({
          _id: product._id,
          images: [...product.images, ...mediaUrls],
        });
        setFiles([]);
      },
    });
  };
  return (
    <CustomModal
      title="Upload Media"
      disableSubmit={loading}
      trigger={
        <Button variant="outline" size={"icon"}>
          <MdEdit className="" />
        </Button>
      }
      onSubmit={updateMedia}
    >
      <div className="fx-c gap-5 py-5">
        <div className="fx-c">
          <h6 className="h6">Media</h6>
          <p className="p-sm">This will be displayed on the product page</p>
        </div>
        <ImageInput multiple files={files} setFiles={setFiles} />

        {files.map((file, i) => (
          <div className="fb w-full" key={i}>
            <Image
              src={URL.createObjectURL(file)}
              width={200}
              height={200}
              alt="Image"
              className="h-30 object-cover  rounded-lg"
            />
            <Button
              variant="ghost"
              size={"icon"}
              onClick={() => {
                setFiles(files.filter((_, index) => index !== i));
              }}
            >
              <MdDeleteOutline className="text-destructive text-xl" />
            </Button>
          </div>
        ))}
      </div>
    </CustomModal>
  );
};
