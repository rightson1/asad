"use client";
import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useUser } from "@/utils/authContextUser";

export default function AuthModal() {
  const { modalOpen, setModalOpen, handleGoogleLogin, handleSignIn } =
    useUser();
  const [type, setType] = useState<"login" | "signup">("login");
  console.log(modalOpen);
  return (
    <>
      <div className="items-center justify-center ">
        <Dialog open={modalOpen} onOpenChange={(open) => setModalOpen(open)}>
          <DialogContent>
            <>
              {type === "login" ? (
                <>
                  <DialogTitle className="flex mt-5 flex-col gap-1">
                    <h1 className="flex justify-center h2-style">
                      Welcome Back
                    </h1>
                  </DialogTitle>
                  <DialogDescription className="py-5">
                    <div className="fx-col-c gap-5">
                      <div className="flex">
                        <button className="w-full" onClick={handleGoogleLogin}>
                          Login with Google
                        </button>
                      </div>
                      <div className="fx-center">
                        <p className="text-sm opacity-70 w-3/4 text-center ">
                          Login with Google to access your account and manage
                          your order and services.
                        </p>
                      </div>
                    </div>
                  </DialogDescription>
                  <DialogFooter>
                    Dont have an account?{" "}
                    <button
                      className="underline"
                      onClick={() => setType("signup")}
                    >
                      Signup
                    </button>
                  </DialogFooter>
                </>
              ) : (
                <>
                  <DialogHeader className="flex mt-5 flex-col gap-1">
                    <h1 className="flex justify-center h2-style">
                      Create an Account
                    </h1>
                  </DialogHeader>
                  <DialogDescription className="py-5">
                    <div className="fx-col-c gap-5">
                      <div className="flex">
                        <Button
                          className="w-full"
                          color="success"
                          onClick={handleSignIn}
                        >
                          Sign in with Google
                        </Button>
                      </div>
                      <div className="fx-center">
                        <p className="text-sm opacity-70 w-3/4 text-center ">
                          Sign in with Google to access your account and manage
                          your orders and services.
                        </p>
                      </div>
                    </div>
                  </DialogDescription>
                  <DialogFooter>
                    Already have an account?{" "}
                    <button
                      className="underline"
                      onClick={() => setType("login")}
                    >
                      Login
                    </button>
                  </DialogFooter>
                </>
              )}
            </>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
