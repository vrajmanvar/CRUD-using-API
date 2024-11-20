import React from "react";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router";
import "./RootLayout.css";
import { Pagination } from "../components/Pagination";

export const RootLayout = () => {
  return (
    <div>
      <Navbar />

      <Outlet />
    </div>
  );
};