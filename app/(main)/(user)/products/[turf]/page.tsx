"use client";
import React from "react";
import { CustomBredcrumb } from "@/components/utils/atoms";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoDotFill } from "react-icons/go";
import { Turf_Book } from "@/components/turf/book";
import { useGetTurf, useUpdateTurf } from "@/utils/hooks/useTurf";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ITurfFetched } from "@/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { EditGeneralInfo } from "@/components/turf/edit-general-info";
import { EditThumbnail } from "@/components/turf/edit-thumbnail";
import { deleteFile, useCustomToast } from "@/components/helpers/functions";
import { EditMedia } from "@/components/turf/edit-media";

const Turf = ({
  params,
}: {
  params: {
    turf: string;
  };
}) => {
  const { data: turf } = useGetTurf(params.turf);
  if (!turf) return <div>Loading...</div>;
  return (
    <div className="pxs fx-c gap-10 py-5">
      <div className="flex">
        <Link href="/products" className="text-sm fc">
          <FaArrowLeftLong className="mr-2" />
          <span>Back To Products</span>
        </Link>
      </div>
      <div className="fx-c gap-5">
        <div className="flex gap-5 flex-col md:flex-row w-full">
          <div className="fx-c flex-[2] gap-5">
            <GeneralInfo product={turf} />
          </div>
          <div className="fx-c flex-1 gap-5">
            <Tumbnail product={turf} />
            <Media product={turf} />
          </div>
        </div>
      </div>
    </div>
  );
};
const GeneralInfo = ({ product }: { product: ITurfFetched }) => {
  return (
    <Card className="w-full ">
      <CardHeader className="mb:p-4">
        <div className="fb">
          <h4 className="h3 text-foreground">{product.title}</h4>
          <div className="fc">
            <Button variant="ghost" className="flex">
              <GoDotFill className="mr-2 text-indigo" />
              {product.status}
            </Button>
            <EditGeneralInfo product={product} />
          </div>
        </div>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="fx-c gap-4 w-full ">
        <h4 className="h4">Details</h4>
        <div className="fx-c gap-5 w-full">
          <div className="fb w-full">
            <h5 className="p">Price:</h5>
            <span>
              <span className="text-foreground">ksh</span> {product.dailyRate}
            </span>
          </div>
          <div className="fb w-full">
            <h5 className="p">Size:</h5>
            <span>{product.size}</span>
          </div>
          <div className="fb w-full">
            <h5 className="p">County:</h5>
            <span>{product.county}</span>
          </div>

          <div className="fb w-full">
            <h5 className="p">Location:</h5>
            <span>{product.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Tumbnail = ({ product }: { product: ITurfFetched }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="fb">
          <CardTitle>Thumbnail</CardTitle>
          <div className="flex gap-1">
            <EditThumbnail product={product} />
          </div>
        </div>
        <CardDescription className="pt-5">
          <Image
            src={product.thumbnail}
            width={200}
            height={200}
            alt="Image"
            className="w-16 object-cover  rounded-lg"
          />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
const Media = ({ product }: { product: ITurfFetched }) => {
  const { mutateAsync } = useUpdateTurf();
  const { customToast, loading } = useCustomToast();
  const deleteMedia = (url: string) => async () => {
    customToast({
      func: async () => {
        await deleteFile(url);
        await mutateAsync({
          _id: product._id,
          images: product.images?.filter((item) => item !== url),
        });
      },
    });
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="fb">
          <CardTitle>Media</CardTitle>
          <div className="flex gap-1">
            <EditMedia product={product} />
          </div>
        </div>
        <CardDescription className="flex flex-wrap pt-5  gap-2">
          {product.images &&
            product.images?.map((item) => (
              <div className="relative" key={item}>
                <div className="absolute top">
                  <Button
                    size={"icon"}
                    variant={"destructive"}
                    className="h-4 w-4"
                    disabled={loading}
                  >
                    <X className="h-3" onClick={deleteMedia(item)} />
                  </Button>
                </div>
                <Image
                  src={item}
                  width={200}
                  height={200}
                  alt="Image"
                  className="w-16 object-cover  rounded-lg"
                />
              </div>
            ))}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
export default Turf;
