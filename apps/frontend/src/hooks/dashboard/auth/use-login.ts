import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { rpcClient } from "@/lib/rpcClient";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      // Use the RPC client to call the "login" method
      const result = await rpcClient("login", data);
      return result;
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      navigate("/dashboard"); // Navigate to the dashboard page
      queryClient.invalidateQueries({ queryKey: ["current"] }); // Invalidate queries if needed
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to login");
    },
  });

  return mutation;
};