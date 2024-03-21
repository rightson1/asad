"use client";
import { Button } from "@/components/ui/button";

import { IoMdNotificationsOutline } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { INotification, INotificationFetched } from "@/types";
import { format } from "timeago.js";
import { useUser } from "@/utils/authContextUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { vArr } from "../helpers/functions";
import Link from "next/link";

export const Notifications = ({ home }: { home: boolean }) => {
  const [notifications, setNotifications] = useState<INotificationFetched[]>(
    []
  );
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "notifications"),
      where("to", "==", user._id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedNotifications = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as INotificationFetched)
      );
      setNotifications(updatedNotifications);
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (open) {
      const update = async () => {
        if (notifications.length > 0) {
          const unseenNotifications = notifications.filter(
            (notification) => !notification.read
          );
          if (unseenNotifications.length > 0) {
            const unseenNotificationIds = unseenNotifications.map(
              (notification) => notification.id
            );
            await Promise.all(
              unseenNotificationIds.map(async (id) => {
                await updateDoc(doc(db, "notifications", id), {
                  read: true,
                });
              })
            );
          }
        }
      };
      update();
    }
  }, [open, notifications]);
  return (
    <DropdownMenu open={open} onOpenChange={(open) => setOpen(open)}>
      <DropdownMenuTrigger asChild>
        <Button
          className={` shadow-md hover:bg-background
      ${home ? "text-background" : "text-black"}
      `}
          variant={"ghost"}
          size={"icon"}
        >
          <div className="relative">
            <IoMdNotificationsOutline
              className={`text-2xl
      ${home ? "text-background" : "text-black"}
      `}
            />
            {vArr(notifications) &&
              notifications.filter((n) => {
                return !n.read;
              }).length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {
                    notifications.filter((n) => {
                      return !n.read;
                    }).length
                  }
                </span>
              )}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[300px] p-4">
        <div className="fx-c mt-5">
          {notifications.map((notification, i) => (
            <Link
              href={`/orders`}
              className=" flex gap-4  w-full py-4 bc border-b"
              key={i}
            >
              <div className="fx-c gap-2 ">
                <div className="fb w-full ">
                  <h6 className="h6">
                    {notification.type === "order" ? "Order" : "Message"}
                  </h6>
                  <h6 className="h6">
                    {format(notification.createdAt)}
                    <div className="w-2 h-2 rounded-full bg-blue-500 inline-block ml-2"></div>
                  </h6>
                </div>
                <p className="text-sm font-[300]">{notification.message}</p>
              </div>
            </Link>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
