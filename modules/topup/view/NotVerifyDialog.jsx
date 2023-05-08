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
            Identity verification required
          </Text>
        </Box>
        <Box display="flex" pb="40px" justifyContent="center">
          <Text textAlign="center" type="14" color="black">
            Your account must be verified before making any transaction in this application
          </Text>
        </Box>

        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap="12px">
          <Button fullWidth variant="outlined" onClick={() => router.back()}>
            <Text type={20} fontWeight={700} color="primary">
              Back
            </Text>
          </Button>
          <Button fullWidth variant="contained" onClick={() => router.push("/kyc")}>
            <Text type={20} fontWeight={700} color="white">
              Verify Now
            </Text>
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default NotVerifyDialog
