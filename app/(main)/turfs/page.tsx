"use client";
import React, { useEffect } from "react";
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
import Link from "next/link";
import { useGetAllTurfs } from "@/utils/hooks/useTurf";
import { ITurfFetched } from "@/types";
import { County_Selector } from "@/components/home/sellers";
const Page = () => {
  const { data, isLoading } = useGetAllTurfs();
  const [turfs, setTurfs] = React.useState<ITurfFetched[]>([]);
  const [search, setSearch] = React.useState("");
  const [county, setCounty] = React.useState("");

  useEffect(() => {
    if (data) {
      setTurfs(data);
    }
  }, [data]);
  //filter by search
  useEffect(() => {
    if (search.length > 0) {
      const filtered = turfs.filter((turf) => {
        return turf.title.toLowerCase().includes(search.toLowerCase());
      });
      setTurfs(filtered);
    } else {
      data && setTurfs(data);
    }
  }, [search]);
  useEffect(() => {
    if (county) {
      const filtered = turfs.filter((turf) => {
        return turf.county === county;
      });
      setTurfs(filtered);
    } else {
      data && setTurfs(data);
    }
  }, [county]);

  return (
    <div className="pxs">
      <div className="flex justify-between mt-5 ">
        <div className="fx-c gap-1">
          <div className="items-c">
            <CiHome />
            <FaAngleRight />
            <span>Home</span>
            <FaAngleRight />
            <span>Turfs</span>
          </div>
          <h3 className="h3">Turfs</h3>
        </div>
        <div className="p-1 rounded-md border-border border-[1px] flex gap-2 h-[50px]">
          <input
            type="text"
            className="bg-transparent outline-none h-full p-4"
            placeholder="Search for Turfs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Separator orientation="vertical" />
          <County_Selector county={county} setCounty={setCounty} />
        </div>
      </div>
      <div className="py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            turfs &&
            turfs.map((product) => (
              <Card className="py-4 shadow-md" key={product.title}>
                <Link href={`/turfs/${product._id}`}>
                  <CardContent className=" py-2">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl h-[150px]"
                      src={product.thumbnail}
                      width={270}
                      height={270}
                    />
                  </CardContent>
                  <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">{product.title}</h4>
                    <p>
                      <span className="font-bold">Location:</span>
                      {product.county || "Nairobi"}
                    </p>
                  </CardFooter>
                </Link>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
