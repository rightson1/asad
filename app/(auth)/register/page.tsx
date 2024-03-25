"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCustomToast } from "@/components/helpers/functions";
import { IUser } from "@/types";
import axios from "axios";
export default function Create_Seller() {
  const { customToast, loading } = useCustomToast();
  const router = useRouter();
  const addSeller = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const displayName = e.currentTarget.displayName.value as string;
    const email = e.currentTarget.email.value as string;
    const password = e.currentTarget.password.value as string;
    const createAdmin = async () => {
      let id = "";
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim())
        .then(async (userCredential) => {
          const user = userCredential.user;
          const { uid } = user;
          id = uid;
        })
        .catch((error) => {
          const errorMessage = error.message;
          throw new Error(errorMessage);
        });
      {
        const data: IUser = {
          uid: id,
          email: email,
          isSeller: false,
          displayName,
          status: "active",
        };
        await axios.post("/api/users", data);
      }
    };
    customToast({
      func: createAdmin,
      sfunc: () => {
        router.push("/login");
      },
      efunc: () => {
        console.log("error");
      },
    });
  };
  return (
    <form onSubmit={addSeller} className="fc min-h-screen">
      <Card className="w-[90vw] border-none max-w-[500px]">
        <CardHeader>
          <CardTitle>Welcome Aboard</CardTitle>
          <CardDescription>
            Your short on cash, create an account and sell this phone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1  w-full  gap-4">
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="displayName">Name</Label>
              <Input
                id="name"
                required
                placeholder="Name of your Business"
                name="displayName"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Your Email"
                name="email"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Your Password"
                name="password"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="fb">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link className="underline" href="/login">
              Login
            </Link>
          </p>
          <Button type="submit" disabled={loading}>
            Lets Go
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
