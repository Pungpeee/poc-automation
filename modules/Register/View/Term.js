import React from "react"
import { Dialog, DialogContent, DialogContentText, DialogActions, styled, Box } from "@mui/material"
import Image from "next/image"
import { Button, Text } from "../../../components"

const TermDialog = ({ content, open, handleClose,agree,disagree,term }) => {
  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      // maxWidth={"md"}
      open={open}
      PaperProps={{
        sx: {
          width: "536px",
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
          boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
          borderRadius: "4px",
          gap: "16px",
        },
      }}
    >
      <Image src="/Carbon_wallet_logo.svg" alt="" width="151px" height="96px" />
      <TermCard>
        {term}
        
      </TermCard>
      <Box display="flex" gap="8px" justifyContent="center" width="100%" >
        <Button variant="contained_square_green" onClick={agree} disableRipple sx={{ flex: "0 0 50%" }}>
          <Text type="16" fontWeight={600} color="white">
            Agree
          </Text>
        </Button>
        <Button variant="outlined_square_2" onClick={disagree} disableRipple sx={{ flex: "0 0 50%" }}>
          <Text type="16" fontWeight={600} color="white">
            Disagree
          </Text>
        </Button>
      </Box>
    </Dialog>
  )
}

export default TermDialog

const TermCard = styled(Box)({
  background: "#fff",
  borderRadius: "4px",
  padding: "16px",
  height: "383px",
  overflowY: "scroll",
  
})
