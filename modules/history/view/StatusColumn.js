import { Box } from "@mui/system"
import { Button, Text } from "../../../components"
import toString from "lodash/toString"
import { useRouter } from "next/router"

const STATUS_BY_TEXT = {
  "-3": "CANCELLED",
  "-2": "REJECTED",
  "-1": "PENDING",
  1: "WAITING FOR PAYMENT",
  2: "SUCCESS",
  3: "THB",
}

const StatusColumn = ({ id, status }) => {
  const router = useRouter()
  switch (toString(status)) {
    case "-3":
    case "-2":
      return (
        <Text type="10" color="red100">
          {STATUS_BY_TEXT[toString(status)]}
        </Text>
      )
    case "2":
      return (
        <Text type="10" color="primary">
          {STATUS_BY_TEXT[toString(status)]}
        </Text>
      )
    case "-1":
      return (
        <Text type="10" color="orange">
          {STATUS_BY_TEXT[toString(status)]}
        </Text>
      )
    case "1":
      return (
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text type="10" color="orange">
            {STATUS_BY_TEXT[toString(status)]}
          </Text>

          <Button
            sx={{ width: { xs: "100%", md: "unset" } }}
            onClick={() => router.push("/topup/pending/" + id)}
            variant="outlined_pay_rounded"
          >
            <Text type="12" color="orange">
              Pay
            </Text>
          </Button>
        </Box>
      )
    default:
      return null
  }
}

export default StatusColumn
