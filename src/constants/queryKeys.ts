export const queryKeys = {
  allowedAssets: ["allowedAssets"],
  tokenPriceInfo: ({
    chainId,
    symbol,
  }: {
    chainId: string;
    symbol: string;
  }) => ["tokenPriceInfo", chainId, symbol],
  erc20Info: ({ chainId, symbol }: { chainId?: string; symbol?: string }) => [
    "erc20Info",
    chainId,
    symbol,
  ],
  tokenList: ["tokenList"],
};
