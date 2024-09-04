import { createBrowserRouter, Navigate } from "react-router-dom";
import DoctorFold from "./folds/doctor-fold";
import HomeFold from "./folds/home-fold";
import LoginFold from "./folds/login-fold";
import PatientFold from "./folds/patient-fold";
import RegisterFold from "./folds/register-fold";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeFold />,
  },
  {
    path: "/login",
    element: <LoginFold />,
  },
  {
    path: "/register",
    element: <RegisterFold />,
  },
  {
    path: "/doctor",
    element: <DoctorFold />,
  },
  {
    path: "/patient",
    element: <PatientFold />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default Router;