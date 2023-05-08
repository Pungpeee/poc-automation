import { Dialog, DialogContent } from "@mui/material"
import { Box } from "@mui/system"
import Link from "next/link"
import React from "react"
import { Button, Text } from "../../../components"

const CompleteDialog = ({ open }) => {
  return (
    <Dialog
      sx={{
        padding: {
          xs: "24px",
          md: "40px",
        },
      }}
      open={open}
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <Box display="flex" pb="24px" justifyContent="center">
          <svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="41.5" cy="41.5" r="41.5" fill="#00B299" />
            <path
              d="M64.8189 27.666L33.8421 57.7041L19.7617 44.0504"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
        <Box display="flex" pb="12px" justifyContent="center">
          <Text textAlign="center" type="18" color="primary" fontWeight={700}>
            Thank you for your submission
          </Text>
        </Box>
        <Box display="flex" pb="40px" justifyContent="center">
          <Text textAlign="center" type="14" color="primary">
            Your information has been successfully submitted! Your verification will be processed within 1-15 days
          </Text>
        </Box>

        <Box width="100%" maxWidth="370px" margin="auto" onClick={() => (window.location.pathname = "/")}>
          <Button fullWidth variant="contained">
            Continue
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CompleteDialog
