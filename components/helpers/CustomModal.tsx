"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { IoClose } from "react-icons/io5";
export const CustomModal = ({
  title,
  children,
  trigger,
  onSubmit,
  modalOpen,
  setModalOpen,
  disableSubmit = false,
}: {
  title: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  trigger: React.ReactNode;
  modalOpen?: boolean;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  disableSubmit?: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(modalOpen || false);
    if (disableSubmit) {
      setOpen(false);
    }
  }, [modalOpen, disableSubmit]);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        // asChild

        className="
        mb:w-[90vw] sm:max-w-[600px]
        "
      >
        <form
          onSubmit={onSubmit}
          className=" mb:max-h-[80vh] 
    max-h-[90vh] rounded-md md:p-4 flex flex-col"
        >
          <DialogHeader className="border-b pb-4">
            <div className="fb">
              <h4 className="h3">{title}</h4>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto flex-grow px-2 py-5">{children}</div>
          <DialogFooter className="border-t pt-4 mb:flex-row mb:justify-end">
            <DialogClose>
              <Button variant="outline" type="button" className="mr-2">
                Close
              </Button>
            </DialogClose>

            <Button disabled={disableSubmit} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
