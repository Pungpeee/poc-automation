import { useRouter } from "next/router"
import React from "react"
import { useAuthContext } from "./consume"
const WithUnAuth = (Component) => {
  const WrapperComponent = (props) => {
    const { isAuth } = useAuthContext()
    const router = useRouter()
    if (isAuth) {
      router.back()
    }
    return <Component {...props} />
  }

  return WrapperComponent
}

export default WithUnAuth
