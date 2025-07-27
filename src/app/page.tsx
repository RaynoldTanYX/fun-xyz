"use client";

import { TokenSelect } from "@/components/TokenSelect";
import { tokens } from "@/constants/tokens";
import { useTokenPriceInfo } from "@/hooks/useTokenPriceInfo";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { Grid, IconButton, Input, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [fromToken, setFromToken] = useState<string>("");
  const [toToken, setToToken] = useState<string>("");
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [lastTouchedAmount, setLastTouchedAmount] = useState<"from" | "to">(
    "from"
  );

  const fromTokenInfo = tokens.find((data) => data.symbol === fromToken);
  const toTokenInfo = tokens.find((data) => data.symbol === toToken);

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
  const conversionRatio: number | undefined =
    fromPriceInfo && toPriceInfo
      ? toPriceInfo.unitPrice / fromPriceInfo.unitPrice
      : undefined;

  const onClickSwap = () => {
    const currentFromToken = fromToken;
    setFromToken(toToken);
    setToToken(currentFromToken);

    const currentFromAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(currentFromAmount);
  };

  const onChangeFromAmount = (amount: string) => {
    setLastTouchedAmount("from");
    setFromAmount(amount);
    if (conversionRatio === undefined) return;
    setToAmount((Number(amount) / conversionRatio).toString());
  };

  const onChangeToAmount = (amount: string) => {
    setLastTouchedAmount("from");
    setToAmount(amount);
    if (conversionRatio === undefined) return;
    setFromAmount((Number(amount) / conversionRatio).toString());
  };

  useEffect(() => {
    if (!conversionRatio) {
      if (lastTouchedAmount == "to") {
        setFromAmount("");
      } else {
        setToAmount("");
      }
      return;
    }
    if (lastTouchedAmount == "to") {
      setFromAmount((Number(toAmount) / conversionRatio).toString());
    } else {
      setToAmount((Number(fromAmount) / conversionRatio).toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only watch conversionRatio
  }, [conversionRatio]);

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
      <Grid container spacing={2} justifyContent="center">
        <Grid>
          <Input
            type="number"
            value={fromAmount}
            onChange={(event) => onChangeFromAmount(event.target.value)}
            placeholder="Number of units"
          />
        </Grid>
        <Grid>=</Grid>
        <Grid>
          <Input
            type="number"
            value={toAmount}
            onChange={(event) => onChangeToAmount(event.target.value)}
            placeholder="Number of units"
          />
        </Grid>
      </Grid>
    </div>
  );
}
