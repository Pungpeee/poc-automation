import { styled } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useAuthContext } from "../contexts/auth"
// import Footer from "./Footer_Old"
import Footer from "./Footer"
// import Header from "./Header"
import Header from "./HeaderNew"


export const ContentStyled = styled("div")(({ theme }) => ({
  minHeight: "calc(100vh - 200px)",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    
  },
}))

const ROLES = {
  BANNER: "banner",
}

const HomeLayout = ({ children, isBlacklist }) => {
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
      <Header role={role} />

      <ContentStyled>{children}</ContentStyled>

      <Footer />
    </>
  )
}

export default HomeLayout
