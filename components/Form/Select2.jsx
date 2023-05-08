import React from "react"
import Text from "../Text"
import { Controller } from "react-hook-form"
import { Box, MenuItem, Input, Select, styled } from "@mui/material"
import { COLORS } from "../../theme"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

const SelectInput = ({ rules,name,control,label, meta, placeholder,  menus, ...rest }) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box display="flex" flexDirection="column" sx={rest.wrapperSx} height={"100%"}>
          <Select
            fullWidth={rest.fullWidth}
            sx={rest.sx}
            // renderValue={value !== undefined ? undefined : () => "Answer"}
            value={value}
            onChange={onChange}
            defaultValue="unset"
            disableUnderline
            input={<InputSelect value={value} disableUnderline onChange={onChange} {...rest} />}
            IconComponent={KeyboardArrowDownIcon}
          >
            <option value="unset" selected disabled hidden>
              <Text type="16" color="gray600">
                {placeholder}
              </Text>
            </option>
            {menus.map((menu) => (
              <MenuItem key={menu.key} value={menu.value}>
                {menu.display}
              </MenuItem>
            ))}
          </Select>
          {meta && (
            <Text type="12" color={error ? "red" : "gray600"}>
              {meta}
            </Text>
          )}
          {error ? (
            <Text type="12" color={"red"} as="div">
              {error?.message}
            </Text>
          ) : null}
        </Box>
      )}
    />
  )
}

const InputSelect = styled(Input)(({ fullWidth }) => ({
  display: "flex",
  "& .MuiSelect-outlined": {
    // border: `1px solid ${COLORS.GRAY200} !important`,
    padding: "17px 16px",
    borderRadius: "8px !important",
    background: "white",

    outline: "0 !important",
    width: fullWidth ? "100%" : "auto",
    "&:disabled": {
      background: COLORS.WHITE,
    },
  },
  "& .MuiInput-root": {
    "& .MuiSelect-nativeInput": {
      // border: `1px solid ${COLORS.GRAY200}`,
      padding: "17px 16px",
      borderRadius: "8px",
      background: "white",
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
        // border: `1px solid ${COLORS.SECONDARY_DANGER}`,
        padding: "17px 16px",
        borderRadius: "8px",
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

export default SelectInput
