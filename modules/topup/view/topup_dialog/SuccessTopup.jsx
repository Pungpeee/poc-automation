import { Dialog } from "@mui/material"
import { Box, styled } from "@mui/system"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { Button, Text } from "../../../../components"
import { StylesCustom } from "../../../../components/Button"
import { COLORS } from "../../../../theme"
import { toCurrecyFormat } from "../../../../utils/number"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import toUpper from "lodash/toUpper"

const SuccessTopup = (props) => {
  const { recieve, amount, transfer, date, pRate, refid } = props
  const router = useRouter()

  return (
    <>
      <Main sx={{ marginTop: "20px" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: "16px", background: "rgba(165, 218, 203, 0.5)", width: "100%" }}
        >
          <FontAwesomeIcon icon={faCircleCheck} color="#4AAB56" style={{ fontSize: "12px" }} />
          <Text type="12" color="green100" textAlign="center" fontWeight={500}>
            Top-up has been successful, you recieved {recieve} CERO
          </Text>
        </Box>
        <Divider_DASH sx={{ marginTop: "10px" }} />
        <FontAwesomeIcon
          icon={faCircleCheck}
          color="#00FFB7"
          size="2x"
          style={{ marginTop: "40px", fontSize: "72px" }}
        />
        <Text type={20} fontWeight={700} color="green100" sx={{ marginTop: "10px" }}>
          Successful
        </Text>
        <Text type={12} fontWeight={600} color="gray9797">
          The request was processed successfully.
        </Text>
        <Divider_DASH sx={{ marginTop: "10px" }} />

        <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }} px="20px" pt="20px" w>
          <Text type={14} fontWeight={600} color="gray9797">
            Amount
          </Text>
          <Box>
            <Text type={20} fontWeight={700} color="green100" sx={{ paddingRight: "8px" }}>
              {amount}
            </Text>
            <Text type={14} fontWeight={600} color="black">
              THB
            </Text>
          </Box>
        </Box>

        <Divider_DASH sx={{ marginTop: "10px" }} />
        <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }} px="20px" pt="20px" w>
          <Text type={14} fontWeight={600} color="gray9797">
            Recieved Coin
          </Text>
          <Box>
            <Text type={20} fontWeight={700} color="green100" sx={{ paddingRight: "8px" }}>
              {recieve}
            </Text>
            <Text type={14} fontWeight={600} color="black333">
              CERO
            </Text>
          </Box>
        </Box>
        <Divider_DASH sx={{ marginTop: "10px" }} />
        <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }} px="20px" pt="15px" w>
          <Text type={14} fontWeight={600} color="gray9797">
            Price Rate
          </Text>
          <Box>
            <Text type={14} fontWeight={600} color="black333">
              {pRate}
            </Text>
          </Box>
        </Box>
        <Divider_DASH sx={{ marginTop: "10px" }} />
        <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }} px="20px" pt="15px" w>
          <Text type={14} fontWeight={600} color="gray9797">
            Transfer To
          </Text>
          <Box>
            <Text type={14} fontWeight={600} color="black333">
              {transfer}
            </Text>
          </Box>
        </Box>
        <Divider_DASH sx={{ marginTop: "10px" }} />
        <Box display="flex" sx={{ justifyContent: "space-between", width: "100%" }} px="20px" pt="15px">
          <Text type={14} fontWeight={600} color="gray9797">
            Success On
          </Text>
          <Text type={14} fontWeight={600} color="black333">
            {date}
          </Text>
        </Box>
        <Divider_DASH sx={{ marginTop: "10px" }} />
        <Text type={12} fontWeight={600} color="gray9797" sx={{marginTop:'10px'}}>
          REF ID : {refid}
        </Text>
        <br />
      </Main>
      <Divider sx={{ marginTop: "20px" }} />
      <Box
        display="flex"
        justifyContent="center"
        sx={{ width: "100%", marginTop: "20px" }}
      >
        <Button variant="contained_square_green" sx={{width:'273px'}}>
          <Text textAlign="center" type={16} fontWeight={700} color="white">
            Go to Wallet
          </Text>
        </Button>
      </Box>
    </>
  )
}

export default SuccessTopup

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  background: COLORS.VEKIN_GREEN,
})

const Divider_DASH = styled("div")({
  width: "100%",
  height: "3px",
  borderBottom: `dashed 1px ${COLORS.GRAY90}`,
})

const Main = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  background: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}))
