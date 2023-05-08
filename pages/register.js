import React from "react"
import { withUnAuth } from "../contexts/auth"
import { RegisterContainer } from "../modules"

const RegisterPage = () => {
  return <RegisterContainer />
}

// export default RegisterPage
export default withUnAuth(RegisterPage)


