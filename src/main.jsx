import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./provider/AuthProvider";
import router from "./routes/Routes.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="w-11/12 mx-auto">
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </AuthProvider>
    </div>
  </React.StrictMode>
);
