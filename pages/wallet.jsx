// import MainContainer from "../modules/main/MainContainer"
import MainContainer from "../modules/wallet/MainContainer"
import { withAuth } from "../contexts/auth"
const MainPage = () => {
  return (
    <>
      <MainContainer />
    </>
  )
}

// export default (MainPage)
export default withAuth(MainPage)
