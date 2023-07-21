import { TextField } from "@mui/material"

export const Search = ({ onChange }) => {
  return (
    <TextField
      label="search"
      variant="standard"
      type="search"
    //   value={value}
      onChange={onChange}
      sx={{ mb: "1.5rem" }}
    />
  )
}
