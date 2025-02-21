
// Components
import { RegisterCard } from "@/features/dashboard/auth/components/register-card";
import { protectRoute } from "@/features/dashboard/auth/actions";

import { redirect } from "next/navigation";

const Register = async () => {
       const user = await protectRoute();
        if (user) redirect('/');

    return <RegisterCard />
}

export default Register;