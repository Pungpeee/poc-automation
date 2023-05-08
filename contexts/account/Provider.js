import { createContext } from "react"

export const AccountContext = createContext(null)

const AccountProvider = (props) => {
  const { cookies } = props
  return <AccountContext.Provider value={cookies}>{props.children}</AccountContext.Provider>
}

export default AccountProvider
