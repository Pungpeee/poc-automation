import React from "react"
import { withUnAuth } from "../contexts/auth"
import { DelLoginContainer } from "../modules"

const DelLoginPage = () => {
  return <DelLoginContainer />
}

export default withUnAuth(DelLoginPage)
