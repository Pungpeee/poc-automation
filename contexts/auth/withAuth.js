import { useRouter } from "next/router"
import React from "react"
import { useAuthContext } from "./consume"
const WithAuth = (Component) => {
  const WrapperComponent = (props) => {
    const { isAuth } = useAuthContext()
    const router = useRouter()
    if (isAuth === false) {
      router.replace("/login")
    }
    return <Component {...props} />
  }

  return WrapperComponent
}

export default WithAuth
