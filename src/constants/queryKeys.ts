export const queryKeys = {
  tokenPriceInfo: ({
    chainId,
    symbol,
  }: {
    chainId: string;
    symbol: string;
  }) => ["tokenPriceInfo", chainId, symbol],
};
