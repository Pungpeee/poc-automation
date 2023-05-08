import {
  Container,
  Grid,
  styled,
  Box,
  Divider,
  FilledInput,
  TextField,
  InputAdornment,
  ButtonBase,
  IconButton,
  Step,
  Stepper,
  StepLabel,
} from "@mui/material"
import { Controller } from "react-hook-form"
import React, { useEffect, useState } from "react"
import {
  Text,
  Button,
  TextFieldInput,
  TextFieldInput_Laser,
  Checkbox_Custom,
  Select2,
  DatePickerForm2,
  Select,
} from "../../components"
import { step1Controller } from "./controller"
import { COLORS } from "../../theme"
import Image from "next/image"

const steps = ["Personal Information", "Upload Documents", "Verify information"]
const titleTh = [
  {
    key: "0",
    value: 0,
    display: "นาย",
  },
  {
    key: "1",
    value: 1,
    display: "นาง",
  },
  {
    key: "2",
    value: 2,
    display: "นางสาว",
  },
]
const titleEn = [
  {
    key: "0",
    value: 0,
    display: "Mr.",
  },
  {
    key: "1",
    value: 1,
    display: "Mrs.",
  },
  {
    key: "2",
    value: 2,
    display: "Ms.",
  },
]

export default function KYCContainer() {
  //*===================================================*//
  const { control, MinDate, MaxDate, activeStep, handleNext, handleBack, handleSubmitUser, formRules } =
    step1Controller()

  return (
    <MainBox>
      <Wrapper>
        <Text type={20} fontWeight={700} color="white">
          Verify your Account
        </Text>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {}
            const labelProps = {}
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {
          {
            0: (
              <ContainBox_Step1>
                <Box padding="16px 0px">
                  <Text type={16} fontWeight={600} color="white">
                    Personal eKYC
                  </Text>
                </Box>
                <DividerStyled light flexItem />
                <TextWrapper_Step1>
                  <Text type={16} fontWeight={600} color="white">
                    English information
                  </Text>
                  <Text type={12} fontWeight={500} color="green040">
                    * As shown on ID
                  </Text>
                </TextWrapper_Step1>
                <InputWrapper>
                  <Box sx={{ width: "20%" }}>
                    <Select2  name={"en_title"} control={control} menus={titleEn} placeholder="Title" fullWidth />
                  </Box>
                  <TextFieldInput
                    name={"eng_fname"}
                    control={control}
                    label={"First name"}
                    sx={{ width: "40%" }}
                    // rules={formRules.first_name}
                  />
                  <TextFieldInput
                    name={"eng_lname"}
                    control={control}
                    label={"Last name"}
                    sx={{ width: "40%" }}
                    // rules={formRules.last_name}
                  />
                </InputWrapper>
                <DividerStyled light flexItem />
                <TextWrapper_Step1>
                  <Text type={16} fontWeight={600} color="white">
                    Thai information
                  </Text>
                  <Text type={12} fontWeight={500} color="green040">
                    * As shown on ID
                  </Text>
                </TextWrapper_Step1>
                <InputWrapper>
                  <Box sx={{ width: "20%" }}>
                    <Select2 name={"th_title"} control={control} menus={titleTh} placeholder="คำนำหน้า" fullWidth />
                  </Box>
                  <TextFieldInput
                    name={"th_fname"}
                    control={control}
                    label={"ชื่อ"}
                    sx={{ width: "40%" }}
                    // rules={formRules.first_name_thai}
                  />
                  <TextFieldInput
                    name={"th_lname"}
                    control={control}
                    label={"นามสกุล"}
                    sx={{ width: "40%" }}
                    // rules={formRules.last_name_thai}
                  />
                </InputWrapper>
                <DividerStyled light flexItem />
                <TextWrapper_Step1>
                  <Text type={16} fontWeight={600} color="white">
                    Citizen ID information
                  </Text>
                  <Text type={12} fontWeight={500} color="green040">
                    * As shown on ID
                  </Text>
                </TextWrapper_Step1>
                <InputWrapper>
                  <TextFieldInput
                    name={"id_card"}
                    control={control}
                    label={"ID Number"}
                    sx={{ width: "60%" }}
                    // rules={formRules.id_card}
                  />
                  <TextFieldInput_Laser
                    name={"laser_code"}
                    control={control}
                    label={"Laser Number"}
                    // sx={{ width: "40%" }}
                    // rules={formRules.laser_code}
                  />
                </InputWrapper>
                <InputWrapper>
                  <DatePickerForm2
                    isRequired
                    minDate={MinDate}
                    maxDate={MaxDate}
                    name="date_birth"
                    placeholder="DD/MM/YYYY"
                    label="Date of Birth"
                    sx={{ width: "310px" }}
                    // rules={formRules.date_birth}
                    control={control}
                  />
                </InputWrapper>
                <DividerStyled light flexItem />
                <Checkbox_Custom
                  name={"rules1"}
                  control={control}
                  label={"I read and agree to share my personal information to CERO Wallet"}
                />
                <ButtonWrapper>
                  <Button fullWidth variant="outlined_square_white" onClick={handleNext}>
                    <Text color="white" type="16" fontWeight={600} >
                      Skip
                    </Text>
                  </Button>
                  <Button fullWidth variant="contained_square_green" onClick={handleSubmitUser}>
                    <Text color="white" type="16" fontWeight={600}>
                      Continue
                    </Text>
                  </Button>
                </ButtonWrapper>
              </ContainBox_Step1>
            ),
            1: (<ContainBox_Step1 >
              55555555555555555555555
              <ButtonWrapper>
                  <Button fullWidth variant="outlined_square_white" onClick={handleNext}>
                    <Text color="white" type="16" fontWeight={600} >
                      Skip
                    </Text>
                  </Button>
                  <Button fullWidth variant="contained_square_green" onClick={handleBack}>
                    <Text color="white" type="16" fontWeight={600}>
                      Back
                    </Text>
                  </Button>
                </ButtonWrapper>
            </ContainBox_Step1>),
            2: null,
          }[activeStep]
        }
      </Wrapper>
    </MainBox>
  )
}

const MainBox = styled(Box)({
  background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
  display: "flex",
  justifyContent: "center",
  padding: "15px 0px 35px 0px",
})

const ContainBox_Step1 = styled(Box)({
  width: "720px",
  background: "rgba(165, 218, 203, 0.1)",
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  gap: "16px",
})

const Wrapper = styled(Box)({
  width: "720px",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
})

const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: "#A5DACB",
}))

const TextWrapper_Step1 = styled(Box)({
  display: "flex",
  flexDirection: "column",
})

const InputWrapper = styled(Box)({
  height: "60px",
  width: "100%",
  gap: "16px",
  display: "flex",
})

const ButtonWrapper = styled(Box)({
  width: "100%",
  height: "48px",
  display: "flex",
  gap: "16px",
})
