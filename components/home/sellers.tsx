"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllSellers } from "@/utils/hooks/useUser";
import Image from "next/image";
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
import { CiSearch } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "../ui/button";
import { IUserFetched } from "@/types";
import Link from "next/link";
export const Best_Sellers = () => {
  const { data: sellers, isLoading } = useGetAllSellers();

  return (
    <section className="w-full bg-white pxs py-20">
      <h3 className="h3 py-5">Best Lenders</h3>
      <Seller_Cards isLoading={isLoading} lenders={sellers} />
    </section>
  );
};
export const Seller_Cards = ({
  lenders,
  isLoading,
}: {
  lenders?: IUserFetched[];
  isLoading: boolean;
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        lenders &&
        lenders.map((lender) => (
          <Card className="py-4 bg-transparent" key={lender.displayName}>
            <Link href={`/lenders/${lender._id}`}>
              <CardContent className=" py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl h-[150px]"
                  src={lender.thumbnail || "/images/placeholder.png"}
                  width={270}
                  height={270}
                />
              </CardContent>
              <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{lender.displayName}</h4>
                <p>
                  <span className="font-bold">Location:</span>{" "}
                  {lender.county || "Nairobi"}
                </p>
              </CardFooter>
            </Link>
          </Card>
        ))
      )}
    </div>
  );
};

export const County_Selector = ({
  county,
  setCounty,
}: {
  county: string;
  setCounty: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="items-c gap-2">
          <div className="items-c">
            <FaLocationDot size={16} />
            <h6 className="h6">{county || "Location"}</h6>
          </div>
          <CiSearch size={20} />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="fx-c gap-2">
          <h4 className="h4">{county || "Location"}</h4>
          <Select
            name="county"
            required
            value={county}
            onValueChange={(value) => setCounty(value)}
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
          <div className="flex justify-end">
            <Button size="sm" onClick={() => setCounty("")}>
              Reset
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
