import styled from "@emotion/styled"
import { Container } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import { useQueryprofile } from "../adapter/query"
import { Select, Text } from "../components"
import { HistoryContainer } from "../modules/history"
import { useRouter } from "next/router"
import HistoryContainer_New from "../modules/history/HistoryContainer_New"

const menuCoin = [
  {
    key: "all",
    value: "all",
    display: "ALL COIN",
  },
  {
    key: "cero",
    value: "CERO",
    display: "CERO",
  },
  {
    key: "green",
    value: "GREEN",
    display: "GREEN",
  },
]

const HistoryPage = () => {
  const [filterCoin, setFilterCoin] = useState("all")
  const router = useRouter()
  // const { data: profileData } = useQueryprofile({})
  // menuCoin.push({
  //   key: "all",
  //   value: "all",
  //   display: "ALL COIN",
  // })
  // const menuCoin = Object.keys(profileData?.currency ?? {}).map((key) => ({
  //   key,
  //   value: key,
  //   display: key,
  // }))
  const handleChangeCoin = (e) => {
    setFilterCoin(e.target.value)
  }
  return (
    <Wrapper>
      {/* <Box
        pb="20px"
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        flexDirection={{
          xs: "column",
          md: "row",
        }}
      >
        <Text type="40" color="gray900" fontWeight={700}>
          HISTORY
        </Text>
        <Select
          onChange={handleChangeCoin}
          wrapperSx={{
            width: {
              xs: "100%",
              md: "unset",
            },
          }}
          fullWidth
          menus={menuCoin}
          value={filterCoin}
          sx={{
            width: {
              xs: "100%",
              md: 276,
              background: "#fff",
              borderRadius: "100px",
            },
          }}
          placeholder="ALL COIN"
        />
      </Box> */}

      {/* <HistoryContainer filterCoin={filterCoin} /> */}
      <HistoryContainer_New/>
    </Wrapper>
  )
}

export default HistoryPage

// const Wrapper = styled(Container)(({ theme }) => ({
//   paddingTop: "60px",
//   [theme.breakpoints.down("md")]: {},
// }))

const Wrapper = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  padding: "32px 0px 66px 0px",
  background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
  [theme.breakpoints.down("md")]: {
    // padding: "30px",
  },
}))
