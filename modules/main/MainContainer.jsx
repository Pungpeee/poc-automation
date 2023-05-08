import { Box, Container, styled } from "@mui/material"
import { Button, Text } from "../../components"
import { useMainContainer } from "./controller"
import ItemCoinBalance from "./view/ItemCoinBalance"
import { toCurrecyFormat } from "../../utils/number"
import Decimal from "decimal.js"
import { COLORS } from "../../theme"
import CeroIcon from "../../public/cero-icon.png"
import GreenIcon from "../../public/green-icon.png"

const ImageByCoinSymbol = {
  CERO: CeroIcon.src,
  GREEN: GreenIcon.src,
}

const MainContainer = () => {
  const { data, isSuccess, profileData, pendingNoti, handleClickTopup, handleClickHistory, isCopied, setCopied } =
    useMainContainer()
  const cointNameList = isSuccess ? Object.keys(data?.balance ?? {}) : []
  return (
    <Wrapper>
      <Box pb="36px">
        <Box mb="16px" display="flex">
          <Box
            display="flex"
            padding="8px 16px"
            borderRadius="100px"
            alignItems="center"
            gap="4px"
            backgroundColor={COLORS.PRIMARY_COLOR}
          >
            <Text
              color="white"
              type="18"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                wordBreak: "break-all",
                "-webkit-line-clamp": "1",
                "text-overflow": "ellipsis",
                "-webkit-box-orient": "vertical",
              }}
              fontWeight={700}
            >
              {data?.public_key}
            </Text>
            <div onClick={setCopied} style={{ cursor: "pointer" }}>
              {isCopied ? (
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.4 1L4.5625 8.6L1 5.14546"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 7V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H21C21.2652 2 21.5196 2.10536 21.7071 2.29289C21.8946 2.48043 22 2.73478 22 3V16C22 16.2652 21.8946 16.5196 21.7071 16.7071C21.5196 16.8946 21.2652 17 21 17H17V20.993C17 21.549 16.551 22 15.993 22H3.007C2.87472 22.0001 2.74372 21.9742 2.62148 21.9236C2.49925 21.8731 2.38819 21.7989 2.29465 21.7053C2.20112 21.6118 2.12695 21.5008 2.07639 21.3785C2.02583 21.2563 1.99987 21.1253 2 20.993L2.003 8.007C2.003 7.451 2.452 7 3.01 7H7ZM9 7H15.993C16.549 7 17 7.449 17 8.007V15H20V4H9V7ZM4.003 9L4 20H15V9H4.003Z"
                    fill="white"
                  />
                </svg>
              )}
            </div>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems={{ xs: "flex-start", md: "center" }}
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
        >
          <Text color="black" type="48" fontWeight={700}>
            MY WALLET
          </Text>

          <Box width={{ xs: "100%", md: "unset" }} display="flex" gap="12px">
            <Box flex={{ xs: 1, md: "unset" }}>
              <Button onClick={() => handleClickHistory()} fullWidth variant="outlined">
                <Text color="primary" type="20" fontWeight={700}>
                  HISTORY
                </Text>
              </Button>
            </Box>
            <Box flex={{ xs: 1, md: "unset" }}>
              <Button onClick={handleClickTopup} fullWidth variant="contained">
                <Text color="white" type="20" fontWeight={700}>
                  TOP UP +
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <ListWrapper>
        {cointNameList?.map((coin, index) => {
          return (
            <ItemCoinBalance
              coinName={coin}
              key={coin}
              balance={toCurrecyFormat(data?.balance[coin])}
              balanceThb={toCurrecyFormat(
                new Decimal(data?.balance[coin] ?? 0).mul(profileData?.currency?.THB ?? 0).toNumber()
              )}
              pendingNoti={pendingNoti}
              icon={ImageByCoinSymbol[coin]}
            />
          )
        })}
      </ListWrapper>
    </Wrapper>
  )
}

export default MainContainer

const ListWrapper = styled("div")({
  display: "flex",
  gap: 32,
  flexDirection: "column",
  alignItems: "center",
})

const Wrapper = styled(Container)(({ theme }) => ({
  paddingTop: "60px",
  [theme.breakpoints.down("md")]: {
    padding: "30px",
  },
}))
