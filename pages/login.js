import React from "react"
import { withUnAuth } from "../contexts/auth"
import { LoginContainer } from "../modules"

const LoginPage = () => {
  return <LoginContainer />
}

export default withUnAuth(LoginPage)
