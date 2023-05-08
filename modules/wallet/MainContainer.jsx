import { Box, Container, styled, useTheme } from "@mui/material"
import { Button, Text } from "../../components"
import ButtonBase from "@mui/material/ButtonBase"
import Image from "next/image"
import InfiniteScroll from "react-infinite-scroll-component"
import { useMainContainer } from "./controller"
import ItemCoinBalance from "./view/ItemCoinBalance"
import { toCurrecyFormat } from "../../utils/number"
import Decimal from "decimal.js"
import { COLORS } from "../../theme"
import CeroIcon from "../../public/cero-icon.png"
import GreenIcon from "../../public/green-icon.png"
import IconButton from "@mui/material/IconButton"
import { useEffect, useState } from "react"
import { CHAIN_MAP } from "../../utils/chain_map"
import { ACTIVITY_METHOD } from "../../utils/activity_method"
import { ACTIVITY_STATUS } from "../../utils/activity_status"
import clsx from "clsx"
import { useRouter } from "next/router"
import { chain } from "lodash"

const ImageByCoinSymbol = {
  CERO: CeroIcon.src,
  GREEN: GreenIcon.src,
}

const CeroButtonlist = [
  {
    label: "Top-up",
    src: "/topup_icon.svg",
    background: "",
    color: "white",
    href: "topup/cero",
  },
  {
    label: "Redeem",
    src: "/exchange_icon.svg",
    background: "white",
    color: "darkgreen",
    href: "redeem",
  },
  {
    label: "History",
    src: "/history_icon.svg",
    background: "white",
    color: "darkgreen",
    href: "history",
  },
]
const GreenButtonlist = [
  {
    label: "History",
    src: "/history_icon.svg",
    background: "white",
    color: "darkgreen",
    href: "history",
  },
]

const MainContainer = () => {
  const {
    CoinBalance,
    isSuccess,
    current,
    currentid,
    handlecurrent,
    hasNextPage,
    fetchNextPage,
    Txdata,
    filterHistory,
    time_format,
    profileData,
    setCopied,
    Test,
    cointNameList,
    coinList,
    setcurrent,
  } = useMainContainer()
  const router = useRouter()
  const theme = useTheme()
  // const coinwallet = CoinBalance?.wallet
  // const cointNameList = isSuccess
  //   ? Object.entries(CoinBalance?.wallet)
  //       .flat()
  //       .filter((d) => typeof d == "object")
  //   : []

  // useEffect(() => {
  //   setcurrent()
  // }, [isSuccess])
  return (
    <Wrapper>
      <Box display="flex" flexDirection="column" minHeight="500px" gap={3}>
        <Text type={20} fontWeight={700} color="white">
          My Wallets
        </Text>
        <Box
          width="100%"
          height="100%"
          display="flex"
          gap={2}
          sx={{
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
            },
          }}
        >
          {/* ********************************** Coin List ******************************* */}
          <Box display="flex" flexDirection="column" flex="0 0 25%" gap={2}>
            {/* <ListCoin name="CERO" value="200.67" thb="20.0000846" current={current} setcur={handlecurrent} />
            <ListCoin name="GREEN" value="199.12123123" thb="60.0000846" current={current} setcur={handlecurrent} /> */}
            {coinList.map((coin, index) => {
              return (
                <ListCoin
                  key={index}
                  {...coin}
                  value={toCurrecyFormat(coin.balance)}
                  thb={toCurrecyFormat(new Decimal(coin.balance ?? 0).mul(profileData?.currency?.THB ?? 0).toNumber())}
                  current={current}
                  setcur={handlecurrent}
                />
              )
            })}
            {/* {Mockup.map((coin,index)=>{
              return(
                <ListCoin
                  key={index}
                  name={coin.coin}
                  {...coin}
                  value={coin.value}
                  thb={coin.thb}
                  current={current}
                  setcur={handlecurrent}
                />
              )
            })} */}
          </Box>
          {/* ******************************** Activities List *************************** */}
          <ActivitiesWrapper>
            <Text type={20} fontWeight={700} color="white">
              {current.name} Wallet
            </Text>
            {current.name == "CERO" ? (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                height="48px"
                paddingX="16px"
                paddingY="8px"
                sx={{
                  border: "1px solid rgba(165, 218, 203, 0.25)",
                  borderRadius: "8px",
                  background: "rgba(165, 218, 203, 0.05)",
                  [theme.breakpoints.down("ex_sm")]: {
                    maxWidth: "230px",
                  },
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{
                    overflow: "hidden",
                    // [theme.breakpoints.down("ex_sm")]: {
                    //   maxWidth: "150px",
                    // },
                  }}
                >
                  <Text type={10} fontWeight={500} color="green040">
                    My address ({current.chain}) :
                  </Text>
                  <Text type={12} fontWeight={700} color="white">
                    {current.address}
                  </Text>
                </Box>
                <Box
                  width="30px"
                  height="30px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ flex: " 0 0 auto" }}
                  onClick={setCopied}
                >
                  <Image src="/copy.svg" alt="" width="100%" height="100%" />
                </Box>
              </Box>
            ) : null}
            <Box
              display="flex"
              gap={3}
              height="32px"
              sx={{
                [theme.breakpoints.down("md")]: {
                  flexDirection: "column",
                  gap: "4px",
                  height: "auto",
                },
              }}
            >
              {current.name == "CERO"
                ? CeroButtonlist.map(({ label, src, background, color, href }) => {
                    return (
                      <Button
                        key={label}
                        variant="contained_square"
                        onClick={() => router.push(href)}
                        sx={{ background: `${background}`, maxHeight: "100%" }}
                      >
                        <Box width="15px" height="15px" display="flex" alignItems="center" justifyContent="center">
                          <Image src={src} alt="" width="100%" height="100%" />
                        </Box>
                        <Text type={12} fontWeight={700} color={color} sx={{ marginLeft: "10px" }}>
                          {label}
                        </Text>
                      </Button>
                    )
                  })
                : GreenButtonlist.map(({ label, src, background, color, href }) => {
                    return (
                      <Button
                        key={label}
                        variant="contained_square"
                        onClick={() => router.push(href)}
                        sx={{ background: `${background}`, maxHeight: "100%" }}
                      >
                        <Box width="15px" height="15px" display="flex" alignItems="center" justifyContent="center">
                          <Image src={src} alt="" width="100%" height="100%" />
                        </Box>
                        <Text type={12} fontWeight={700} color={color} sx={{ marginLeft: "10px" }}>
                          {label}
                        </Text>
                      </Button>
                    )
                  })}
            </Box>
            <Box display="flex" gap={2} flexDirection="column">
              <Text type={16} fontWeight={700} color="white">
                Recent activities
              </Text>
              <InfiniteScroll next={fetchNextPage} hasMore={hasNextPage} dataLength={Txdata.length}>
                <Box display="flex" flexDirection="column" gap={0.5}>
                  {/* <Box padding="8px" display="flex" flexDirection="row" justifyContent="space-between" width="100%" sx={{borderBottom:'1px solid #1FA37C'}}>
                  <Box width="30%" display="flex" flexDirection="column" alignItems="flex-start">
                    <Text type={14} fontWeight={700} color="white">
                      Top-Up
                    </Text>
                    <Text type={12} fontWeight={500} color="white">
                      22 Feb 2022, 07:49
                    </Text>
                  </Box>
                  <Box width="30%" display="flex" justifyContent="flex-end" alignItems='center' gap={1}>
                    <Box display='flex' flexDirection='column' alignItems='flex-end'>
                      <Text type={14} fontWeight={700} color="white">
                        +724,131.68227121 CERO
                      </Text>
                      <Text type={12} fontWeight={500} color="white">
                        (pending)
                      </Text>
                    </Box>
                    <Box width="15px" height="15px" display="flex" alignItems="center" justifyContent="center">
                      <Image src='/Next.svg' alt="" width="100%" height="100%" />
                    </Box>
                  </Box>
                </Box> */}
                  {/* <ActivitiesList time="22 Feb 2022, 07:49" type="Top-up" value="724,131.68227121" status="pending" /> */}

                  {filterHistory.map((d, index) => {
                    return <ActivitiesList key={index} {...d} time_format={time_format} />
                  })}
                </Box>
              </InfiniteScroll>
            </Box>
          </ActivitiesWrapper>
        </Box>
      </Box>
    </Wrapper>
  )
}

export default MainContainer

// const ListWrapper = styled("div")({
//   display: "flex",
//   gap: 32,
//   flexDirection: "column",
//   alignItems: "center",
// })

const Wrapper = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "32px 0px 66px 0px",
  background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
  [theme.breakpoints.down("md")]: {
    // padding: "30px",
  },
}))

const ActivitiesWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minWidth: "720px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "16px",
  background: "rgba(165, 218, 203, 0.1)",
  boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
  borderRadius: "8px",
  [theme.breakpoints.down("md")]: {
    minWidth: "unset",
    maxWidth: "350px",
    padding: "8px",
  },
  [theme.breakpoints.down("ex_sm")]: {
    // maxWidth: "200px",
    padding: "8px",
  },
}))

// const Test = styled(ButtonBase)(({ theme, name, current }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "flex-start",
//   gap: "0.5",
//   width: "100%",
//   height: "118px",
//   padding: "16px",
//   borderRadius: "8px",
//   background: `${
//     name == current
//       ? "linear-gradient(101.26deg, #FFFFFF 0%, #DFFFF6 100%)"
//       : "linear-gradient(95.49deg, rgba(210, 254, 241, 0.1) 0%, rgba(255, 255, 255, 0.1) 98.06%)"
//   }`,
// }))

const Mockup = [
  {
    coin: "GREEN",
    address: "",
    thb: "0.00",
    value: "0.00",
    chain: "",
  },
]

const ListCoin = ({ value, thb, current, setcur, coin, address, chain }) => {
  // const { name, value, thb, current, setcur } = props
  const theme = useTheme()
  const [visible, setvisible] = useState(false)
  const hidden = (value) => {
    let star = "*"
    return value.replace(value, star.repeat(value.length))
  }
  const dataStr = JSON.stringify({ name: coin, chain: CHAIN_MAP[chain], address: address })
  const currentStr = JSON.stringify(current)

  return (
    <>
      {chain == "SOL" ? (
        <Box
          display="flex"
          flexDirection="column"
          gap={0.5}
          width="100%"
          height="118px"
          padding="16px"
          borderRadius="8px"
          minWidth="353px"
          sx={{
            background: `${
              dataStr == currentStr
                ? "linear-gradient(101.26deg, #FFFFFF 0%, #DFFFF6 100%)"
                : "linear-gradient(95.49deg, rgba(210, 254, 241, 0.1) 0%, rgba(255, 255, 255, 0.1) 98.06%)"
            }`,

            [theme.breakpoints.down("md")]: {
              minWidth: "unset",
            },
          }} // "linear-gradient(101.26deg, #FFFFFF 0%, #DFFFF6 100%)"
          onClick={() => setcur(coin, chain, address)}
        >
          <Box display="flex" gap={1}>
            <Box width="24px" height="24px" display="flex" alignItems="center" justifyContent="center">
              <Image
                src={chain == "SOL" ? "/icon_wallet_CERO.svg" : "/icon_wallet_GREEN.svg"}
                alt=""
                width="100%"
                height="100%"
              />
            </Box>
            <Text type={20} fontWeight={700} color={dataStr == currentStr ? "green100" : "white"}>
              {coin}
            </Text>
          </Box>
          <Box display="flex" gap={3}>
            <Text
              type={20}
              fontWeight={700}
              color={dataStr == currentStr ? "green100" : "white"}
              sx={{ minHeight: "30px" }}
            >
              {!visible ? value : hidden(value)}
            </Text>
            <Box
              width="24px"
              height="24px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ zIndex: "2" }}
            >
              <IconButton onClick={() => setvisible(!visible)}>
                <Image src={`/eye${!visible ? "" : "_close"}.svg`} alt="" width="30%" height="30%" />
              </IconButton>
            </Box>
          </Box>
          <Text type={14} fontWeight={700} color="gray9797">
            ≈ THB {!visible ? value : hidden(thb)}
          </Text>
        </Box>
      ) : null}
    </>
  )
}

const ActivitiesList = (props) => {
  const { type, values, status, id, method, datetime_create: time, time_format } = props
  const theme = useTheme()
  let isreject = status == -2 || status == -3
  let ispending = status == -1
  return (
    <Box
      padding="8px"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
      sx={{ borderBottom: "1px solid #1FA37C" }}
    >
      <Box
        width="30%"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{
          [theme.breakpoints.down("md")]: {
            width:'100%'
          },
        }}
      >
        <Text type={14} fontWeight={700} color="white">
          {[ACTIVITY_METHOD[method]]}
        </Text>
        <Text type={12} fontWeight={500} color="green040">
          {time_format(time)}
        </Text>
      </Box>
      <Box width="30%" display="flex" justifyContent="flex-end" alignItems="center" gap={1}  sx={{
          [theme.breakpoints.down("md")]: {
            width:'100%'
          },
        }}>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Text type={14} fontWeight={700} color="white">
            +{values.toFixed(3)} CERO
          </Text>
          {status == 2 ? null : (
            <Text type={12} fontWeight={500} color={clsx(ispending && "green_neon", isreject && "error050")}>
              ({[ACTIVITY_STATUS[status.toString()]]})
            </Text>
          )}
        </Box>
        <Box width="15px" height="15px" display="flex" alignItems="center" justifyContent="center">
          <Image src="/Next.svg" alt="" width="100%" height="100%" />
        </Box>
      </Box>
    </Box>
  )
}
