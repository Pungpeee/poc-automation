import { Box, styled } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useAuthContext } from "../contexts/auth"
import Footer from "./Footer"
import Header from "./HeaderNew"
// import Header from "./Header"

const ContentStyled = styled(Box)(({ theme }) => ({
  height: "100%",
  margin: "0px",
  [theme.breakpoints.down("md")]: {
    margin: "0px",
  },
}))
// const ContentStyled = styled(Box)(({ theme, ishome_check }) => ({
//   minHeight:`${ishome_check?null:"calc(100vh - 200px)"}`,
//   height: "100%",
//   margin: `${ishome_check ? "0px" : "32px"}`,
//   [theme.breakpoints.down("md")]: {
//     margin: `${ishome_check ? "0px" : "24px 8px"}`,
//   },
// }))

const ROLES = {
  BANNER: "banner",
}

const Layout = ({ children, isBlacklist }) => {
  const [role, setRole] = useState()
  // const [ishome, setishome] = useState(false)
  const router = useRouter()
  const { isAuth } = useAuthContext()
  const ishome =
    router.pathname === "/" ||
    router.pathname === "/wallet" ||
    router.pathname === "/marketplace" ||
    router.pathname === "/marketplace/all" ||
    router.pathname === "/edit_profile" ||
    router.pathname === "/topup/[coinId]" ||
    router.pathname === "/redeem"

  useEffect(() => {
    // if (condition) {
    //   return setishome(true)
    // }
    // return setishome(false)
  }, [router])

  // if (router.pathname === "/privacy-policy") {
  //   return children
  // }
  return (
    <>
      <Header role={role} />

      <ContentStyled >{children}</ContentStyled>

      <Footer />
    </>
  )
}

export default Layout
