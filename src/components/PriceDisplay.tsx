import { Skeleton, Typography } from "@mui/material";

export const PriceDisplay = ({
  price,
  error,
  isLoading,
}: {
  price: number | undefined;
  error: Error | null;
  isLoading: boolean | undefined;
}) => {
  if (isLoading) {
    return <Skeleton />;
  }
  if (error) {
    return (
      <Typography color="error">
        Could not retrieve data, please try again later
      </Typography>
    );
  }
  if (price) {
    return `${price} USD/unit`;
  }
  return null;
};
