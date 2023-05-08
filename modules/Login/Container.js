import { Box, styled, Radio, RadioGroup, FormControl, FormControlLabel, useTheme } from "@mui/material"
import React, { useState, useEffect } from "react"
import { Button, Text, TextFieldInput, TextFieldInput_Password, Checkbox_Custom } from "../../components"
import Image from "next/image"
import useLoginController from "./controller"
import { padding } from "@mui/system"

const Container = () => {
  const { control, onSubmit, onSubmit_SSO, formRules, isError, router } = useLoginController()
  // const { test, setTest } = useTestAuthContext()
  // const { isAuth } = useAuthContext()
  return (
    <>
      <Main>
        <ImageWrapper>
          <Image src="/login_bg.svg" alt="" width="1071.19px" height="790px" />
        </ImageWrapper>
        <ContainBox>
          <Text type={32} fontWeight={700} color="white">
            Sign in
          </Text>
          <TextFieldInput name={"username"} control={control} label={"Email"} rules={formRules.emailRequiredOnly} />
          <TextFieldInput_Password
            name={"password"}
            control={control}
            label={"Password"}
            rules={formRules.passwordRequiredOnly}
          />
          <RememberandForgetBox>
            <Checkbox_Custom name={"remember"} control={control} label={"Remember me"} labelColor="green_neon" />
            <ForgetWrapper>
              <Text type={14} fontWeight={700} color="white" onClick={() => router.push("/forgot-password")}>
                Forgot password
              </Text>
            </ForgetWrapper>
          </RememberandForgetBox>
          <ErrorWrapper>
            {isError && (
              <ErrorDisplay>
                <Text type={12} fontWeight={600} color="error050">
                  Invalid username or password, try again
                </Text>
              </ErrorDisplay>
            )}
          </ErrorWrapper>
          <Button variant="contained_square_green" fullWidth onClick={onSubmit}>
            {/* <Button variant="contained_square_green" fullWidth onClick={()=>setSuccessDialog(true)}> */}
            <Text type={16} fontWeight={600} color="white">
              Sign in
            </Text>
          </Button>
          {/* <Button variant="contained_square_green" fullWidth onClick={onSubmit_SSO}>
            <Text type={16} fontWeight={600} color="white">
              Sign in SSO
            </Text>
          </Button> */}
          <RegisterWrapper>
            <Text type={16} fontWeight={600} color="white">
              New here?&nbsp;
              <Text type={16} fontWeight={600} color="green_neon" onClick={() => router.push("/register")}>
                Create new account
              </Text>
            </Text>
          </RegisterWrapper>
          {/* <GoogleandFacebookBtnWrapper >
            <Image src="/btn_google.png" alt="" width="163px" height="39px" />
            <Image src="/btn_facebook.png" alt="" width="234px" height="38px" />
          </GoogleandFacebookBtnWrapper> */}
        </ContainBox>
      </Main>
      <DownloadBanner />
    </>
  )
}

export default Container

const DownloadBanner = () => {
  const theme = useTheme()
  return (
    <BannerWrapper>
      <BannerMain>
        <BannerContain>
          <Box display="flex" flexDirection="column" gap="8px">
            <Text type={18} fontWeight={700} color="white">
              DOWNLOAD APP
            </Text>
            <Text type={24} fontWeight={700} color="white">
              LET YOU CONNECT TO CARBON COIN
            </Text>
          </Box>
          <Text type={14} fontWeight={400} color="green040" sx={{ maxWidth: "533px" }}>
            A platform for exchanging goods and services by tracking green activity in daily life through tokenized on
            blockchain to become CERO tokens from various technologies in the form of play to earn.
          </Text>
          <Button
            variant="outlined_square_white"
            sx={{
              width: "327px",
              [theme.breakpoints.down("ex_sm")]: {
                width: "250px",
              },
            }}
          >
            {/* <Button variant="contained_square_green" fullWidth onClick={()=>setSuccessDialog(true)}> */}
            <Text type={16} fontWeight={600} color="white">
              Download now!
            </Text>
          </Button>
        </BannerContain>
        <BannerImage>
          <Image src="/APPSTORE.svg" alt="" width="167.48px" height="215.56px" />
          <Image src="/GGPLAY.svg" alt="" width="167.48px" height="215.56px" />
        </BannerImage>
      </BannerMain>
    </BannerWrapper>
  )
}

//************************* styled *******************************/
const Main = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "790px",
  // minHeight: "790px",
  // padding: "128px 0px 76px 0px",
  // display: "flex",
  // justifyContent: "center",
  background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    minHeight: "90vh",
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "800px",
  },
}))

const ContainBox = styled(Box)(({ theme }) => ({
  width: "384px",
  top: 124,
  left: 252,
  position: "absolute",
  padding: "32px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  [theme.breakpoints.down("md")]: {
    width: "300px",
    top: "10%",
    left: "10%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "300px",
    top: "35%",
    left: "10%",
  },
  [theme.breakpoints.down("ex_sm")]: {
    width: "230px",
    top: "30%",
    left: "12%",
    padding: "10px",
  },
}))

const ImageWrapper = styled(Box)({
  position: "absolute",
  right: 0,
})

const RememberandForgetBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}))

const ForgetWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "4px 14px 4px 14px",
})

const ErrorWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "0px 18px 0px 18px",
})

const ErrorDisplay = styled(Box)({
  background: "rgba(220, 93, 94, 0.75)",
  borderRadius: "4px",
  padding: "4px 16px",
  display: "flex",
  alignItems: "center",
})

const RegisterWrapper = styled(Box)({
  padding: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const GoogleandFacebookBtnWrapper = styled(Box)({
  minWidth: "400px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginLeft: -40,
})

const BannerWrapper = styled(Box)({
  background: "#006A76",
  width: "100%",
  //   height: "100%",
  justifyContent: "center",
  padding: "32px 0px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
})

const BannerMain = styled(Box)(({ theme }) => ({
  width: "100%",
  //   height: "100%",
  padding: "0px 32px",
  display: "flex",
  justifyContent:'center',
  gap: "100px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    padding: "0px 10px",
    gap: "20px",
  },
}))

const BannerContain = styled(Box)(({ theme }) => ({
  display: "flex",
  //   height: "100%",
  flexDirection: "column",
  padding: "32px 16px",
  gap: "24px",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
}))

const BannerImage = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "24px",
  alignItems: "center",
  flex:' 0 0 auto',
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}))
