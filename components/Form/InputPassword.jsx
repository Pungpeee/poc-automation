import React, { forwardRef, useState } from "react"
import { IconButton, InputAdornment, styled } from "@mui/material"
import InputUnstyled from "@mui/base/InputUnstyled"
import { COLORS } from "../../theme"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"

const InputStyled = styled(InputUnstyled)(({ fullWidth }) => ({
  "& .MuiInput-root": {
    display: "flex",
    "& .MuiInput-input": {
      border: `1px solid ${COLORS.GRAY200}`,
      padding: "8px 16px",
      borderRadius: "100px",
      fontSize: "16px",
      height: "48px",
      fontFamily: "Prompt",
      paddingRight: "50px",
      outline: 0,
      width: fullWidth ? "100%" : "auto",
      "&:disabled": {
        background: COLORS.WHITE,
      },
      "&::placeholder": {
        color: COLORS.GRAY600,
      },
    },
  },
  "&.Mui-error": {
    "& .MuiInput-root": {
      "& .MuiInput-input": {
        border: `1px solid ${COLORS.SECONDARY_DANGER}`,
        padding: "12px 16px",
        borderRadius: "100px",
        outline: 0,
      },
    },
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
      sx={{ position: "relative" }}
      components={{ Input: InputStyled }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={() => setOpenPassword(!openPassword)}
            sx={{ position: "absolute", right: "20px", top: "5px" }}
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
