import * as React from "react"
import Text from "../Text"
import { Box, MenuItem, Input, Select, styled, Checkbox } from "@mui/material"

const Checkbox_Custom = ({ label, onChange, checked, isRequired, menus, ...rest }) => {
  return (
    <Box display="flex" alignItems='center' gap="10px">
      <CheckBox onChange={onChange} checked={checked} {...rest} sx={rest.sx} />
      <Text type="12" fontWeight={600} color="white">
        {label}
      </Text>
    </Box>
  )
}

const CheckBox = styled(Checkbox)({
  color: "#BDBDBD",
  "&.Mui-checked": {
    color: "#BDBDBD",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
})

export default Checkbox_Custom
