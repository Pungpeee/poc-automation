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

const ROLES = {
  BANNER: "banner",
}

const PartnerLayout = ({ children, isBlacklist }) => {
  const [role, setRole] = useState()
  // const [ishome, setishome] = useState(false)
  const router = useRouter()

  return (
    <>
      <Header role={role} />

      <ContentStyled>{children}</ContentStyled>
    </>
  )
}

export default PartnerLayout
