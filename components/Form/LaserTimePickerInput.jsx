import { styled } from "@mui/material"
import toUpper from "lodash/toUpper"
import React from "react"
import { IMaskInput } from "react-imask"
import { COLORS } from "../../theme"

const LaserTimePickerInput = React.forwardRef(function LaserTimePickerInput(props, ref) {
  const { onChange, value, ...other } = props
  return (
    <IMaskStyled
      value={value}
      {...other}
      mask={"01:34"}
      definitions={{
        0: /[0-2]/,
        1: /[0-3]/,
        3: /[0-5]/,
        4: /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value: toUpper(value) } })}
      overwrite
      placeholder="--:--"
      sx={{
        color: value ? "#000 !important" : `${COLORS.GRAY600} !important`,
      }}
    />
  )
})

export default LaserTimePickerInput

const IMaskStyled = styled(IMaskInput)({
  border: "1px solid #EDEBE9 !important",
  padding: "8px 16px !important",
  borderRadius: "100px",
  fontSize: "16px",
  fontFamily: "Prompt",
  outline: 0,
  width: "100%",
  fontSize: "16px",
  height: "48px",
  fontFamily: "Prompt",
})
