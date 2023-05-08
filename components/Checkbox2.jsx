import * as React from "react"
import Text from "./Text"
import { Box, MenuItem, Input, Select, styled, Checkbox } from "@mui/material"
import { Controller } from "react-hook-form"

const Checkbox_Custom = ({ name, control, rules, label, checked, isRequired, menus, labelColor, ...rest }) => {
  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={false}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error }, formState: { errors } }) => {
        return (
          <>
            {name === "rules3" ? (
              <Box display="flex" alignItems="center" gap="10px">
                <CheckBox checked={value} />
                <Text type="12" fontWeight={600} color="white">
                  I agree to&nbsp;
                  <Text type="12" fontWeight={600} color="green_neon" {...rest}>
                    Terms & Conditions and Privacy Policy
                  </Text>
                </Text>
              </Box>
            ) : (
              <Box display="flex" alignItems="center" gap="10px">
                <CheckBox onChange={onChange} checked={value} {...rest} sx={rest.sx} />
                <Text type="12" fontWeight={600} color={labelColor??'white'}>
                  {label}
                </Text>
              </Box>
            )}
          </>
        )
      }}
    />
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
