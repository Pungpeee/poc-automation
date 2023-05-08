import React, { forwardRef } from "react"
import { styled } from "@mui/material"
import InputUnstyled from "@mui/base/InputUnstyled"
import { COLORS } from "../../theme"

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

const CustomInput = forwardRef(function CustomInput(props, ref) {
  return (
    <InputStyled
      components={{ Input: InputStyled }}
      // endAdornment={
      //     <InputAdornment position="end" >
      //         <IconButton
      //             aria-label="toggle password visibility"
      //             edge="end"
      //         >
      //             x
      //         </IconButton>
      //     </InputAdornment>
      // }
      {...props}
      ref={ref}
    />
  )
})

export default CustomInput
