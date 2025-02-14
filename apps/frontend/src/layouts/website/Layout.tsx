// Dependencies
import React, { FC } from "react";

// React Router
import { Outlet } from "react-router-dom";

const WebsiteLayout: FC = () => {
  return (
    <main className="text-black">
      <h1 className="text-black">WebsiteLayout</h1>
      <Outlet />
    </main>
  );
};

export default WebsiteLayout;
