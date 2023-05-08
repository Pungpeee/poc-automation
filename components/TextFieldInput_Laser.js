import { styled, TextField, InputAdornment, IconButton, Box } from "@mui/material"
import React, { useState } from "react"
import { Controller } from "react-hook-form"
import Text from "./Text"
import Image from "next/image"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import TextMaskCustom from "../components/Form/LaserMaskInput2"

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
            <Box display="flex" flexDirection="column" gap="4px">
              <TextFieldInputStyled
                {...field}
                {...rest}
                visible={visible}
                toggleVisible={toggleVisible}
                onChange={onChange}
                label={label}
                variant="filled"
                
              />
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
      inputComponent:TextMaskCustom,
      endAdornment: (
        <InputAdornment position="end">
          <HtmlTooltip
            arrow
            title={
              <Box padding="16px" display="flex" flexDirection="column" gap="8px" minWidth='290px'>
                <Image src="/Idcard_back.svg" alt="" width="249px" height="156px" />
                <Text type={12} fontWeight={400} color="black" >
                  ตัวอย่างการกรอก Laser code : JT9999999999
                </Text>
              </Box>
            }
            placement="top"
          >
            <span>
              <IconButton disabled>
                <Image src="/hint.svg" alt="" width="20px" height="20px" />
              </IconButton>
            </span>
          </HtmlTooltip>
        </InputAdornment>
      ),
      type: "text",
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

const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      // padding: "16px",
      borderRadius: "16px",
      filter: 'drop-shadow(0px 16px 16px rgba(0, 0, 0, 0.16))'
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: "white",
    },
  })
)
