"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, DragEvent, SetStateAction } from "react";
import { FaMinus } from "react-icons/fa";
interface MultipleImageInputProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  multiple: true;
}

interface SingleImageInputProps {
  file: File | null;
  setFile: React.Dispatch<SetStateAction<File | null>>;
  multiple?: false;
}

type ImageInputProps = MultipleImageInputProps | SingleImageInputProps;

export const ImageInput = (props: ImageInputProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.multiple) {
      props.setFiles(Array.from(event.target.files || []));
    } else {
      props.setFile(event.target.files?.[0] || null);
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();

    if (event.dataTransfer.items) {
      if (props.multiple) {
        let newFiles: File[] = [];
        for (var i = 0; i < event.dataTransfer.items.length; i++) {
          if (event.dataTransfer.items[i].kind === "file") {
            var file = event.dataTransfer.items[i].getAsFile();
            if (file) newFiles.push(file);
          }
        }
        props.setFiles(newFiles);
      } else {
        for (var i = 0; i < event.dataTransfer.items.length; i++) {
          if (event.dataTransfer.items[i].kind === "file") {
            var file = event.dataTransfer.items[i].getAsFile();
            props.setFile(file);
            break; // Only take the first file
          }
        }
      }
    }
  };
  const randomId = Math.random().toString(36).substring(7);

  return (
    <div
      className="border-2 border-dashed rounded-lg
       py-8 p-4 flex flex-col items-center justify-center w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id={randomId}
        onChange={handleFileChange}
        multiple={props.multiple}
      />
      <label
        htmlFor={randomId}
        className="flex flex-col items-center cursor-pointer"
      >
        <p className="p-sm md:max-w-1/2 text-center">
          <span>
            Drop your images here, or{" "}
            <span className="text-violet-500">click to browse</span>
          </span>{" "}
          1200 x 1600 (3:4) recommended, up to 10MB each
        </p>
      </label>
    </div>
  );
};

export const ImageInputWithView = (props: ImageInputProps) => {
  return (
    <div className="fx-c gap-5">
      {props.multiple ? (
        <ImageInput multiple files={props.files} setFiles={props.setFiles} />
      ) : (
        <ImageInput
          multiple={false}
          file={props.file}
          setFile={props.setFile}
        />
      )}
      {props.multiple
        ? props.files.map((file, i) => (
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
                  props.setFiles(props.files.filter((_, index) => index !== i));
                }}
              >
                <FaMinus className="text-destructive text-xl" />
              </Button>
            </div>
          ))
        : props.file && (
            <div className="fb w-full">
              <Image
                src={URL.createObjectURL(props.file)}
                width={200}
                height={200}
                alt="Image"
                className="h-30 object-cover  rounded-lg"
              />
              <Button
                variant="ghost"
                size={"icon"}
                onClick={() => {
                  props.setFile(null);
                }}
              >
                <FaMinus className=" text-xl" />
              </Button>
            </div>
          )}
    </div>
  );
};

export const SingleImageInputWithView = ({
  file,
  setFile,
  imageUrl,
}: {
  file: File | null;
  setFile: React.Dispatch<SetStateAction<File | null>>;
  imageUrl?: string;
}) => {
  return (
    <div className="fx-c gap-5">
      <ImageInput multiple={false} file={file} setFile={setFile} />
      {file ? (
        <div className="fb w-full">
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
              setFile(null);
            }}
          >
            <FaMinus className=" text-xl" />
          </Button>
        </div>
      ) : imageUrl ? (
        <Image
          src={imageUrl}
          unoptimized={true}
          width={200}
          height={200}
          alt="Image"
          className="h-30 object-cover  rounded-lg"
        />
      ) : null}
    </div>
  );
};
