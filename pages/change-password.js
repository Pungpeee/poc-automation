import React from "react"
import { withAuth } from "../contexts/auth"
import { ChangeContainer } from "../modules"

const ChangePage = () => {
  return <ChangeContainer />
}

export default withAuth(ChangePage)
