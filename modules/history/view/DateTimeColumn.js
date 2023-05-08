import { Box } from "@mui/system"
import { Text } from "../../../components"

const DateTimeColumn = ({ dateText, timeText, status }) => {
  const isDisabledText = status === -2 || status === -3
  return (
    <Box display={{ xs: "flex", md: "block" }}>
      <Text as="div" type="12" color={isDisabledText ? "gray600" : "gray900"}>
        {dateText}
      </Text>
      <Text as="div" type="12" color={isDisabledText ? "gray600" : "gray900"}>
        {timeText}
      </Text>
    </Box>
  )
}

export default DateTimeColumn
