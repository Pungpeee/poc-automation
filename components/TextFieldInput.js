import { styled, TextField, Box } from "@mui/material"
import React, { useState } from "react"
import { Controller } from "react-hook-form"
import Text from "./Text"

const TextFieldInput = ({
  name,
  rules,
  label,
  meta,
  control = {},
  normalize,
  renderCustomError,
  isRequired,
  hiddenError,
  defaultValue,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={""}
      control={control}
      render={({ field, fieldState: { error }, formState: { errors } }) => {
        const onChange = (e) => {
          const val = e.target.value
          field.onChange(val)
        }
        return (
          <>
            <TextFieldInputStyled {...field} {...rest} onChange={onChange} label={label} variant="filled" />
            {error && (
              <Box padding={"8px 16px"} sx={{ background: "rgba(220, 93, 94, 0.75)", borderRadius: "4px" }}>
                <Text type="12" fontWeight={700} color={"error050"}>
                  {error?.message}
                </Text>
              </Box>
            )}
          </>
        )
      }}
    />
  )
}

export default TextFieldInput

const TextFieldInputStyled = styled((props) => (
  <TextField
    InputProps={{
      disableUnderline: true,
    }}
    {...props}
  />
))(({ theme }) => ({
  "& label": {
    color: "#979797",
  },
  "& label.Mui-focused": {
    color: "#979797",
  },
  "& .MuiFilledInput-root": {
    border: "2px solid #e2e2e1",
    width: "100%",
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "white",
    fontFamily: "Prompt",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "white",
    },
    "& label": {
      color: "red",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      border: "2px solid #A5DACB",
      color: "black",
    },
    // transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
  },
}))
