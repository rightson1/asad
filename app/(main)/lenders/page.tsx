"use client";
import React, { useEffect } from "react";
import { CiHome } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useGetAllSellers } from "@/utils/hooks/useUser";
import { IUserFetched } from "@/types";
import { County_Selector, Seller_Cards } from "@/components/home/sellers";
const Page = () => {
  const { data, isLoading } = useGetAllSellers();
  const [sellers, setSellers] = React.useState<IUserFetched[]>([]);
  const [search, setSearch] = React.useState("");
  const [county, setCounty] = React.useState("");

  useEffect(() => {
    if (data) {
      setSellers(data);
    }
  }, [data]);
  //filter by search
  useEffect(() => {
    if (search.length > 0) {
      const filtered = sellers.filter((seller) => {
        return seller.displayName.toLowerCase().includes(search.toLowerCase());
      });
      setSellers(filtered);
    } else {
      data && setSellers(data);
    }
  }, [search]);
  useEffect(() => {
    if (county) {
      const filtered = sellers.filter((seller) => {
        return seller.county === county;
      });
      setSellers(filtered);
    } else {
      data && setSellers(data);
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
            <span>Lenders</span>
          </div>
          <h3 className="h3">Lenders</h3>
        </div>
        <div className="p-1 rounded-md border-border border-[1px] flex gap-2 h-[50px]">
          <input
            type="text"
            className="bg-transparent outline-none h-full p-4"
            placeholder="Search for Lenders"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Separator orientation="vertical" />
          <County_Selector county={county} setCounty={setCounty} />
        </div>
      </div>
      <div className="py-10">
        <Seller_Cards isLoading={isLoading} lenders={sellers} />
      </div>
    </div>
  );
};

export default Page;
