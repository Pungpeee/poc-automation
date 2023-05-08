import { styled, TextField, InputAdornment, IconButton, Box } from "@mui/material"
import React, { useState } from "react"
import { Controller } from "react-hook-form"
import Text from "./Text"

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"

const TextFieldInput_Password = ({
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
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

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
          <Box display='flex' flexDirection='column' gap='4px'>
            <TextFieldInputStyled
              {...field}
              {...rest}
              visible={visible}
              toggleVisible={toggleVisible}
              onChange={onChange}
              label={label}
              variant="filled"
            />
            {name === "password" && error?.message && (
              <Box padding={"8px 16px"} sx={{ background: "rgba(220, 93, 94, 0.75)", borderRadius: "4px" }}>
                <Text type="12" fontWeight={700} color={"error050"}>
                  {error?.message}
                </Text>
              </Box>
            )}
            {(name === "password" && error?.message==="") && (
              <Box
                padding={"8px 16px"}
                display="flex"
                flexDirection={"column"}
                sx={{ background: "rgba(220, 93, 94, 0.75)", borderRadius: "4px" }}
              >
                <Text type="12" fontWeight={700} color={"error050"}>
                  Password is not strong enough
                </Text>
                <Text type="12" fontWeight={500} color={"error050"}>
                  Use 8 or more characters with a mix of uppercase & lowercase letters, and numbers
                </Text>
              </Box>
            )}
            {name === "confirm_password" && error?.message && (
              <Box padding={"8px 16px"} sx={{ background: "rgba(220, 93, 94, 0.75)", borderRadius: "4px" }}>
                <Text type="12" fontWeight={700} color={"error050"}>
                  {error?.message}
                </Text>
              </Box>
            )}
            {error && (
              <Box padding={"8px 16px"} sx={{ background: "rgba(220, 93, 94, 0.75)", borderRadius: "4px" }}>
                <Text type="12" fontWeight={700} color={"error050"}>
                  {error?.message}
                </Text>
              </Box>
            )}
          </Box>
          </>
        )
      }}
    />
  )
}

export default TextFieldInput_Password

const TextFieldInputStyled = styled((props) => (
  <TextField
    InputProps={{
      disableUnderline: true,
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={props.toggleVisible}>
            {props.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </InputAdornment>
      ),
      type: props.visible ? "text" : "password",
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
    fontFamily: "Prompt",
    backgroundColor: "white",
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
