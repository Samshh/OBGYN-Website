import PatientNav from "@/navs/PatientNav";
import { Outlet } from "react-router-dom";

export default function PatientLayout() {
  return (
    <>
      <Outlet />
      <PatientNav />
    </>
  );
}
