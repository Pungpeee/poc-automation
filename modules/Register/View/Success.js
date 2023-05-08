import React from "react"
import { Dialog, DialogContent, DialogContentText, DialogActions, styled, Box } from "@mui/material"
import Image from "next/image"
import { Button, Text } from "../../../components"

const SuccessDialog = ({ content, open, handleClose,handleClick  }) => {
  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      // maxWidth={"md"}
      open={open}
      PaperProps={{
        sx: {
          width: "352px",

          display: "flex",
          flexDirection: "column",
          alignItems:'center',
          padding: "16px",
          background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
          boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
          borderRadius: "4px",
          gap: "8px",
        },
      }}
    >
      <Image src="/check_email.logo.svg" alt="" width="80px" height="80px" />
      <Text type="18" fontWeight={700} color="green_neon">
        Check your email
      </Text>
      <Text type="14" fontWeight={500} color="white" textAlign='center'>
        Confirmation email has sent Please check your mailbox with in 24 hours
      </Text>

      <Button variant="contained_square_green" fullWidth onClick={handleClick}>
          <Text type="16" fontWeight={600} color="white">
            Ok
          </Text>
        </Button>
    </Dialog>
  )
}

export default SuccessDialog
