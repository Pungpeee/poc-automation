import { styled } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useAuthContext } from "../contexts/auth"
import Footer from "./Footer"
import DownloadAppHeader from "./DownloadAppHeader"
import MobileBg from "../public/download-app/mobilebg.png"
import Image from "next/image"
import Bg from "../public/download-app/bg.svg"
import { Box } from "@mui/system"

const ContentStyled = styled("div")(({ theme }) => ({
  minHeight: "calc(100vh - 200px)",
  height: "100%",
  margin: "32px",
  [theme.breakpoints.down("md")]: {
    margin: "24px 8px",
  },
}))

const WrapperBg = styled("div")({
  background: "radial-gradient(148.65% 253.72% at -20.21% 52.07%, #1EAB8D 0%, #196078 82.88%)",
  transform: "matrix(1, 0, 0, -1, 0, 0)",
  width: "100%",
  height: "100%",
  position: "absolute",
})

const LightImg = styled("div")(({ theme }) => ({
  position: "absolute",
  left: "50%",
  bottom: "0",
  width: "1200px",
  [theme.breakpoints.down("md")]: {
    width: "300px",
    bottom: "100px",
  },
  transform: "translate(-50%, 0)",
}))

const ROLES = {
  BANNER: "banner",
}

const DownloadAppLayout = ({ children, isBlacklist }) => {
  const [role, setRole] = useState()
  const router = useRouter()
  const { isAuth } = useAuthContext()

  useEffect(() => {
    if (router.pathname === "/" && !isAuth) {
      return setRole(ROLES.BANNER)
    }

    return setRole(null)
  }, [isAuth, router])

  // if (router.pathname === "/privacy-policy") {
  //   return children
  // }
  return (
    <>
      <DownloadAppHeader />

      <WrapperBg />
      <LightImg>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Image src={Bg} alt="bg" />
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Image src={MobileBg} alt="bg" />
        </Box>
      </LightImg>
      <ContentStyled>{children}</ContentStyled>

      <Footer />
    </>
  )
}

export default DownloadAppLayout
