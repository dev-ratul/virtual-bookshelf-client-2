import { StrictMode, use } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./Router/Router.jsx";
import AuthProvider from "./Context/AuthContext/AuthProvider.jsx";
import { Toaster } from "react-hot-toast"; // ✅ Only this
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// QueryClient তৈরি কর
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ toast will work */}
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
