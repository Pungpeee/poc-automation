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
  IconButton
} from "@mui/material"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import React, { useEffect, useState } from "react"
import { Text, Button } from "../../components"
import { COLORS } from "../../theme"
import Image from "next/image"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"

export const EditProfileStyled = () => {
  const Main = styled(Box)({
    width: "100%",
    height: "100%",
    padding: "24px 334px 80px 334px",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
    position: "relative",
  })

  const MainBox = styled(Box)({
    background: "rgba(165, 218, 203, 0.1)",
    boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
    borderRadius: "8px",
    padding: "16px 24px",
    width: "100%",
    height: "100%",
  })

  const KycDisplay = styled(Box)({
    background: "rgba(220, 93, 94, 0.8)",
    borderRadius: "4px",
    boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
    padding: "8px",
    display: "flex",
    gap: "5px",
    justifyContent: "center",
  })

  const MainDisplay = styled(Box)({
    display: "flex",
    height: "100%",
    gap: "16px",
    width: "100%",
    padding: "16px 24px",
    marginTop: "24px",
    background: "rgba(165, 218, 203, 0.1)",
    boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
    borderRadius: "8px",
  })

  const ButtonBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: "167px",
  })

  const EditButton = styled(ButtonBase)(({ current, value }) => ({
    borderRadius: "26px",
    background: current == value ? "rgba(165, 218, 203, 0.25)" : null,
    padding: "8px 16px",
    display: "flex",
    justifyContent: "flex-start",
  }))

  const DividerStyled = styled(Divider)(({ theme }) => ({
    borderColor: "#A5DACB",
  }))

  const ProfileBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    paddingBottom: "14px",
    justifyContent: "flex-start",
    minWidth: "333px",
  })

  const NameIcon = styled(Box)(({ theme }) => ({
    textTransform: "uppercase",
    width: "100px",
    height: "100px",
    background: COLORS.GREEN040,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  }))

  const InputTextField = styled((props) => (
    <TextField
      InputProps={{
        disableUnderline: true,
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiFilledInput-root": {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: "white",
      transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
      "&:hover": {
        backgroundColor: "white",
      },
      "&.Mui-focused": {
        backgroundColor: "white",
        borderColor: "white",
        color: "black",
      },
      // transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    },
  }))
  const InputTextFieldNumber = styled((props) => (
    <TextField
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">{props.number_kyc ? <Tag_verified /> : <Tag_unverified />}</InputAdornment>
        ),
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiFilledInput-root": {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: "white",
      transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
      "&:hover": {
        backgroundColor: "white",
      },
      "&.Mui-focused": {
        backgroundColor: "white",
        borderColor: "white",
        color: "black",
      },
      // transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    },
  }))

  const EmailAlert = styled(Box)({
    background: "rgba(220, 93, 94, 0.75)",
    borderRadius: "4px",
    padding: "8px 16px",
    visibility: "hidden",
  })

  const ImageWrapper = styled(Box)({
    borderRadius: "50%",
    maxHeight: "100px",
    maxWidth: "100px",
    overflow: "hidden",
  })

  const FooterButton = styled(Box)({
    background: "#292726",
    width: "100%",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    padding: "16px ",
    gap: "16px",
  })

  const Kyc_Check_Unverify = (props) => {
    const { handleOnclick } = props
    return (
      <KycDisplay onClick={handleOnclick}>
        <Image src="/Alert.svg" width="14px" height="13px" />
        <Text type={14} fontWeight={500} color="white">
          Your account is not verify, please check your mailbox with in 24 hours
        </Text>
      </KycDisplay>
    )
  }
  const Kyc_Check_Verify = () => {
    return (
      <KycDisplay sx={{ background: "rgba(89, 178, 159, 0.8)" }}>
        <Image src="/Verify.svg" width="14px" height="13px" />
        <Text type={14} fontWeight={500} color="white">
          Your account has been verified
        </Text>
      </KycDisplay>
    )
  }
  const Kyc_Check_Inreview = () => {
    return (
      <KycDisplay sx={{ background: "rgba(239, 178, 116, 0.8)" }}>
        <Image src="/Inreview.svg" width="14px" height="13px" />
        <Text type={14} fontWeight={500} color="white">
          Your KYC is in review. If your account doesn't approve with in 72 hours, please contact our admin
          (admin@vekin.co)
        </Text>
      </KycDisplay>
    )
  }

  const Tag_verified = () => {
    return (
      <Box
        display="flex"
        alignItems="center"
        sx={{ minWidth: "79px", borderRadius: "16px", background: "#F1F3F5", padding: "5px 8px" }}
      >
        <Image src="/icon_verified.svg" width="20px" height="20px" />
        <Text color="forestgreen" type="12" fontWeight={700}>
          Verified
        </Text>
      </Box>
    )
  }
  const Tag_unverified = () => {
    return (
      <Box display="flex" alignItems="center" sx={{ borderRadius: "16px", background: "#F1F3F5", padding: "5px 8px" }}>
        <Text color="gray9797" type="12" fontWeight={700}>
          No verify
        </Text>
      </Box>
    )
  }

  const Success_Label = ({ handleclose, label }) => {
    return (
      <Box
        // width="600px"
        // height="38px"
        sx={{
          maxWidth: "363px",
          background: "#4CB596",
          position: "absolute",
          zIndex: 2,
          right: 19,
          top: 25,
          boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
          borderRadius: "8px",
          padding: "10.5px 16px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* <Text type={14} fontWeight={500} color="white">
          Your mobile number {number} is verified
        </Text> */}
        <Text type={14} fontWeight={500} color="white">
          {label}
        </Text>
        <IconButton onClick={handleclose}>
          <Image src="/close2.svg" alt="" width="12px" height="12px" />
        </IconButton>
      </Box>
    )
  }

  const Button_Display = (props) => {
    const { current, handlecurrent, profileButton } = props
    return (
      <ButtonBox>
        {profileButton?.map(({ label, value, href }) => {
          return (
            <EditButton
              key={label}
              disableRipple
              current={current}
              value={value}
              onClick={() => handlecurrent(value, href)}
            >
              <Text type={14} fontWeight={700} color="white">
                {label}
              </Text>
            </EditButton>
          )
        })}
      </ButtonBox>
    )
  }

  //**************************** Term & Condition ***********************

  const TermBox = styled(Box)({
    display: "flex",
    gap: "24px",
    flexDirection: "column",
    // minWidth:'521px'
    width: "100%",
    // backgroundColor:'red'
  })

  const TermCard = styled(Box)({
    background: "white",
    borderRadius: "4px",
    overflowY: "scroll",
    padding: "16px",
    height: "200px",
    width:'600px',
  })

  //**************************** Delete Acc **********************************************

  const BoxWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  })

  const PasswordTextField = styled((props) => (
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
      border: "1px solid #e2e2e1",
      width: "50%",
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

  //**************************** Change Password *****************************************
  const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
    ({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "16px",
      },
      [`& .${tooltipClasses.arrow}`]: {
        color: "white",
      },
    })
  )

  //**************************** Help and Support *****************************************


  return {
    Main,
    MainBox,
    KycDisplay,
    MainDisplay,
    ButtonBox,
    EditButton,
    DividerStyled,
    ProfileBox,
    NameIcon,
    InputTextField,
    InputTextFieldNumber,
    EmailAlert,
    ImageWrapper,
    FooterButton,
    Kyc_Check_Unverify,
    Kyc_Check_Verify,
    Kyc_Check_Inreview,
    Success_Label,
    Button_Display,
    //**************************** Term & Condition ***********************
    TermBox,
    TermCard,
    //**************************** Delete Acc *****************************
    BoxWrapper,
    PasswordTextField,
    //**************************** Change Pass *****************************
    HtmlTooltip
  }
}
