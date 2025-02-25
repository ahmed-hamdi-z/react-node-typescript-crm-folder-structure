import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { rpcClient } from "@/lib/rpcClient";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      // Use the RPC client to call the "logout" method
      const result = await rpcClient("logout");
      return result;
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      navigate("/login"); // Navigate to the login page after logout
      queryClient.invalidateQueries({ queryKey: ["current"] }); // Invalidate queries if needed
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to logout");
    },
  });

  return mutation;
};