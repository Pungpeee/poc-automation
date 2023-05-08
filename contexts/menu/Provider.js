import { createContext, useEffect, useState } from "react"

export const MENUS = {
  KYCPage: "/kyc",
  WalletPage: "/wallet",
  TopupByCoinPage: "/topup/cero",
  HistoryPage: "/history",
  ResetPage: "/change-password",
  DeleteRequest:'/del_req',
  Signout: "signout",
}

export const MenuContext = createContext(null)

const MenuProvider = ({ children }) => {
  const [menuActive, setMenuActive] = useState(null)

  useEffect(() => {
    setMenuActive(MENUS[children?.props?.children?.type?.name] ?? null)
  }, [children])

  return <MenuContext.Provider value={{ menuActive }}>{children}</MenuContext.Provider>
}

export default MenuProvider
