// Dependencies
import React from "react";

// Providers
import MainProvider from "./components/global/MainProvider";
import ThemeProvider from "./components/global/ThemeProvider";

import Dashboard from "./layouts/dashboard";
import Website from "./layouts/website";


// Layouts
// const Dashboard = React.lazy(() => import("@/layouts/dashboard"));
// const Website = React.lazy(() => import("./layouts/website"));

const App: React.FC = () => {
  return (
    <MainProvider>
   
        <Website />
        <Dashboard />
  
    </MainProvider>
  )
}

export default App;