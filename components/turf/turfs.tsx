import { ITurfFetched } from "@/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
export const Turfs_Cards = ({
  turfs,
  isLoading,
}: {
  turfs?: ITurfFetched[];
  isLoading: boolean;
}) => {
  return (
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
  );
};
