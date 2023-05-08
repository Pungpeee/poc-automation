import { Box } from "@mui/system"
import { Text } from "../../../components"
import { COLORS } from "../../../theme"

const textByText = {
  "-1": "WATING",
  1: "SENT",
  2: "RECIEVE",
  3: "TOP-UP",
  4: "ACTIVITY",
  5: "WITHDRAWAL",
}

const TypeColumn = ({ method, status }) => {
  const isDisabledText = status === -2 || status === -3
  return (
    <Box
      height="20px"
      padding="0px 4px"
      borderRadius="5px"
      display="inline"
      backgroundColor={isDisabledText ? COLORS.GRAY400 : COLORS.PRIMARY_COLOR}
    >
      <Text
        sx={{
          position: "relative",
          top: "-2px",
        }}
        type="12"
        fontWeight={500}
        color={"white"}
      >
        {textByText[method.toString()]}
      </Text>
    </Box>
  )
}

export default TypeColumn
