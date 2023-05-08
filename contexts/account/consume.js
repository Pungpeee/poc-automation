import { useContext } from "react"
import { AccountContext } from "./Provider"

export const useAccountContext = () => {
  const { cookie } = useContext(AccountContext)

  const accountData = !!cookie?.coAccount ? JSON.parse(JSON.stringify(cookie.coAccount)) : null
  return { account: accountData }
}
