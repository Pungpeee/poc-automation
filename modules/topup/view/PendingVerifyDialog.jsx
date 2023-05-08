import { Dialog, DialogContent } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import React from "react"
import { Button, Text } from "../../../components"

const NotVerifyDialog = ({ open }) => {
  const router = useRouter()
  return (
    <Dialog
      sx={{
        padding: {
          xs: "24px",
          md: "40px",
        },
      }}
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <Box display="flex" pb="12px" justifyContent="center">
          <Text textAlign="center" type="18" color="black" fontWeight={700}>
            Your KYC is in review
          </Text>
        </Box>
        <Box display="flex" pb="40px" justifyContent="center">
          <Text textAlign="center" type="14" color="black">
            Your information has been successfully submitted! Your verification will be processed within 1-15 days
          </Text>
        </Box>

        <Box width="100%" maxWidth="370px" margin="auto" onClick={() => router.back()}>
          <Button fullWidth variant="contained">
            <Text type={20} fontWeight={700} color="white">
              Back
            </Text>
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default NotVerifyDialog
