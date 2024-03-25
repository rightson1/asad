"use client";
import { Input } from "@/components/ui/input";
import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useCustomToast } from "@/components/helpers/functions";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { auth } from "@/utils/firebase";

const LOGIN = () => {
  const { customToast, loading } = useCustomToast();
  const addAdmin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value.trim() as string;
    customToast({
      func: async () => {
        await sendPasswordResetEmail(auth, email);
      },
      suc: "Check your email for a password reset link.",
    });
  };
  return (
    <div className="w-full h-screen fc bg-background pxs">
      <div className="flex   w-full h-full mb:max-w-64 md:w-96  flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center w-full ">
          <h1 className="text-3xl font-bold text-primary ">Forgot Password</h1>
          <p className="text-sm text-muted-foreground">
            Or you just remembered your password?{" "}
            <Link href="/login" className="l-text">
              Login
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
              className="bg-muted border-border"
              required
            />
            <Button disabled={loading}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LOGIN;
