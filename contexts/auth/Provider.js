import isNil from "lodash/isNil"
import { createContext, useEffect, useState } from "react"
import { getCheckIsAuthen } from "../../apis/auth"

export const AuthContext = createContext(null)

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(null)
  useEffect(() => {
    getCheckIsAuthen()
      .then((data) => {
        setIsAuth(data.is_authenticated)
      })
      .catch(() => {
        setIsAuth(false)
      })
  }, [])

  if (isNil(isAuth)) {
    return null
  }
  return <AuthContext.Provider value={{ isAuth }}>{props.children}</AuthContext.Provider>
}

export default AuthProvider
