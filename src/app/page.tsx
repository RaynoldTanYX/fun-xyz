"use client";

import { TokenSelect } from "@/components/TokenSelect";
import { tokens } from "@/constants/tokens";
import { useTokenPriceInfo } from "@/hooks/useTokenPriceInfo";
import { DoubleArrow } from "@mui/icons-material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { Grid, IconButton, Input, Skeleton, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [fromToken, setFromToken] = useState<string>("");
  const [toToken, setToToken] = useState<string>("");
  const [usdAmount, setUsdAmount] = useState<string>("");

  const fromTokenInfo = tokens.find((data) => data.symbol === fromToken);
  const toTokenInfo = tokens.find((data) => data.symbol === toToken);

  const showUsdInput = Boolean(fromToken && toToken);

  const { data: fromPriceInfo, isLoading: isFromPriceInfoLoading } =
    useTokenPriceInfo({
      chainId: fromTokenInfo?.chainId || "",
      symbol: fromTokenInfo?.symbol || "",
    });
  const { data: toPriceInfo, isLoading: isToPriceInfoLoading } =
    useTokenPriceInfo({
      chainId: toTokenInfo?.chainId || "",
      symbol: toTokenInfo?.symbol || "",
    });

  const showConversion = Boolean(showUsdInput && usdAmount);

  const onClickSwap = () => {
    const currentFromToken = fromToken;
    setFromToken(toToken);
    setToToken(currentFromToken);
  };

  return (
    <div className="flex flex-col gap-8">
      <Typography variant="h5" textAlign="center">
        Token Price Explorer
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid>
          <TokenSelect value={fromToken} onChange={setFromToken} label="From" />
          {isFromPriceInfoLoading ? (
            <Skeleton />
          ) : fromPriceInfo?.unitPrice ? (
            `${fromPriceInfo.unitPrice} USD/unit`
          ) : (
            ""
          )}
        </Grid>
        <Grid paddingTop={1}>
          <IconButton onClick={onClickSwap}>
            <CompareArrowsIcon />
          </IconButton>
        </Grid>
        <Grid>
          <TokenSelect value={toToken} onChange={setToToken} label="To" />
          {isToPriceInfoLoading ? (
            <Skeleton />
          ) : toPriceInfo?.unitPrice ? (
            `${toPriceInfo.unitPrice} USD/unit`
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      {showUsdInput && (
        <div className="text-center">
          I want to convert{" "}
          <Input
            type="number"
            placeholder="USD Amount"
            className="w-32"
            value={usdAmount}
            onChange={(event) => setUsdAmount(event.target.value)}
          />
          <b>USD</b> worth of <b>{fromToken}</b> to <b>{toToken}</b>
        </div>
      )}
      {showConversion && (
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid>
            {isFromPriceInfoLoading ? (
              <Skeleton width={100} />
            ) : (
              `${
                Number(usdAmount) / (fromPriceInfo?.unitPrice || 0)
              } ${fromToken}`
            )}
          </Grid>
          <Grid>
            <DoubleArrow />
          </Grid>
          <Grid>
            {isToPriceInfoLoading ? (
              <Skeleton width={100} />
            ) : (
              `${Number(usdAmount) / (toPriceInfo?.unitPrice || 0)} ${toToken}`
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
}
