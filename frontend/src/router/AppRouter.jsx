import React from "react";
import { createBrowserRouter, Route, Router, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Protected from "../Protected/Protected";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
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
    ],
  },
]);
