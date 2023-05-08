import React from "react"
import IconButton from "@mui/material/IconButton"
import { styled, Grid, Divider, Box } from "@mui/material"
import { COLORS } from "../theme"
import Image from "next/image"
import { Text } from "../components"
import Link from "next/link"
import useDownloader from "react-use-downloader"
import { useRouter } from "next/router"

const FooterStyled = styled("footer")(({ theme }) => ({
  width: "100%",
  // position: "relative",
  bottom: "0px",
  left: "auto",
  right: "0px",
  boxSizing: "border-box",
  backgroundColor: COLORS.GRAY900,
  padding: "48px 120px 48px 120px",
  [theme.breakpoints.down("md")]: {
    padding: "48px 18px 48px 18px",
  },
}))

const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: COLORS.DIVIDER_FOOTER,
  margin: "16px 0 36px 0",
  [theme.breakpoints.down("md")]: {
    margin: "16px 0",
  },
}))

const WrapperImage = styled("div")(({ theme }) => ({
  width: "55.38px",
  height: "55.38px",
}))

const WrapperText = styled("div")(({ theme }) => ({
  maxWidth: "284px",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "200px",
  },
}))

const BoxStyled = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    alignItems: "flex-start",
    flexDirection: "column-reverse",
  },
}))

const TextBoxStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  minWidth: "33%",
  flexDirection: "column",
  alignItems: "flex-start",
  [theme.breakpoints.down("sm")]: {
    minWidth: "160px",
  },
  // flex:'0 0 33%',
  // color:'white'
}))

const Wrapper_1 = styled(Box)({
  display: "flex",
  gap: "24px",
})

const Wrapper_1_Sub_1 = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width:'81%',
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "16px",
  },
}))
const Wrapper_1_Sub_1_1 = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  alignItems: "flex-end",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "16px",
  },
}))

const IconButtonWrapper = styled(IconButton)(({theme})=>({
  width:'20px',
   height:'15px',
  [theme.breakpoints.down("ex_sm")]: {
   width:'15px',
   height:'10px'
  },
}))

const Footer = () => {
  const { download } = useDownloader()
  const fileUrl = "/example.pdf"
  const filename = "example.pdf"

  const router = useRouter()
  return (
    <FooterStyled>
      <Box display="flex" flexDirection="column">
        <Box display="flex" width="100%" height="100%" sx={{ rowGap: "24px" }} flexWrap="wrap">
          <TextBoxStyle>
            <Text type={14} fontWeight={700} color="gray9797">
              Quick links
            </Text>
            <br />
            <Text type={14} fontWeight={700} color="gray9797">
              Leaderboard
            </Text>
            <Text type={14} fontWeight={700} color="gray9797" onClick={() => router.push("/marketplace")}>
              NFT Marketplace
            </Text>
            <Text type={14} fontWeight={700} color="gray9797" onClick={() => router.push("/download-app")}>
              Download app
            </Text>
            <Text type={14} fontWeight={700} color="gray9797">
              FAQ
            </Text>
          </TextBoxStyle>
          <TextBoxStyle>
            <Text type={14} fontWeight={700} color="gray9797">
              CERO Wallet
            </Text>
            <br />
            <Text type={14} fontWeight={700} color="white" onClick={() => router.push("/privacy-policy")}>
              Term & Conditions
            </Text>
            <Text type={14} fontWeight={700} color="white" onClick={() => router.push("/term-and-condition")}>
              Privacy & Policy
            </Text>
          </TextBoxStyle>
          <TextBoxStyle onClick={() => download(fileUrl, filename)}>
            <Text type={14} fontWeight={700} color="gray9797">
              Tips and Tricks
            </Text>
            <br />
            <Text type={14} fontWeight={700} color="white">
              What's updates?
            </Text>
            <Text type={14} fontWeight={700} color="white">
              What's CERO coin?
            </Text>
            <Text type={14} fontWeight={700} color="white">
              What's GREEN coin?
            </Text>
            <Text type={14} fontWeight={700} color="white">
              How to connect your wallet?
            </Text>
            <Text type={14} fontWeight={700} color="white">
              How to add card?
            </Text>
          </TextBoxStyle>
        </Box>
        <DividerStyled light />
        <Wrapper_1>
          <Image src="/Cero.svg" alt="" width={100} height={100} />
          <Wrapper_1_Sub_1>
            <WrapperText>
              <Text type="12" color="white">
                CERO Walletis a platform for exchanging goods and services by tracking green activity in daily life
                through tokenized on blockchain to become CERO tokens from various technologies in the form of play to
                earn.
              </Text>
            </WrapperText>
            <Wrapper_1_Sub_1_1>
              <Image src="/Social_Icon-02.svg" alt="" width={24} height={24} />
              <Image src="/Social_Icon-06.svg" alt="" width={24} height={24} />
            </Wrapper_1_Sub_1_1>
          </Wrapper_1_Sub_1>
        </Wrapper_1>
        {/* <Box display='flex' justifyContent='space-between' pa='23px'>
          <Box display='flex' alignItems='center' gap='24px'>
            <Box width='100px' height='100px' display='flex' alignItems='center' justifyContent='center'>
              <Image src="/Cero.svg" alt="" width='100%' height='100%'/>
            </Box>
            <WrapperText>
              <Text type='12' color='white'>CERO Walletis a platform for exchanging goods and services by tracking green activity in daily life through tokenized on blockchain to become CERO tokens from various technologies in the form of play to earn.</Text>
            </WrapperText>
          </Box>
          <Box display='flex' alignItems='flex-end'>
            <Box display='flex' justifyContent='flex-end' gap='10px' alignItems='flex-end'>
              <Box width='13px' height='13px' display='flex' alignItems='center' justifyContent='center' >
                <Image src="/Social_Icon-02.svg" alt="" width='100%' height='100%'/>
              </Box>
              <Box width='13px' height='13px' display='flex' alignItems='center' justifyContent='center'>
                <Image src="/Social_Icon-06.svg" alt="" width='100%' height='100%'/>
              </Box>
            </Box>
          </Box>
        </Box> */}
        <br />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text type={12} fontWeight={700} sx={{ color: "#00B299" }}>
            © CERO Wallet
          </Text>
          <Box display="flex" alignItems="center" gap='4px'>
            <Text type={12} fontWeight={700} sx={{ color: "#00B299" }}>
              CONTACT@CEROWALLET.COM
            </Text>
            <IconButtonWrapper>
              <Image src="/coolicon_2.svg" alt="" layout="fill"/>
            </IconButtonWrapper>
          </Box>
        </Box>
      </Box>
    </FooterStyled>
  )
}

export default Footer
