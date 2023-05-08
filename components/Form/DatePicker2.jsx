import React, { useState } from "react"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, TextField,styled } from "@mui/material"
import { Controller } from "react-hook-form"
import Text from "../Text"
import { COLORS } from "../../theme"

const DatePickerForm = ({ name, control, label, meta, rules, minDate, maxDate, isRequired,...rest }) => {
  const [open, setOpen] = useState(false)
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Box display="flex" flexDirection="column">
            <DatePicker
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              // PopperProps={{ popperOptions: { placement: "bottom" } }}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              defaultCalendarMonth={null}
              open={open}
              onChange={onChange}
              inputFormat="DD/MM/YYYY"
              renderInput={(params) => {
                return (
                  <InputStyled
                    $isHaveValue={!!value}
                    onClick={() => setOpen(true)}
                    {...rest}
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      inputComponent: <div></div>,
                      value: value ? params.inputProps.value : "DD/MM/YYYY",
                      placeholder: "DD/MM/YYYY",
                    }}
                  />
                )
              }}
            />
            {meta && (
              <Text type="12" color={"gray600"} as="div">
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
      }}
    />
  )
}

export default DatePickerForm

const InputStyled = styled(TextField)(({ fullWidth, $isHaveValue }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    background:'white',
    padding: "17px 16px",
    outline: 0,
    width: fullWidth ? "100%" : "auto",
    "& .MuiOutlinedInput-input": {
      height: "auto",
      padding: 0,
      color: $isHaveValue ? "#000" : COLORS.GRAY600,
      "&:disabled": {
        background: COLORS.WHITE,
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "unset",
    },
  },
}))
