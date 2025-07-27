import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useTokenList = () =>
  useQuery({
    queryKey: queryKeys.tokenList,
    queryFn: async () => {
      const res = await fetch("https://chainid.network/chains.json");
      const chains = await res.json();
      return chains;
    },
  });
