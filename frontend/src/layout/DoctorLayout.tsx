import DoctorNav from "@/navs/DoctorNav";
import TitleHandler from "@/TitleHandler";
import { Outlet } from "react-router-dom";

export default function DoctorLayout() {
  return (
    <>
      <TitleHandler />
      <Outlet />
      <DoctorNav />
    </>
  );
}
