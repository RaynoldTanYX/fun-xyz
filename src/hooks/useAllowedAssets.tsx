import { FUNKIT_API_KEY } from "@/constants/env";
import { queryKeys } from "@/constants/queryKeys";
import { getAllowedAssets } from "@funkit/api-base";
import { useQuery } from "@tanstack/react-query";

export const useAllowedAssets = () =>
  useQuery({
    queryKey: queryKeys.allowedAssets,
    queryFn: async () => {
      console.log({ FUNKIT_API_KEY });
      const res = await getAllowedAssets({
        apiKey: FUNKIT_API_KEY || "",
      });
      return res;
    },
  });
