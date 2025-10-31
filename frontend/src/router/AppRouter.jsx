import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Protected from "../Protected/Protected";
import Profile from "../pages/Profile";
import CreatePost from "../pages/CreatePost";
import Blog from "../pages/Blog";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/*", element: <NotFound /> },
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        path: "/",
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        index: true,
        path: "/profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
      {
        index: true,
        path: "/create",
        element: (
          <Protected>
            <CreatePost />
          </Protected>
        ),
      },
      {
        index: true,
        path: "/blog",
        element: (
          <Protected>
            <Blog />
          </Protected>
        ),
      },
    ],
  },
]);
