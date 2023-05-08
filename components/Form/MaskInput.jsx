import { styled } from "@mui/material"
import React from "react"
import { IMaskInput } from "react-imask"
import { COLORS } from "../../theme"

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, value, ...other } = props
  return (
    <IMaskStyled
      value={value}
      {...other}
      mask={"0-0000-00000-00-0"}
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
      placeholder="x-xxxx-xxxxx-xx-x"
      sx={{
        color: value ? "#000 !important" : `${COLORS.GRAY600} !important`,
      }}
    />
  )
})

export default TextMaskCustom

const IMaskStyled = styled(IMaskInput)({
  border: "1px solid #EDEBE9 !important",
  padding: "8px 16px !important",
  borderRadius: "100px",
  outline: 0,
  width: "100%",
  fontSize: "16px",
  height: "48px",
  fontFamily: "Prompt",
})
