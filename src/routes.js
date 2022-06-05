import React from "react";
import async from "./components/Async";
// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
// Guards
import AuthGuard from "./components/guards/AuthGuard";
// Auth components
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";
import SetPassword from "./pages/auth/SetPassword";
// Components
import Cards from "./pages/components/Cards";
import Overview from "./pages/pages/Overview";
import AdvancedTable from "./pages/tables/AdvancedTable";
// Protected routes
import ProtectedPage from "./pages/protected/ProtectedPage";
import { Users } from "react-feather";

// Dashboard components
const Default = async(() => import("./pages/dashboards/Default"));
const Reviews = async(() => import("./pages/dashboards/SaaS"));

const Profile = async(() => import("./pages/dashboards/Profile"));
const Accounts = async(() => import("./pages/dashboards/Accounts"));
const AccountsOverview = async(() =>
  import("./pages/dashboards/Accounts/banner")
);
const Location = async(() => import("./pages/dashboards/Location"));
const MyLocation = async(() => import("./pages/dashboards/MyLocation"));
const EditLocation = async(() => import("./pages/dashboards/EditLocation"));
const ViewLocation = async(() => import("./pages/dashboards/ViewLocation"));
const Seo = async(() => import("./pages/seo/keyword"));

const Formmmm = async(() => import("./pages/pages/Settings"));
const Profiles = async(() => import("./pages/pages/Profile"));
const Tasks = async(() => import("./pages/pages/Tasks"));
const routes = [
  {
    path: "/profile",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/edit_location",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <EditLocation />,
      },
    ],
  },
  {
    path: "/view_location/:id",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <ViewLocation />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <DashboardLayout />,
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <Default />,
      },
    ],
  },
  {
    path: "/overview",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Reviews />,
      },
    ],
  },
  {
    path: "/overview/:id",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Reviews />,
      },
    ],
  },
  {
    path: "listings",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Cards />,
      },
    ],
  },
  {
    path: "reviews",
    element: <DashboardLayout />,
    children: [
      {
        path: "manager",
        element: <Tasks />,
      },
      // {
      //   path: "Test",
      //   element: <Tasks />,
      // },
      {
        path: "request",
        element: <Cards />,
      },
    ],
  },
  {
    path: "seo",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "keyword-search",
        element: <Default />,
      },
    ],
  },
  // {
  //   path: "overview/:id",
  //   element: <Accounts />,
  //   children: [
  //     {
  //       path: "",
  //       element: <AccountsOverview />,
  //     },
  //   ],
  // },

  {
    path: "tools",
    element: <DashboardLayout />,

    children: [
      {
        path: "devices",
        element: <Formmmm />,
      },
      {
        path: "accounts",
        element: <Accounts />,
      },
      {
        path: "accounts/:id",
        element: <AccountsOverview />,
      },
      {
        path: "partner",
        element: <Profiles />,
      },
      {
        path: "wifi-marketing-demo",
        element: <Cards />,
      },
      {
        path: "demo-accounts",
        element: <Cards />,
      },
      {
        path: "partner-insights",
        element: <Cards />,
      },
    ],
  },
  {
    path: "location",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <MyLocation />,
      },
      {
        path: "add-locations",
        element: <Location />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "set-password",
        element: <SetPassword />,
      },
      {
        path: "404",
        element: <Page404 />,
      },
      {
        path: "500",
        element: <Page500 />,
      },
    ],
  },
  {
    path: "private",
    element: (
      <AuthGuard>
        <DashboardLayout />,
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <ProtectedPage />,
      },
    ],
  },
  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

export default routes;
