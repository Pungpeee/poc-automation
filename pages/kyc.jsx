import { Box, Container, useTheme } from "@mui/material"
import Card from "../components/Card"
import Text from "../components/Text"
import { withAuth } from "../contexts/auth"
import KycContainer from "../modules/kyc/KycContainer"
import { KYCContainer } from "../modules"

const KYCPage = () => {
  const theme = useTheme()

  return (
    <Box pb={6}>
      <Container>
        <Card
          sx={{
            padding: "37px 73px 103px 73px",
            margin: "auto",
            marginTop: "38px",
            maxWidth: 1000,
            [theme.breakpoints.down("md")]: {
              padding: "15px",
            },
          }}
        >
          <Box pb={"25px"}>
            <Text color="primary" type="18" fontWeight={700}>
              Verify your Account
            </Text>
          </Box>
          <Box pb={"26px"}>
            <KycContainer />
          </Box>
        </Card>
      </Container>
    </Box>

    // <KYCContainer />
  )
}

// export default KYCPage
export default withAuth(KYCPage)
