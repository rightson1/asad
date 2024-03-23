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
import { IOrderBase, IOrderFetched, ITurfFetched } from "@/types";
import { useUser } from "@/utils/authContextUser";
import toast from "react-hot-toast";
import { useCreateOrder } from "@/utils/hooks/useOrder";
import { useCustomToast } from "../helpers/functions";
import { db } from "@/utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
export const Turf_Book = ({ turf }: { turf: ITurfFetched }) => {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const { fUser, user } = useUser();
  const [total, setTotal] = React.useState<number>(0);
  const { mutateAsync: createOrder } = useCreateOrder();
  const { customToast, loading } = useCustomToast();
  const [rate, setRate] = React.useState<IOrderFetched["rate"]>("dailyRate");
  const [date, setDate] = React.useState<Date>();
  const [startTime, setStartTime] = React.useState<string>();
  const [endTime, setEndTime] = React.useState<string>();
  useEffect(() => {
    let total = 0;
    if (rate == "hourlyRate" && date) {
      //date and time should not be in the past
      console.log({
        date,
        newDate: new Date(),
        dateDiff: date && date < new Date(),
      });
      if (date && date < new Date()) {
        toast.error("Date should not be in the past");
        setDate(undefined);
      }
      if (startTime && endTime && date) {
        let hourDiff =
          Number(endTime.split(":")[0]) - Number(startTime.split(":")[0]);

        if (hourDiff < 0) {
          toast.error("End time should be greater than start time");
        } else {
          total = hourDiff * turf.hourlyRate;
        }
      }
    } else if (startDate && endDate) {
      //startdate or endate should not be in the past
      if (startDate < new Date() || endDate < new Date()) {
        toast.error("Date should not be in the past");
        setStartDate(undefined);
        setEndDate(undefined);
      }
      const days =
        Math.abs(endDate.getTime() - startDate.getTime()) /
          (1000 * 60 * 60 * 24) +
        1;
      total = days * turf.dailyRate;
    }
    setTotal(total);
  }, [startDate, endDate, startTime, endTime, rate, date]);
  const bookTurf = async () => {
    if (!fUser) {
      toast.error("You need to login to book a turf");
      return;
    }
    if (rate == "dailyRate" && (!startDate || !endDate)) {
      toast.error("Please select the dates");
      return;
    } else if (rate == "hourlyRate" && (!startTime || !endTime)) {
      toast.error("Please select the time");
      return;
    }
    //check is date makes sense, like the end date should be greater than the start date, and the end time should be greater than the start time
    //also not previus dates

    const timeDetails =
      rate == "hourlyRate"
        ? {
            startTime,
            endTime,
            date,
          }
        : {
            startDate,
            endDate,
          };
    const order: IOrderBase = {
      turf: turf._id,
      user: user._id,
      owner: turf.owner,
      ...timeDetails,
      rate,
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
  const CustomCalender = ({
    title,
    date,
    setDate,
  }: {
    title: string;
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  }) => {
    return (
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="dates">{title}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    );
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
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="county">County</Label>
              <Select
                name="county"
                required
                value={rate}
                onValueChange={(value) =>
                  setRate(value as IOrderFetched["rate"])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select County" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Counties</SelectLabel>

                    <SelectItem value={"hourlyRate"} className="capitalize">
                      Hourly Rate
                    </SelectItem>
                    <SelectItem value={"dailyRate"} className="capitalize">
                      Daily Rate
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {rate === "hourlyRate" ? (
              <>
                {" "}
                <CustomCalender
                  title="Rent Date"
                  date={date}
                  setDate={setDate}
                />
                {/* time picker */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="time">Start Time</Label>
                  <Input
                    type="time"
                    name="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="time">Return Time</Label>
                  <Input
                    type="time"
                    name="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                {" "}
                <CustomCalender
                  title="Pickup Date"
                  date={startDate}
                  setDate={setStartDate}
                />
                <CustomCalender
                  title="Return Date"
                  date={endDate}
                  setDate={setEndDate}
                />
              </>
            )}
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
