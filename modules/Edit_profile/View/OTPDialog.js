import { Dialog, DialogContent, styled, TextField, InputBase } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { Button, Text } from "../../../components"
import { MuiOtpInput } from "mui-one-time-password-input"
import { useVerifyOtp } from "../../../adapter/query/account"
import { NumberDialogController } from "./controller"

const OTPDialog = ({
  open,
  handlecloseOTP,
  handlecloseNumber,
  handleOTPSuccessOpen,
  number,
  refCode,
  handleReqAgain,
  timer
}) => {
  let numberFormat = number?.replace("66", "0")
  const { OTP, handleOTPChange, error, seterror, setOTP } =
    NumberDialogController()
  const checkTimeout = timer.getTimeValues().seconds == 0
  const router = useRouter()
  const { data, isError, refetch, isSuccess } = useVerifyOtp({
    payload: {
      otp: OTP,
    },
    options: {
      onSuccess: (d) => {
        setOTP("")
        handlecloseNumber()
        handlecloseOTP()
        handleOTPSuccessOpen()
      },
      onError: () => {
        seterror(true)
        setOTP("")
      },
      enabled: false,
    },
  })

  useEffect(() => {
    if (open) {
      timer.start()
    }
  }, [open, refCode])

  return (
    <Dialog
      fullWidth
      onClose={handlecloseOTP}
      // maxWidth={"md"}
      open={open}
      PaperProps={{
        sx: {
          // minWidth: "463px",
          padding: "16px",
          backgroundImage: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
          boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
          borderRadius: "4px",
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        alignContent="center"
        justifyContent="center"
        gap="4px"
      >
        <Text type={18} fontWeight={700} color="gray">
          Verify mobile number
        </Text>
        <Text type={14} fontWeight={500} color="white" textAlign="center">
          We will send you a 6-digit verification code to {numberFormat} for mobile number verification
        </Text>
        <OTPInput value={OTP} onChange={handleOTPChange} length={6} sx={{ marginTop: "24px" }} />
        <Text color="green040" type="12" fontWeight={600} sx={{ marginTop: "8px" }}>
          Ref : {refCode}
        </Text>
        {error && (
          <Text color="error050" type="14" fontWeight={600} sx={{ marginTop: "28px" }}>
            Invalid OTP, Try again
          </Text>
        )}
        <Box display="flex" alignItems="center" gap="4px" sx={{ marginTop: "8px" }}>
          <Text color="white" type="14" fontWeight={600} sx={{ marginTop: "8px" }}>
            Don't recieve a code?
          </Text>
          <Text
            color={checkTimeout ? "green080" : "green040"}
            type="14"
            fontWeight={600}
            sx={{ marginTop: "8px" }}
            onClick={() => handleReqAgain(number,timer.getTimeValues().seconds)}
          >
            Request again
          </Text>
        </Box>
        <Text color="white" type="14" fontWeight={600} sx={{ marginTop: "8px" }}>
          in {timer.getTimeValues().seconds}s
        </Text>
        <Box display="flex" justifyContent="center" gap="8px" sx={{ marginTop: "36px" }}>
          <Button
            variant="contained_square_green"
            sx={{ width: "244px" }}
            onClick={() => refetch()}
            disabled={!(OTP.length == 6)}
          >
            <Text color="white" type="16" fontWeight={600}>
              Continue
            </Text>
          </Button>
          <Button variant="outlined_square_white" sx={{ width: "244px" }} onClick={handlecloseOTP}>
            <Text color="white" type="16" fontWeight={600}>
              Cancel
            </Text>
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}

export default OTPDialog

const OTPInput = styled(MuiOtpInput)({
  "& .MuiInputBase-root": {
    background: "white",
    maxWidth: "40px",
    maxHeight: "48px",

    "&:hover fieldset": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },

    "&.Mui-focused fieldset": {
      border: "2px solid #1FA37C", // focus
    },
  },
})
