import { FUNKIT_API_KEY } from "@/constants/env";
import { queryKeys } from "@/constants/queryKeys";
import { getAssetErc20ByChainAndSymbol } from "@funkit/api-base";
import { useQuery } from "@tanstack/react-query";

export const useErc20Info = ({
  chainId,
  symbol,
}: {
  chainId: string;
  symbol: string;
}) =>
  useQuery({
    queryKey: queryKeys.erc20Info({ chainId, symbol }),
    queryFn: async () => {
      if (!chainId || !symbol) return null;
      const res = await getAssetErc20ByChainAndSymbol({
        chainId,
        symbol,
        apiKey: FUNKIT_API_KEY || "",
      });
      return res;
    },
  });
