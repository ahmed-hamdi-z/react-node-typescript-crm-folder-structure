// Dependencies
import React from "react";

// React Router
import { BrowserRouter as Router } from "react-router-dom";

// Types
import { MainProviderProps } from "@/interfaces/global/provider-interfaces";

// Loader
import Loader from "./components/global/PageLoading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <React.Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Router>{children}</Router>
      </QueryClientProvider>
    </React.Suspense>
  );
};

export default MainProvider;
