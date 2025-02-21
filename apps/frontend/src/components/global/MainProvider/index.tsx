// Dependencies
import React from "react";

// React Router
import { BrowserRouter as Router } from "react-router-dom";

// Types
import { MainProviderProps } from "@/interfaces/global/provider-interfaces";

// Loader
import Loader from "../PageLoading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {

const queryClient = new QueryClient();

  return (
    <React.Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
        <Router>
          {children}
        </Router>
        </QueryClientProvider>
    </React.Suspense>
  )
}

export default MainProvider;