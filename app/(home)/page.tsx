"use client";
import { Best_Sellers } from "@/components/home/sellers";
import { Button } from "@/components/ui/button";
import { useUser } from "@/utils/authContextUser";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div
        className=" text-white w-full h-[calc(100vh+20px)]  p-4 md:px-24 
       relative flex items-center justify-start "
      >
        <div
          className="w-full h-full bg-black opacity-60 z-[-1]
          absolute top-0 left-0 -mt-24
          "
        />

        <Image
          src="/landing_bg.png"
          height={1000}
          width={1000}
          alt="home-bg"
          className="object-cover object-left-top -mt-24 absolute w-full h-full z-[-2] top-0 left-0  "
        />

        <div className="flex flex-col -mt-10 ">
          <div className="flex w-full items-c gap-2">
            <p>Best Turf</p>
            <div className="w-[60px] h-0.5 bg-white my-5" />
          </div>
          <h1 className="text-[70px] font-bold ">NO TURF?</h1>
          <p className="max-w-md">
            {/* turf lending, if you have turf you can list it and users can easily rent */}
            Dont worry, we got you covered. We provide the best turf lending
            services in the country. We have a wide range of turfs available for
            rent. Our turfs are well maintained and are perfect for any
            occasion. Whether you need a turf for a wedding, a party, or any
            other event, we have the perfect turf for you. Contact us today to
            find out more
          </p>
          <Button className="w-[200px] h-[50px] bg-[darkOrange] hover:bg-white text-black mt-5">
            <Link href={`${user ? "/" : "/register"}`}>Get Started</Link>
          </Button>
        </div>
      </div>
      <div className="w-full   grid grid-cols-1 md:grid-cols-3 pxs gap-5 py-20">
        <div className="overflow-hidden w-full h-full col-span-2 max-h-[70vh]">
          <Image
            className="w-full h-full object-cover rounded-md"
            src="/turf_second.png"
            height={500}
            width={500}
            alt="home-bg"
          />
        </div>
        <div className=" bg-[#187174] h-full fx-c w-full gap-5 p-4 text-white rounded-md">
          <h4 className="h3">
            Your have Turf? <br />
            Get the best out of it
          </h4>
          <p className="text-sm">
            Do you have a turf that you are not using? Why not make some extra
            cash by renting it out? We provide a platform where you can list
            your turf and connect with people who are looking to rent a turf.
            Our platform is easy to use and secure, so you can rest assured that
            your turf is in good hands. Contact us today to find out more about
            how you can start renting out your turf and making some extra cash.
          </p>
          <Button className="bg-white text-black">
            <Link href={`${user ? "/" : "/register"}`}> Start Now</Link>
          </Button>
        </div>
      </div>
      <Best_Sellers />
    </main>
  );
}
