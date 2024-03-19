"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { useUser } from "@/utils/authContextUser";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Navbar = ({ home = false }: { home?: boolean }) => {
  const { handleGoogleLogin, handleSignIn, fUser } = useUser();
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
          {fUser ? (
            <div className="items-c gap-2">
              <Button
                className={` shadow-md 
      ${home ? "text-background bg-black/30" : "text-black"}
      `}
                variant={"ghost"}
              >
                List your Turf
              </Button>
              <Button
                className={` shadow-md
      ${home ? "text-background" : "text-black"}
      `}
                variant={"ghost"}
                size={"icon"}
              >
                <IoIosNotificationsOutline className="text-xl" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="items-c gap-2 px-3">
                    <span
                      className={`
      ${home ? "text-background" : "text-black"}`}
                    >
                      {fUser?.displayName?.split(" ")[0]}
                    </span>
                    <Avatar className="h-[35px] w-[35px]">
                      <AvatarImage
                        sizes="20px"
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="items-c gap-2">
              <Button
                onClick={handleGoogleLogin}
                className={`
      ${home ? "text-background" : "text-black"}
      `}
                variant={"ghost"}
              >
                <CiUser className="text-xl" />
                SIGN IN
              </Button>
              <Button
                variant={"ghost"}
                onClick={handleSignIn}
                className={`
      ${home ? "text-background" : "text-black"}
      `}
              >
                SIGN UP
              </Button>
            </div>
          )}
        </div>
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;
