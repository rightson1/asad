"use client";
import React from "react";
import { CustomBredcrumb } from "@/components/utils/atoms";
import { Card, CardContent } from "@/components/ui/card";

import { Turf_Book } from "@/components/turf/book";
import { useGetTurf } from "@/utils/hooks/useTurf";
import Image from "next/image";

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
      <div className="flex justify-between mt-5 ">
        <div className="fx-c gap-1">
          <CustomBredcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Turfs", href: "/turfs" },
              {
                label: "Blue Turf",
                href: "/turfs/blue-turf",
              },
            ]}
          />
          <h3 className="h3">{turf.title}</h3>
        </div>
      </div>
      <div className="flex gap-10">
        <Card className=" flex-[3] h-[350px] p-0 ">
          <CardContent className="flex h-full w-full p-1    items-center justify-center">
            <Image
              src={turf.thumbnail}
              alt={turf.title}
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-md"
            />
          </CardContent>
        </Card>

        <div className="w-full flex-[2] gap-5 flex flex-wrap items-center justify-center">
          {turf.images.map((url, index) => (
            <Card className=" h-[162px] w-full max-w-[150px]" key={index}>
              <CardContent className="flex h-full w-full p-1    items-center justify-center">
                <Image
                  src={url}
                  alt={turf.title}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-md"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex gap-10 w-full">
        <div className=" flex-[3] fx-c gap-4">
          <div className="fb">
            <h4 className="h4">{turf.title}</h4>
            <h6 className="h6">Ksh {turf.dailyRate} per Day</h6>
          </div>
          <p>{turf.description}</p>
          <div className="fx-c">
            <h6 className="h6">County</h6>
            <p>{turf.county}</p>
          </div>
          <div className="fx-c">
            <h6 className="h6">Location</h6>
            <p>{turf.location}</p>
          </div>
        </div>
        <Turf_Book turf={turf} />
      </div>
    </div>
  );
};

export default Turf;
