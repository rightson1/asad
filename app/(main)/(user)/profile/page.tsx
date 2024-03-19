"use client";
import { useUser } from "@/utils/authContextUser";
import { Mail, Power } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SingleImageInputWithView } from "@/components/utils/image_inputs";
import {
  deleteFile,
  uploadFile,
  useCustomToast,
} from "@/components/helpers/functions";
import { useUpdateUser } from "@/utils/hooks/useUser";
import { IUserFetched } from "@/types";
import { kenyanCounties } from "@/utils/data";
const Profile = () => {
  const { user, logout, fetchUser } = useUser();
  const [thumbnail, setThumbnail] = React.useState<File | null>(null);
  const { loading, customToast } = useCustomToast();
  const { mutateAsync: editUser } = useUpdateUser();
  const [values, setValues] = React.useState({
    displayName: user.displayName,
    isSeller: user.isSeller || false,
    county: user.county || "",
  });
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let pUrl = "";
    let old_profile = user.thumbnail;

    customToast({
      func: async () => {
        if (thumbnail) {
          pUrl = await uploadFile(
            thumbnail,
            `/${user._id}/profile/${thumbnail.name}`
          );
        }

        await editUser({
          ...values,
          _id: user._id,
          thumbnail: pUrl || old_profile,
        });
        fetchUser(user.uid);
      },
      suc: "updated successfully",
      err: "An error occurred",
      sfunc: async () => {
        thumbnail && (await deleteFile(old_profile));
        setThumbnail(null);
      },
      efunc: async () => {
        thumbnail && (await deleteFile(pUrl));
      },
    });
  };
  return (
    <form
      onSubmit={submit}
      className="min-h-screen relative pxs overflow-hidden"
    >
      <div className="relative fx-c justify-center items-center gap-3 w-full py-20 ">
        <Avatar>
          <AvatarImage
            src={user.thumbnail || "https://github.com/shadcn.png"}
            alt="@shadcn"
          />
          <AvatarFallback>
            {user.displayName?.charAt(0).toUpperCase() || "S"}
          </AvatarFallback>
        </Avatar>
        <h1 className="h1 text-default-500">{user.displayName}</h1>
        <h5 className="h5 text-default-500 fx-center gap-2 items-c">
          <Mail size={25} />
          {user.email || "No School Added"}
        </h5>
        <div className="flex gap-1">
          <Button size="sm" onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </div>
      <div className="fx-col gap-5">
        <h3 className="h3 my-3">Edit</h3>
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <Label htmlFor="displayName">Name</Label>
            <Input
              placeholder="Name"
              id="displayName"
              value={values.displayName}
              onChange={(e) =>
                setValues({ ...values, displayName: e.target.value })
              }
            />
          </div>
          <div className="">
            <Label htmlFor="seller">Seller</Label>
            <Select
              value={values.isSeller ? "true" : "no"}
              onValueChange={(value) =>
                setValues({
                  ...values,
                  isSeller: value === "true" ? true : false,
                })
              }
            >
              <SelectTrigger id="seller">
                <SelectValue placeholder="Are you a seller" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="county">County</Label>
            <Select
              name="county"
              required
              defaultValue={values.county}
              onValueChange={(value) => {
                setValues((prev) => ({ ...prev, county: value }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select County" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Counties</SelectLabel>
                  {kenyanCounties.map((county, index) => (
                    <SelectItem key={index} value={county}>
                      {county}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <Label htmlFor="thumbnail">Thumbnails</Label>
            <SingleImageInputWithView
              imageUrl={user.thumbnail}
              file={thumbnail}
              setFile={setThumbnail}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end my-5 ">
        <Button>Save</Button>
      </div>
    </form>
  );
};

export default Profile;
