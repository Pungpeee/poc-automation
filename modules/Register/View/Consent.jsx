import React from "react"
import { Dialog, DialogContent, DialogContentText, DialogActions, styled, Box } from "@mui/material"
import Image from "next/image"
import { Button, Text } from "../../../components"

const WrapperImage = styled("div")(({ theme }) => ({
  width: "55.38px",
  height: "55.38px",
}))

const WrapperText = styled("div")({
  display: "flex",
  flexDirection: "column",
})

const ContainButton = styled("div")(({ theme }) => ({
  width: "173px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}))

const Consent = ({ topic, body, isOpen, renderContent, onClose, onSubmit, disabled }) => {
  return (
    <Dialog open={isOpen} maxWidth="md">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px", padding: "38px" }}>
          <WrapperImage>
            <Image src="/wallet.svg" alt="Picture of the author" width="100%" height="100%" />
          </WrapperImage>
          <WrapperText>
            <Text color="label2" type="20" fontWeight="700">
              CARBON
            </Text>
            <Text color="label2" type="20" fontWeight="700">
              WALLET
            </Text>
          </WrapperText>
        </Box>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Text color="black" type="18" fontWeight="700">
          {topic}
        </Text>
      </Box>

      <DialogContent sx={{ overflowX: "hidden", display: "flex", flexDirection: "column", gap: 2, minHeight: 300 }}>
        <DialogContentText id="alert-dialog-description">{renderContent}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ gap: 1, mx: 2, pb: 5, justifyContent: "center" }}>
        <ContainButton>
          <Button disabled={disabled} variant="outlined_rounded" fullWidth onClick={onClose}>
            <Text type={20} fontWeight={700} color="primary">
              Deny
            </Text>
          </Button>
        </ContainButton>

        <ContainButton>
          <Button disabled={disabled} variant="contained_rounded" fullWidth onClick={onSubmit}>
            <Text type={20} fontWeight={700} color="white">
              AGREE
            </Text>
          </Button>
        </ContainButton>
      </DialogActions>
    </Dialog>
  )
}

export default Consent
