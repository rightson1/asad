import React from "react";
import { ThemeProvider } from "next-themes";
export const Client = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
      forcedTheme="light"
    >
      {children}
    </ThemeProvider>
  );
};
