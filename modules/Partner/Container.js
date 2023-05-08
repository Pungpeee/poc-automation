import { Container as ContainerMUI, Grid, styled, Box, TextField, Checkbox } from "@mui/material"
import ButtonBase from "@mui/material/ButtonBase"
import React, { Component, useState, useEffect, useCallback } from "react"
// import { useAuthContext } from "../../contexts/auth/consume"
// import { useQueryCarbonAcitivity, useQueryRank } from "../../adapter/query"
import { Text, Button, Select } from "../../components"
import { useForm, Controller } from "react-hook-form"
// import { COLORS } from "../../theme"
// import { CardItem } from "./View"
import Image from "next/image"
import axios from "axios"
import PartnerController from "./controller"

const PartnerContainer = () => {
  const { state, setState, control, handleSend, theme, formRules, number, handleChangeNumber } = PartnerController()
  return (
    <Container>
      {state == 1 && (
        <MainBox gap={"28px"}>
          <Wrapper>
            <TextFieldInput
              name={"name"}
              control={control}
              label={"Your Name Contact"}
              rules={formRules.name}
              sx={{
                width: "385px",
                height: "48px",
                [theme.breakpoints.down("sm")]: {
                  width: "300px",
                },
              }}
            />
            <TextFieldInput
              name={"company"}
              control={control}
              label={"Company"}
              rules={formRules.company}
              sx={{
                width: "385px",
                height: "48px",
                [theme.breakpoints.down("sm")]: {
                  width: "300px",
                },
              }}
            />
          </Wrapper>
          <Wrapper>
            {/* <TextFieldInput_Number
              name={"phone"}
              control={control}
              label={"Phone Number"}
              rules={formRules.number}
              sx={{
                width: "385px",
                height: "48px",
                [theme.breakpoints.down("sm")]: {
                  width: "300px",
                },
              }}
            /> */}
            <Controller
              name={"Phone Number"}
              rules={formRules.number}
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <TextFieldInputStyled
                      label={"Phone Number"}
                      sx={{
                        width: "385px",
                        height: "48px",
                        [theme.breakpoints.down("sm")]: {
                          width: "300px",
                        },
                      }}
                      value={number}
                      onChange={(e) => handleChangeNumber(e.target.value)}
                      variant="filled"
                    />
                    {error && (
                      <Text type="12" fontWeight={400} color="red" fontFamily="Prompt">
                        *** {error.message}
                      </Text>
                    )}
                  </Box>
                )
              }}
            />
            {/* <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <TextFieldInputStyled
                label={"Phone Number"}
                sx={{
                  width: "385px",
                  height: "48px",
                  [theme.breakpoints.down("sm")]: {
                    width: "300px",
                  },
                }}
                defaultValue={""}
                value={number}
                onChange={(e) => handleChangeNumber(e.target.value)}
                variant="filled"
              />
            </Box> */}
            <TextFieldInput
              name={"email"}
              control={control}
              label={"Email"}
              rules={formRules.email}
              sx={{
                width: "385px",
                height: "48px",
                [theme.breakpoints.down("sm")]: {
                  width: "300px",
                },
              }}
            />
          </Wrapper>
          <Wrapper_2>
            <TextFieldInput
              multiline
              rows={4}
              name={"details"}
              control={control}
              label={"Details"}
              sx={{ width: "100%", height: "125px" }}
            />

            <Checkbox_Custom
              control={control}
              name={"check"}
              disableRipple
              label={"Confirm to Vekin Co.,Ltd. contact you back"}
            />
          </Wrapper_2>
          <Button variant="contained_square_green_partner" disableRipple onClick={() => handleSend()}>
            <Text type="16" fontWeight={600} color="white" fontFamily="Prompt">
              Send
            </Text>
          </Button>
        </MainBox>
      )}
      {state == 2 && (
        <MainBox>
          <Image src="/icon_check_partner.svg" alt="" width="82px" height="82px" />
          <TextWrapper>
            <Text type="20" fontWeight={700} color="gray666" fontFamily="Prompt">
              THANK YOU
            </Text>
            <Image src="/logo_smile_partner.svg" alt="" width="20px" height="20px" />
          </TextWrapper>
          <Text
            type="12"
            fontWeight={500}
            textAlign={"center"}
            sx={{ width: "220px" }}
            color="gray666"
            fontFamily="Prompt"
          >
            Our team will contact back shortly. Thank you for your interest in us.
          </Text>
          <Button variant="contained_square_green_partner_2" disableRipple onClick={()=>window.location.href = "/"}>
            <Text type="16" fontWeight={600} color="white" fontFamily="Prompt">
              Close
            </Text>
          </Button>
        </MainBox>
      )}
    </Container>
  )
}

export default PartnerContainer

const Container = styled(Box)({
  minHeight: " calc(100vh - 58px)",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const MainBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "40px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "16px",
  },
}))

const Wrapper_2 = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
})

const TextWrapper = styled(Box)({
  display: "flex",
  gap: "4px",
  alignItems: "center",
  marginTop: "17px",
})

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
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <TextFieldInputStyled
              {...rest}
              label={label}
              value={value}
              defaultValue={defaultValue}
              onChange={onChange}
              variant="filled"
            />
            {error && (
              <Text type="12" fontWeight={400} color="red" fontFamily="Prompt">
                *** {error.message}
              </Text>
            )}
          </Box>
        )
      }}
    />
  )
}

const TextFieldInput_Number = ({
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
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const onChangeNumber = (e) => {
          // return null
          const val = e.target.value
          // console.log(val)
          // const isMatchedRegex = new RegExp(/^(\d*|(\d)+([.]\d{0}))?$/g).test(val)
          // const isMatchedHaveNumber = new RegExp(/[0-9]/g).test(val)
          // if (!isMatchedRegex) {
          //   return null
          // }
          // if (/^[0-9]*$/.test(val) && val.length <= 10) {
          // onChange(val)
          // } else {
          //   return
          // }
        }
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <TextFieldInputStyled
              {...rest}
              label={label}
              value={value}
              defaultValue={""}
              onChange={(e) => onChangeNumber(e)}
              variant="filled"
            />
            {error && (
              <Text type="12" fontWeight={400} color="red" fontFamily="Prompt">
                *** {error.message}
              </Text>
            )}
          </Box>
        )
      }}
    />
  )
}

const TextFieldInputStyled = styled((props) => (
  <TextField
    InputProps={{
      disableUnderline: true,
    }}
    {...props}
  />
))(({ theme }) => ({
  "& label": {
    fontFamily: "Prompt",
    fontWeight: 400,
    fontSize: "12px",
    color: "#979797",
  },
  "& label.Mui-focused": {
    fontFamily: "Prompt",
    fontWeight: 400,
    fontSize: "12px",
    color: "#979797",
  },
  "& .MuiFilledInput-root": {
    width: "100%",
    overflow: "hidden",
    fontFamily: "Prompt",
    fontWeight: 500,
    fontSize: "14px",
    color: "#1FA37C",
    borderRadius: "4px",
    border: "1px solid #E5E5E5",
    backgroundColor: "#FFF",
    "&:hover": {
      backgroundColor: "#FFF",
    },
    "&.Mui-focused": {
      backgroundColor: "#FFF",
    },
    input: {
      "&::placeholder": {
        fontSize: "16px",
        fontWeight: 400,
        fontFamily: "Prompt",
      },
    },
  },
}))

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
            <Box display="flex" alignItems="center" gap="10px">
              <CheckBox onChange={onChange} disableRipple checked={value} {...rest} sx={rest.sx} />
              <Text type="12" fontWeight={400} color={"gray666"} sx={{ fontFamily: "Prompt" }}>
                {label}
              </Text>
            </Box>
          </>
        )
      }}
    />
  )
}

const CheckBox = styled(Checkbox)({
  padding: "0px",
  color: "#1FA37C",
  "&.Mui-checked": {
    color: "#1FA37C",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "18px",
  },
})
