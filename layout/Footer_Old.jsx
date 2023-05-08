import React from "react"
import { styled, Grid, Divider, Box } from "@mui/material"
import { COLORS } from "../theme"
import Image from "next/image"
import { Text } from "../components"
import Link from "next/link"

const FooterStyled = styled("footer")(({ theme }) => ({
  width: "100%",
  position: "relative",
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

const WrapperText = styled("div")({
  maxWidth: "48px",
})

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    alignItems: "flex-start",
    flexDirection: "column-reverse",
  },
}))

const Footer = () => {
  return (
    <FooterStyled>
      <Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <WrapperImage>
              <Image src="/wallet.svg" alt="Picture of the author" width="100%" height="100%" />
            </WrapperImage>
            <WrapperText>
              <Text color="label2" type="20" fontWeight="700">
                CARBON WALLET
              </Text>
            </WrapperText>
          </Box>
        </Grid>
        <DividerStyled light />
        <Grid item xs={12}>
          <Link href="/term-and-condition" passHref>
            <Text sx={{ cursor: "pointer" }} color="label" fontWeight={700} type="18">
              TERM & CONDITIONS
            </Text>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link href="/privacy-policy" passHref>
            <Text sx={{ cursor: "pointer" }} color="label" fontWeight={700} type="18">
              PRIVACY & POLICY
            </Text>
          </Link>
        </Grid>
        <Box sx={{ padding: "28px" }} />
        <Grid item xs={12}>
          <BoxStyled>
            <Text color="label" fontWeight={400} type="20" as="div">
              © Carbon Wallet
            </Text>
            <Text color="label" fontWeight={700} mobileType="14" type="20" as="div">
              CONTACT@CARBONWALLET.COM <Image src="/coolicon.svg" alt=" " width={20} height={15} />
            </Text>
          </BoxStyled>
        </Grid>
      </Grid>
    </FooterStyled>
  )
}

export default Footer
