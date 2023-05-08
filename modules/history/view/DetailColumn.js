import { Box } from "@mui/system"
import { Text } from "../../../components"

import toUpper from "lodash/toUpper"
import { toCurrecyFormat } from "../../../utils/number"
import { COIN_CHOICES } from "../../../utils/coin"

const DetailColumn = ({ amount, symbol = "", thbValue, status }) => {
  const isDisabledText = status === -2 || status === -3
  return (
    <Box>
      <Box>
        <Text type="14" fontWeight={500} color={isDisabledText ? "gray600" : "primary"}>
          {toCurrecyFormat(amount)}
        </Text>{" "}
        <Text type="14" fontWeight={500} color={isDisabledText ? "gray600" : "black"}>
          {toUpper(COIN_CHOICES[symbol.toString() ?? "-1"])}
        </Text>
      </Box>
      <Text type="12" fontWeight={500} color={"gray400"}>
        ({toCurrecyFormat(thbValue)} Baht)
      </Text>
    </Box>
  )
}

export default DetailColumn
