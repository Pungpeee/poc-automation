import { Box, IconButton, Divider, Dialog } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Text, Button } from "../../../components"
import { EditProfileStyled } from "../styled"
import Image from "next/image"

const HelpSupContainer = () => {
  const { TermBox, TermCard, DividerStyled } = EditProfileStyled()
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = (label) => {
    if (label == "About") {
      setOpen(true)
    }
    return null
  }

  const DISPLAY = [
    { label: "About", icon: "about", text: "CERO Wallet 2.0" },
    { label: "Operating Hours", icon: "hour", text: "09:00 - 18:00" },
    { label: "Call Center", icon: "phone", text: "02 714 2490" },
    { label: "Email", icon: "email", text: "support@cerowallet.com" },
    { label: "Website", icon: "website", text: "www.carbon.co.th" },
    { label: "Facebook", icon: "facebook", text: "fb.me/cerowallet_thailand" },
  ]
  return (
    <>
      <Dialog
        fullWidth
        onClose={handleClose}
        // maxWidth={"md"}
        open={open}
        PaperProps={{
          sx: {
            width: "463px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
            gap: "24px",
            boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
            borderRadius: "4px",
          },
        }}
      >
        <Text type={20} fontWeight={700} color="white">
          About
        </Text>
        <Box
          width="100%"
          padding="16px"
          display="flex"
          flexDirection="column"
          borderRadius="4px"
          gap="8px"
          sx={{ background: "white" }}
        >
          <Text type={14} fontWeight={700} color="black">
            Development workflows with programs dApps
            <br />
            (decentralized applications)
            <br />
            <br />
            Check Transaction Details
            <br />
            <br />
            https://solscan.io/
            <br />
            <br />
            https://explorer.solana.com/
            <br />
            <br />
            Your audit live Transaction
            <br />
            <br />
            Search for block, accounts,transactions, programs and <br />
            tokens
          </Text>
        </Box>
        <Button variant="contained_square_green" fullWidth onClick={handleClose}>
          <Text color="white" type="16" fontWeight={600}>
            OK
          </Text>
        </Button>
      </Dialog>
      <TermBox>
        {/* <Box display="flex" flexDirection="column" gap="8px">
          <Text type={20} fontWeight={700} color="white">
            Change language
          </Text>
          <Text type={14} fontWeight={400} color="green040">
            Change language for desktop version only
          </Text>
        </Box> */}
        <Box width="336px" display="flex" flexDirection="column" gap="8px">
          {DISPLAY.map(({ label, icon, text }, index) => (
            <>
              <Box
                width="100%"
                padding="8px"
                display="flex"
                alignItems="center"
                gap="16px"
                onClick={() => handleOpen(label)}
              >
                <Image src={`/help_and_support_${icon}_icon.svg`} alt="" width="34px" height="34px" />
                <Box display="flex" flexDirection="column" width="75%">
                  <Text type={12} fontWeight={600} color="green040">
                    {label}
                  </Text>
                  <Text type={16} fontWeight={700} color="white">
                    {text}
                  </Text>
                </Box>
                {(index == 0 || index == 4 || index == 5) && (
                  <Image src={`/help_and_support_next_icon.svg`} alt="" width="12px" height="11px" />
                )}
              </Box>
              {DISPLAY.length - 1 !== index && <DividerStyled light flexItem />}
            </>
          ))}
        </Box>
      </TermBox>
    </>
  )
}

export default HelpSupContainer
