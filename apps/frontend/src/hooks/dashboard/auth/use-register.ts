import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { rpcClient } from "@/lib/rpcClient";

export const useRegister = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      // Use the RPC client to call the "register" method
      const result = await rpcClient("register", data);
      return result;
    },
    onSuccess: () => {
      toast.success("Registered successfully");
      queryClient.invalidateQueries({ queryKey: ["current"] }); // Invalidate queries if needed
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to register");
    },
  });

  return mutation;
};