import { useContext } from "react"
import { AuthContext } from "./Provider"

export const useAuthContext = () => {
  const { isAuth } = useContext(AuthContext)

  return { isAuth }
}

