"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { storage } from "@/utils/firebase";
import { AxiosResponse } from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
export const useCustomToast = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const customToast = ({
    func,
    sfunc,
    loading,
    suc,
    err,
    efunc,
  }: {
    func: () => Promise<any>;
    sfunc?: () => void;
    loading?: string;
    suc?: string;
    err?: string;
    efunc?: (() => Promise<void>) | (() => void);
  }) => {
    setModalOpen(true);
    setLoading(true);
    return toast.promise(
      func()
        .then((res) => {
          const data = res?.data;
          if (data && data.success === false) {
            throw new Error(data.message);
          }
          setLoading(false);
          setModalOpen(false);
          if (sfunc) sfunc();
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
          if (efunc) efunc();
          throw e;
        }),

      {
        loading: loading || "Loading...",
        success: suc || "Success",
        error: (e) => {
          setTimeout(() => {
            toast.dismiss();
          }, 3000);
          return e.message || err || "An error occurred";
        },
      }
    );
  };
  return { customToast, loading, modalOpen, setModalOpen };
};
export const eCheck = (res: AxiosResponse<any, any>) => {
  const data = res.data;
  if (data && data.success === false) {
    throw new Error(data.message);
  }
  return data;
};
export const uploadFile = (file: File, name: string) => {
  const fileRef = ref(storage, `/${name}-${Math.floor(Math.random() * 1000)}`);
  return uploadBytes(fileRef, file)
    .then((res) => getDownloadURL(res.ref))
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
export const deleteFile = async (url?: string) => {
  if (!url) return;
  try {
    const deleteRef = ref(storage, url);
    await deleteObject(deleteRef).then(() => {
      return true;
    });
  } catch (err) {
    console.log(err);
    return true;
  }
};
export function vArr<T>(value: T[] | T | undefined): value is T[] {
  if (typeof value === "undefined") {
    return false;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return false;
}
export function _date(dateString: Date) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  const year = String(date.getFullYear()).slice(-2); // Get last two digits of year
  return `${day}/${month}/${year}`;
}
