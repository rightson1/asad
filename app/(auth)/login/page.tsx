"use client";
import { Input } from "@/components/ui/input";

import React from "react";
import { eCheck, useCustomToast } from "@/components/helpers/functions";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@/utils/authContextUser";

const LOGIN = () => {
  const { customToast, loading } = useCustomToast();
  const { login } = useUser();
  const addAdmin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value.trim() as string;
    const password = e.currentTarget.password.value.trim() as string;
    customToast({
      func: async () => {
        await login({ email, password });
      },
      suc: "Karibu ",
    });
  };
  return (
    <div className="w-full h-screen fc bg-background pxs">
      <div className="flex   w-full h-full mb:max-w-64 md:w-96  flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center w-full ">
          <h1 className="text-3xl font-bold text-primary">Login</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back. Dont have an account?{" "}
            <Link href="/register" className="undeline l-text">
              Register
            </Link>
          </p>
        </div>
        <form
          onSubmit={addAdmin}
          className="flex flex-col items-center justify-center w-full "
        >
          <div className="flex flex-col items-center justify-center w-full"></div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Input
              id="email"
              name="email"
              placeholder="Email "
              className=" border-border"
              required
            />
            <Input
              id="password"
              name="password"
              placeholder="Password "
              className=" border-border"
              required
              type="password"
            />

            <Button disabled={loading}>Submit</Button>
          </div>
          {/* forgot password */}
          <p className="text-sm text-muted-foreground py-2">
            Did someone forget their password?{" "}
            <Link href="/forgot-password" className="undeline l-text ">
              Reset
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LOGIN;
