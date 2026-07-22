import { createBrowserRouter } from "react-router";
import Home from "../../pages/Home/Home";
import MainLayout from "../../layouts/MainLayout";
import AuthLayout from "../../layouts/AuthLayout";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../../pages/Dashboard/Dashboard";
import EditApplications from "../../pages/EditApplications/EditApplications";
import AddApplication from "../../pages/AddApplication/AddApplication";
import Applications from "../../pages/Applications/Applications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/applications",
        element: (
          <PrivateRoute>
            <Applications />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-application/:id",
        element: (
          <PrivateRoute>
            <EditApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-application",
        element: (
          <PrivateRoute>
            <AddApplication />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
]);
