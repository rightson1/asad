import React from "react";
import { CiHome } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { FaLocationDot } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
const Page = () => {
  return (
    <div className="pxs">
      <div className="flex justify-between mt-5 ">
        <div className="fx-c gap-1">
          <div className="items-c">
            <CiHome />
            <FaAngleRight />
            <span>Home</span>
            <FaAngleRight />
            <span>Lenders</span>
          </div>
          <h3 className="h3">Lenders</h3>
        </div>
        <div className="p-1 rounded-md border-border border-[1px] flex gap-2 h-[50px]">
          <input
            type="text"
            className="bg-transparent outline-none h-full p-4"
            placeholder="Search for Lenders"
          />
          <Separator orientation="vertical" />
          <div className="items-c gap-2">
            <div className="items-c">
              <FaLocationDot size={16} />
              <h6 className="h6">Location</h6>
            </div>
            <CiSearch size={20} />
          </div>
        </div>
      </div>
      <div className="py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {Array(10)
            .fill(0)
            .map((product) => (
              <Card
                className="py-4 shadow-md"
                key={product.name}
                //   as={Link}
                //   href={`/categories/${product.slug}`}
              >
                <CardContent className=" py-2">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl h-[150px]"
                    src={`/turf_second.png`}
                    width={270}
                    height={270}
                  />
                </CardContent>
                <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">{`Kinyanjui`}</h4>
                  <p>
                    <span className="font-bold">Location:</span> Nairobi
                  </p>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
