import { AppBar, Typography } from "@mui/material"

export const Header = () => {
  return (
    <AppBar position="static">
      <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
        Book Store
      </Typography>
    </AppBar>
  )
}
