import React from "react";
import AsideBar from "./aside-bar";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-dvh bg-background">
      <AsideBar />
      <main className="h-full pb-16 md:pb-0 md:pl-16">{children}</main>
    </div>
  );
};

export default AppWrapper;
