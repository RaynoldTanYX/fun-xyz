"use client";

import { TokenSelect } from "@/components/TokenSelect";
import { tokens } from "@/constants/tokens";
import { useTokenPriceInfo } from "@/hooks/useTokenPriceInfo";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { Grid, IconButton, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [fromToken, setFromToken] = useState<string>("");
  const [toToken, setToToken] = useState<string>("");
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [toAmount, setToAmount] = useState<number>(0);
  const [lastTouchedAmount, setLastTouchedAmount] = useState<"from" | "to">(
    "from"
  );

  const fromTokenInfo = tokens.find((data) => data.symbol === fromToken);
  const toTokenInfo = tokens.find((data) => data.symbol === toToken);

  const { data: fromPriceInfo } = useTokenPriceInfo({
    chainId: fromTokenInfo?.chainId || "",
    symbol: fromTokenInfo?.symbol || "",
  });
  const { data: toPriceInfo } = useTokenPriceInfo({
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
  };

  const onChangeFromAmount = (amount: number) => {
    setLastTouchedAmount("from");
    setFromAmount(amount);
    if (conversionRatio === undefined) return;
    setToAmount(amount / conversionRatio);
  };

  const onChangeToAmount = (amount: number) => {
    setLastTouchedAmount("from");
    setToAmount(amount);
    if (conversionRatio === undefined) return;
    setFromAmount(amount / conversionRatio);
  };

  useEffect(() => {
    if (!conversionRatio) {
      if (lastTouchedAmount == "to") {
        setFromAmount(0);
      } else {
        setToAmount(0);
      }
      return;
    }
    if (lastTouchedAmount == "to") {
      setFromAmount(toAmount / conversionRatio);
    } else {
      setToAmount(fromAmount / conversionRatio);
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
          {fromPriceInfo?.unitPrice
            ? `${fromPriceInfo.unitPrice} USD/unit`
            : ""}
        </Grid>
        <Grid paddingTop={1}>
          <IconButton onClick={onClickSwap}>
            <CompareArrowsIcon />
          </IconButton>
        </Grid>
        <Grid>
          <TokenSelect value={toToken} onChange={setToToken} label="To" />
          {toPriceInfo?.unitPrice ? `${toPriceInfo.unitPrice} USD/unit` : ""}
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid>
          <Input
            type="number"
            value={fromAmount}
            onChange={(event) => onChangeFromAmount(Number(event.target.value))}
          />
        </Grid>
        <Grid>=</Grid>
        <Grid>
          <Input
            type="number"
            value={toAmount}
            onChange={(event) => onChangeToAmount(Number(event.target.value))}
          />
        </Grid>
      </Grid>
    </div>
  );
}
