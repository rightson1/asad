import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
const Navbar = ({ home = false }: { home?: boolean }) => {
  type TLink = {
    link: string;
    name: string;
  };
  const CustomLink = ({ link, name }: TLink) => {
    return (
      <Link
        className={`
      ${home ? "text-background" : "text-black"}
      `}
        href={link}
      >
        {name}
      </Link>
    );
  };
  return (
    <nav className="p-4 md:px-24 w-full flex flex-col gap-3 z-[5] bg-transparent">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-5 items-center ">
          <Image
            className="cursor-pointer h-10"
            src="/logo.svg"
            height={50}
            width={50}
            alt="logo"
          />
          <div className="flex gap-4 items-center">
            <CustomLink link="/" name="Home" />
            <CustomLink link="/turfs" name="Search" />
            <CustomLink link="/lenders" name="Lenders" />
          </div>
        </div>
        <div className="flex">
          <Button
            variant={"ghost"}
            className={`
      ${home ? "text-background" : "text-black"}
      `}
          >
            <CiUser className="text-xl" />
            SIGN IN
          </Button>
          <Button
            variant={"ghost"}
            className={`
      ${home ? "text-background" : "text-black"}
      `}
          >
            SIGN UP
          </Button>
        </div>
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;
