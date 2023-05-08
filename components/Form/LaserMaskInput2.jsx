import { styled } from "@mui/material"
import toUpper from "lodash/toUpper"
import React from "react"
import { IMaskInput } from "react-imask"
import { COLORS } from "../../theme"

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, value, ...other } = props
  return (
    <IMaskStyled
      value={value}
      {...other}
      mask={"TT0-000000-00"}
      definitions={{
        T: /[A-Za-z]/,
        0: /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value: toUpper(value) } })}
      overwrite
      placeholder="xxx-xxxxxx-xx"
      // sx={{
      //   color: value ? "#000 !important" : `${COLORS.GRAY600} !important`,
      // }}
    />
  )
})

export default TextMaskCustom

const IMaskStyled = styled(IMaskInput)({
    width: "100%",
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "white",
    
    
})
