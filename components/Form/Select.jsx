import React from "react"
import Text from "../Text"

import { Box, MenuItem, Input, Select, styled } from "@mui/material"
import { COLORS } from "../../theme"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

const SelectInput = ({ label, meta, value, onChange, placeholder, isRequired, menus, ...rest }) => {
  const { error } = rest

  return (
    <Box display="flex" flexDirection="column" sx={rest.wrapperSx}>
      <Text as="label" type="12" color="primary">
        {label} {isRequired && <Text color="red100">*</Text>}
      </Text>
      <Select
        fullWidth={rest.fullWidth}
        sx={rest.sx}
        // renderValue={value !== undefined ? undefined : () => "Answer"}
        value={value}
        onChange={onChange}
        defaultValue="unset"
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
  )
}

const InputSelect = styled(Input)(({ fullWidth }) => ({
  display: "flex",
  "& .MuiSelect-outlined": {
    border: `1px solid ${COLORS.GRAY200} !important`,
    padding: "11px 16px",
    borderRadius: "100px !important",

    outline: "0 !important",
    width: fullWidth ? "100%" : "auto",
    "&:disabled": {
      background: COLORS.WHITE,
    },
  },
  "& .MuiInput-root": {
    "& .MuiSelect-nativeInput": {
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

export default SelectInput
