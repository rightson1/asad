"use client";
import React, { useEffect } from "react";
import { loadingMessages } from "@/app/loadingMessage";
const LoadingRandomMessage = () => {
  const [loadingMessage, setLoadingMessage] = React.useState<
    string | undefined
  >("");
  useEffect(() => {
    const randomMessage =
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setLoadingMessage(randomMessage);
  }, []);
  return (
    <div className="main-h  py-10 fx-col-c gap-5 relative">
      <span className="loader"></span>
      <p className="pxs text-center">
        {loadingMessage || "Cooking Something..."}
      </p>
    </div>
  );
};

export default LoadingRandomMessage;
