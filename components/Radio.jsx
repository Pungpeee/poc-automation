import { Box, Grid, styled, Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material"
import Text from "./Text"

const RadioInput = ({ label, meta, ...rest }) => {
  return (
    <Box display="flex" gap="5px" {...rest} alignItems="center">
      <RadioStyled />
      <Text type={16} fontWeight={700} color="white">
        {label}
      </Text>
    </Box>
  )
}

export default RadioInput

const RadioStyled= styled((props) => <Radio {...props} />)(({ theme }) => ({
    "&.Mui-checked": { color: "#1FA37C" },
    "&.MuiFormControlLabel-root ": {
      "& .MuiFormControlLabel-label": {
        color: "white",
      },
    },
  }))