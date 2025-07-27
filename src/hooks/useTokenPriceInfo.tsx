import { FUNKIT_API_KEY } from "@/constants/env";
import { queryKeys } from "@/constants/queryKeys";
import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";
import { useQuery } from "@tanstack/react-query";

export const useTokenPriceInfo = ({
  chainId,
  symbol,
}: {
  chainId: string;
  symbol: string;
}) =>
  useQuery({
    queryKey: queryKeys.tokenPriceInfo({ chainId, symbol }),
    queryFn: async () => {
      if (!chainId || !symbol) return null;
      const { address } = await getAssetErc20ByChainAndSymbol({
        chainId,
        symbol,
        apiKey: FUNKIT_API_KEY || "",
      });
      const res = await getAssetPriceInfo({
        chainId,
        assetTokenAddress: address,
        apiKey: FUNKIT_API_KEY || "",
      });
      return res;
    },
  });
