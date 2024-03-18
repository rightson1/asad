import React from "react";
import { CustomBredcrumb } from "@/components/utils/atoms";
import { Card, CardContent } from "@/components/ui/card";

import { Turf_Book } from "@/components/turf/book";

const Turf = () => {
  return (
    <div className="pxs fx-c gap-10">
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
          <h3 className="h3">Turfs</h3>
        </div>
      </div>
      <div className="flex gap-10">
        <Card className=" flex-[3] h-[350px] ">
          <CardContent className="flex h-full   items-center justify-center">
            <span className="text-4xl font-semibold">2</span>
          </CardContent>
        </Card>

        <div className="w-full flex-[2] gap-5 flex flex-wrap items-center justify-center">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card className=" h-[162px] w-full max-w-[150px]" key={index}>
              <CardContent className="flex h-full  items-center justify-center ">
                <span className="text-4xl font-semibold">1</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex gap-10 w-full">
        <div className=" flex-[3]"></div>
        <Turf_Book />
      </div>
    </div>
  );
};

export default Turf;
