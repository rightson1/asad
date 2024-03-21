"use client";
import { Turfs_Cards } from "@/components/turf/turfs";
import { CustomBredcrumb } from "@/components/utils/atoms";
import { IUserFetched } from "@/types";
import { useGetAllTurfsByOwner } from "@/utils/hooks/useTurf";
import { useGetUser } from "@/utils/hooks/useUser";
import { LocateIcon, Map } from "lucide-react";
import React, { useEffect, useState } from "react";

const Page = ({
  params,
}: {
  params: {
    lender: string;
  };
}) => {
  const { data } = useGetUser(params.lender);
  const { data: turfs, isLoading } = useGetAllTurfsByOwner(params.lender);
  const [lender, setLender] = useState<IUserFetched>();
  useEffect(() => {
    if (data) {
      setLender(data);
    }
  }, [data]);
  return (
    <div className="pxs">
      <div className="flex justify-between mt-5 ">
        <div className="fx-c gap-1">
          <CustomBredcrumb
            items={[
              {
                href: "/",
                label: "Home",
              },
              {
                href: "/lenders",
                label: "Lenders",
              },
              {
                href: `/lenders/${lender?._id}`,
                label: `${lender?.displayName || "Loading..."}`,
              },
            ]}
          />
          <h3 className="h3">{lender?.displayName || "Loading..."}</h3>
        </div>
        <div className="rounded-md border-border  flex gap-2 h-[50px]">
          <div className="flex gap-2">
            <LocateIcon />
            {lender?.county || "Loading..."}
          </div>
        </div>
      </div>
      <div className="py-5">
        <Turfs_Cards turfs={turfs} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Page;
