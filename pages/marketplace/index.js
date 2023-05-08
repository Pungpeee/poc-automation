import React from "react"
import { withUnAuth } from "../../contexts/auth"
import { MarketPlaceContainer } from "../../modules"

const MarketPlace = () => {
  return <MarketPlaceContainer />
}

export default MarketPlace
// export default withUnAuth(MarketPlace)
