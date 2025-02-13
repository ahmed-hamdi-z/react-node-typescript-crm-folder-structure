// Dependencies
import React from "react";

// Providers
import MainProvider from "./components/global/MainProvider";
import ThemeProvider from "./components/global/ThemeProvider";

import Dashboard from "./layouts/dashboard";


// Layouts
// const Dashboard = React.lazy(() => import("@/layouts/dashboard"));
// const Website = React.lazy(() => import("./layouts/website"));

const App: React.FC = () => {
  return (
    <MainProvider>
   
        {/* <Website /> */}
        <Dashboard />
  
    </MainProvider>
  )
}

export default App;