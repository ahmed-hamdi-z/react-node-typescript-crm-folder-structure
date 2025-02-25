import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { rpcClient } from "@/lib/rpcClient";

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current"], // Unique key for this query
    queryFn: async () => {
      try {
        // Call the RPC method to get the current user's data
        const response = await rpcClient("getUserPage");

        if (!response) {
          throw new Error("Failed to fetch current user");
        }

        return response; // Return the user data
      } catch (error) {
        toast.error("Failed to fetch current user");
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
    retry: 1, // Retry once if the query fails
  });

  return query;
};