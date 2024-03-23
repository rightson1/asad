import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IOrderFetched } from "@/types";
import { Edit } from "lucide-react";
import { format } from "timeago.js";
import { _date, useCustomToast } from "../helpers/functions";
import { useState } from "react";
import { useEditOrder } from "@/utils/hooks/useOrder";

export function View_Order({ order }: { order: IOrderFetched }) {
  const [status, setStatus] = useState(order.status);
  const { mutateAsync } = useEditOrder();
  const { customToast } = useCustomToast();
  const Field = ({ name, value }: { name: string; value: string }) => {
    return (
      <div className="fb w-full">
        <span className="font-semibold">{name}:</span>
        <span className="text-sm ">{value}</span>
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size="sm">
          <Edit size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order</DialogTitle>
          <DialogDescription>
            Make changes here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Field name="User" value={order.user.displayName} />

          <Field name="Turf" value={order.turf.title} />
          {order.startDate && order.endDate && (
            <>
              {" "}
              <Field name="Start Date" value={_date(order.startDate)} />
              <Field name="End Date" value={_date(order.endDate)} />
            </>
          )}
          {order.date && <Field name="Date" value={_date(order.date)} />}
          {/* start time end time */}
          {order.startTime && order.endTime && (
            <>
              <Field name="Start Time" value={order.startTime} />
              <Field name="End Time" value={order.endTime} />
            </>
          )}
          <Field name="Total Price" value={`KSH ${order.totalPrice}`} />
          <div className="fb w-full ">
            <span className="font-semibold">Status:</span>
            <select
              className="p-1 rounded-md outline-none"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as IOrderFetched["status"])
              }
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              type="submit"
              onClick={() => {
                customToast({
                  func: async () =>
                    await mutateAsync({
                      status,
                      _id: order._id,
                    }),
                });
              }}
            >
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
