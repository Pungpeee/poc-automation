import { styled } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useAuthContext } from "../contexts/auth"

const ContentStyled = styled("div")(({ theme }) => ({
  minHeight: "calc(100vh - 200px)",
  height: "100%",
  margin: "32px",
  [theme.breakpoints.down("md")]: {
    margin: "24px 8px",
  },
}))

const ROLES = {
  BANNER: "banner",
}

const Layout = ({ children, isBlacklist }) => {
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
      <ContentStyled>{children}</ContentStyled>
    </>
  )
}

export default Layout
