"use client";
import LoadingRandomMessage from "@/components/utils/LoadingRandomMessage";
import { useUser } from "@/utils/authContextUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, fUser } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!fUser) {
      router.push("/");
    }
  }, [fUser, router]);

  if (!user) {
    return <LoadingRandomMessage />;
  }
  return children;
}
