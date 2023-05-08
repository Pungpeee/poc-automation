import { styled, TextField, Box, InputAdornment, IconButton } from "@mui/material"
import React, { useState } from "react"
import { Controller } from "react-hook-form"
import Text from "./Text"
import Image from "next/image"

const TextFieldInput = ({
  name,
  rules,
  label,
  meta,
  control,
  normalize,
  placeholder,
  isRequired,
  hiddenError,
  defaultValue,
  errorSubmit,
  showError,
  storePrice,
  finalPrice,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={""}
      control={control}
      render={({ field: { onChange }, fieldState: { error }, formState: { errors } }) => {
        return (
          <>
            <TextFieldInputStyled
              // {...field}
              {...rest}
              placeholder={placeholder}
              onChange={onChange}
              variant="filled"
            />
          </>
        )
      }}
    />
  )
}

export default TextFieldInput

const TextFieldInputStyled = styled((props) => (
  <TextField
    hiddenLabel
    InputProps={{
      disableUnderline: true,
    }}
    {...props}
  />
))(({ errorSubmit }) => ({
  "&::placeholder": {
    fontSize: "16px",
    fontWeight: 400,
  },
  // "& input": { textAlign: "center" },
  "& .MuiFilledInput-root": {
    // paddingLeft: "30%",
    minWidth: "343px",
    width: "100%",
    height: "36px",
    border: "1px solid #E5E5E5",
    overflow: "hidden",
    fontFamily: "Prompt",
    fontWeight: 400,
    fontSize: "14px",
    color: "#000",
    borderRadius: "8px",
    // backgroundColor: errorSubmit ? "red" : "white",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
    },
    input: {
      paddingLeft: "17.5px",
      paddingTop: "10px",
      paddingBottom: "10px",
      "&::placeholder": {
        fontSize: "14px",
        fontWeight: 400,
        color: "#979797",
        opacity: 1,
      },
    },
  },
}))
