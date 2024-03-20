"use client";
import React, { use, useEffect } from "react";
import { CustomBredcrumb } from "@/components/utils/atoms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IOrderBase, ITurfFetched } from "@/types";
import { useUser } from "@/utils/authContextUser";
import toast from "react-hot-toast";
import { useCreateOrder } from "@/utils/hooks/useOrder";
import { useCustomToast } from "../helpers/functions";
import { db } from "@/utils/firebase";
import { addDoc, collection } from "firebase/firestore";

export const Turf_Book = ({ turf }: { turf: ITurfFetched }) => {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const { fUser, user } = useUser();
  const [total, setTotal] = React.useState<number>(0);
  const { mutateAsync: createOrder } = useCreateOrder();
  const { customToast, loading } = useCustomToast();
  useEffect(() => {
    if (startDate && endDate) {
      const days =
        Math.abs(endDate.getTime() - startDate.getTime()) /
        (1000 * 60 * 60 * 24);
      const total = days * turf.dailyRate;
      setTotal(total);
    }
  }, [startDate, endDate]);
  const bookTurf = async () => {
    if (!fUser) {
      toast.error("You need to login to book a turf");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Please select the dates");
      return;
    }
    const order: IOrderBase = {
      turf: turf._id,
      user: user._id,
      owner: turf.owner,
      startDate,
      endDate,
      dailyRate: turf.dailyRate,
      totalPrice: total,
      status: "pending",
      payment: "pending",
    };
    const notificationData = {
      subject: "New Order",
      message: `You have a new order from ${user.displayName}`,
      type: "order",
      link: `/orders`,
      from: user._id,
      to: turf.owner,
      read: false,
      createdAt: new Date().toISOString(),
    };
    customToast({
      func: async () => {
        await addDoc(collection(db, "notifications"), notificationData);
        await createOrder(order);
      },
    });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Book Turf</CardTitle>
        <CardDescription>Fill the form below to book a turf</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="dates">Pickup Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Pick a startDate</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="dates">Return Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Pick a endDate</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="fx-c">
              {/* price details */}
              <h6 className="h6">Price Details</h6>
              <div className="fb">
                <p className="font-bold">Total</p>
                <p>Ksh {total}</p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={() => {
            if (!fUser) {
              toast.error("You need to login to book a turf");
            } else {
              bookTurf();
            }
          }}
          disabled={loading}
        >
          Book
        </Button>
      </CardFooter>
    </Card>
  );
};
