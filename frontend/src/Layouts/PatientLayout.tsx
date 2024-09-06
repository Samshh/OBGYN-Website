import PatientNav from "@/navs/PatientNav";
import TitleHandler from "@/TitleHandler";
import { Outlet } from "react-router-dom";

export default function PatientLayout() {
  return (
    <>
      <Outlet />
      <PatientNav />
      <TitleHandler />
    </>
  );
}
