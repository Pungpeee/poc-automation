import { Dialog, DialogContent, styled, TextField, InputBase } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { Button, Text } from "../../../components"
import OTPDialog from "./OTPDialog"
import { NumberDialogController } from "./controller"
import { EditController } from "../controller"

const NumberDialog = ({
  open,
  handleclose,
  handleOTPSuccessOpen,
  number,
  handleChangeNumber,
  currentNumber,
  kycNumber,
}) => {
  const { openOTP, handleopenOTP, handlecloseOTP, handleSubmitUser, refCode, handleReqAgain, timer } =
    NumberDialogController()
  const SameNumber = number == currentNumber?.replace("66", "0") || number == currentNumber
  const checkNumber = number.length == 10 && number.slice(0, 1) == "0" && !SameNumber
  

  return (
    <>
      <OTPDialog
        open={openOTP}
        handlecloseOTP={handlecloseOTP}
        number={number}
        handlecloseNumber={handleclose}
        handleReqAgain={handleReqAgain}
        handleOTPSuccessOpen={handleOTPSuccessOpen}
        refCode={refCode}
        timer={timer}
      />
      <Dialog
        fullWidth
        onClose={handleclose}
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
        <Box display="flex" flexDirection="column" alignItems="center" gap="4px">
          <Text type={18} fontWeight={700} color="gray">
            Mobile verification
          </Text>
          <Text type={18} fontWeight={700} color="white">
            Please enter your mobile number
          </Text>
          {/* <InputTextField label="Enter mobile number" id="Number" variant="filled" hiddenLabel /> */}
          <Input
            placeholder="Enter mobile number"
            defaultValue={number}
            sx={{ marginTop: "20px" }}
            onChange={(e) => handleChangeNumber(e.target.value)}
          />
          <Box display="flex" justifyContent="center" gap="8px" sx={{ marginTop: "20px" }}>
            <Button
              variant="contained_square_green"
              sx={{ width: "244px" }}
              onClick={() => {
                handleSubmitUser(number)
              }}
              // onClick={handleopenOTP}
              disabled={kycNumber ? !checkNumber : !(number.length == 10 && number.slice(0, 2) == "08")}
            >
              <Text color="white" type="16" fontWeight={600}>
                Continue
              </Text>
            </Button>
            <Button variant="outlined_square_white" sx={{ width: "244px" }} onClick={handleclose}>
              <Text color="white" type="16" fontWeight={600}>
                Cancel
              </Text>
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

export default NumberDialog

const Input = styled(InputBase)({
  background: "#FFFFFF",
  border: "2px solid #1FA37C",
  borderRadius: "8px",
  padding: "8px 16px",
})
