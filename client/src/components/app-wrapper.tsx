import React from "react";
import AsideBar from "./aside-bar";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <AsideBar />
      <main className="h-full">{children}</main>
    </div>
  );
};

export default AppWrapper;
