import HomeNav from "@/navs/HomeNav";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <>
      <Outlet />
      <HomeNav />
    </>
  );
}
