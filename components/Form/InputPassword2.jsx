import React, { forwardRef, useState } from "react"
import { IconButton, InputAdornment, styled } from "@mui/material"
import InputUnstyled from "@mui/base/InputUnstyled"
import { COLORS } from "../../theme"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"

const InputStyled = styled(InputUnstyled)(({ theme}) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    width:"50%",
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "white",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "white",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      borderColor: "white",
      color: "black",
    },
    // transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
  },
  "&.MuiInputBase-adornedEnd": {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
}))

const InputPassword = forwardRef(function InputPassword(props, ref) {
  const [openPassword, setOpenPassword] = useState(false)
  return (
    <InputStyled
      // sx={{ position: "relative" }}
      components={{ Input: InputStyled }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={() => setOpenPassword(!openPassword)}
            // sx={{ position: "absolute", right: "20px", top: "5px" }}
            aria-label="toggle password visibility"
            edge="end"
          >
            {openPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </InputAdornment>
      }
      {...props}
      ref={ref}
      type={openPassword ? "text" : "password"}
    />
  )
})

export default InputPassword
