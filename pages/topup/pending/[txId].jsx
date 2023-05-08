import { Container } from "@mui/material"
import { Box } from "@mui/system"
import { Text } from "../../../components"
import { withAuth } from "../../../contexts/auth"
import { TopupPendingContainer } from "../../../modules/topup-pending"

const TopupPending = () => {
  return (
    <Container>
      <Text type="36" fontWeight={700} color="black">
        TOP-UP
      </Text>

      <Box pt="36px">
        <TopupPendingContainer />
      </Box>
    </Container>
  )
}

export default withAuth(TopupPending)
