import DoctorNav from "@/navs/DoctorNav";
import { Outlet } from "react-router-dom";

export default function DoctorLayout() {
  return (
    <>
      <Outlet />
      <DoctorNav />
    </>
  );
}
