// import MainContainer from "../modules/main/MainContainer"
import { RedeemContainer } from "../modules"
import { withAuth } from "../contexts/auth"
const RedeemPage = () => {
  return (
    <>
      <RedeemContainer />
    </>
  )
}

export default withAuth(RedeemPage)
// export default withAuth(MainPage)
