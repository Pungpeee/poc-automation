import { withAuth } from "../../contexts/auth"
import { Layout } from "../../layout"
// import TopupContainer from "../../modules/topup/TopupContainer"
import TopupContainer from "../../modules/topup/NewTopupContainer"
const TopupByCoinPage = () => {
  return <TopupContainer />
}

export default withAuth(TopupByCoinPage)
