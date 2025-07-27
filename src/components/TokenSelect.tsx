import { tokens } from "@/constants/tokens";
import { Autocomplete, TextField } from "@mui/material";

const options: string[] = tokens.map((data) => data.symbol);

export const TokenSelect = ({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) => {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
      value={value}
      onChange={(_event, value) => onChange(value || "")}
    />
  );
};
