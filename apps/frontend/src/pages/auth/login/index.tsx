// Components 
import { LoginCard } from "@/features/dashboard/auth/components/login-card";
import { protectRoute } from "@/features/dashboard/auth/actions";

import { redirect } from "next/navigation";

const Login = async () => {
    const user = await protectRoute();
    if (user) redirect('/');

    return  <LoginCard />
    
};

export default Login;