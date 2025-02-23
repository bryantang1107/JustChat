import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/Home.jsx";
import Dashboard from "./routes/dashboard/Dashboard.jsx";
import SignIn from "./routes/signin/SignIn.jsx";
import SignUp from "./routes/signup/SignUp.jsx";
import Chat from "./routes/chat/Chat.jsx";
import RootLayout from "./layouts/rootLayout/RootLayout.jsx";
import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout.jsx";
import Version from "./routes/about/Version.jsx";
import About from "./routes/about/About.jsx";
import Feature from "./routes/about/Feature.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/justchat",
            element: <Version />,
          },
          {
            path: "/dashboard/about",
            element: <About />,
          },
          {
            path: "/dashboard/feature",
            element: <Feature />,
          },
          {
            path: "/dashboard/chats/:id",
            element: <Chat />,
          },
        ],
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
