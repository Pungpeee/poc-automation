import { Box, styled } from "@mui/material"
import { InputUnstyled } from "@mui/base"
import { COLORS } from "../../theme"
import Text from "../Text"
import TextMaskCustom from "./LaserMaskInput"

const IDNumberInput = (props) => {
  const { label, value, onChange, name, error, isRequired } = props
  return (
    <Box display="flex" flexDirection="column">
      <Text as="label" type="12" color="primary">
        {label} {isRequired && <Text color="red100">*</Text>}
      </Text>
      <InputStyled
        disableUnderline
        value={value}
        onChange={onChange}
        name={name}
        components={{ Input: TextMaskCustom }}
      />
      {error ? (
        <Text type="12" color={"red"} as="div">
          {error?.message}
        </Text>
      ) : null}
    </Box>
  )
}

export default IDNumberInput

const InputStyled = styled(InputUnstyled)(({ fullWidth, value }) => ({
  margin: "0px !important",

  "& .MuiInput-root": {
    display: "flex",
    "& .MuiInput-input": {
      border: `1px solid ${COLORS.GRAY200}`,
      padding: "12px 16px",
      borderRadius: "100px",
      outline: 0,
      width: fullWidth ? "100%" : "auto",
      "&:disabled": {
        background: COLORS.WHITE,
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
