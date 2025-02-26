// Components
import { Button } from "@/components/ui/button";
import { appRoutes } from "@/config/routes-config";
// import { useCurrent } from "@/hooks/dashboard/auth/use-current";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Authentication Layout Props
interface AuthLayoutProps {
  children: React.ReactNode;
}

// Main Layout For Authentication
const AuthLayout = ({ children }: AuthLayoutProps) => {
  // const redirect = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === appRoutes.auth.login;

  // useEffect(() => {
  //   const getUser = async () => {
  //     const { data: user } = await useCurrent();
  //     if (user) redirect(appRoutes.dashboard.path);
  //   };
  //   getUser();
  // }, []);
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          {/* Replace Next.js Image with a regular img tag */}
          <img src="/logo.svg" width={100} height={50} alt="Logo" />

          <Button asChild variant="secondary">
            <Link to={isLogin ? appRoutes.auth.register : appRoutes.auth.login}>
              {isLogin ? "Sign Up" : "Sign In"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
