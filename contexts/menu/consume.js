import { useContext } from "react"
import { MenuContext } from "./Provider"

export const useMenuContext = () => {

    const { menuActive } = useContext(MenuContext)
    return {
        currentMenu: menuActive
    }
}


