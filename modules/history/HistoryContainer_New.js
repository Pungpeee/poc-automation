import { Box, Container, styled, Divider, TextField, InputAdornment } from "@mui/material"
import ButtonBase from "@mui/material/ButtonBase"
import Image from "next/image"
import { useRouter } from "next/router"
import { Button, FieldSet, Text, Select } from "../../components"
import { COLORS } from "../../theme"
import React, { Component, useState, useEffect, useMemo } from "react"
import useDownloader from "react-use-downloader"
import { useMainContainer } from "./controller_v2"
import { ACTIVITY_METHOD } from "../../utils/activity_method"
import { ACTIVITY_STATUS } from "../../utils/activity_status"

const CeroButtonlist = [
  {
    label: "Download pdf.",
    src: "/topup_icon.svg",
    background: "",
    color: "white",
    href: "",
  },
]

const month = [
  {
    key: "all",
    value: "all",
    display: "All",
  },
  {
    key: "1",
    value: "January",
    display: "January",
  },
  {
    key: "2",
    value: "February",
    display: "February",
  },
  {
    key: "3",
    value: "March",
    display: "March",
  },
  {
    key: "4",
    value: "April",
    display: "April",
  },
  {
    key: "5",
    value: "May",
    display: "May",
  },
  {
    key: "6",
    value: "June",
    display: "June",
  },
]
const year = [
  {
    key: "all",
    value: "all",
    display: "All",
  },
  {
    key: "1",
    value: "2022",
    display: "2022",
  },
  {
    key: "2",
    value: "2023",
    display: "2023",
  },
]

const mock_data = [
  {
    id: 1,
    name: "Top-up",
    date: "22 June 2022",
    time: "07:49",
    data: "+8 CERO",
    status: "Rejected",
  },
  {
    id: 2,
    name: "Top-up",
    date: "22 June 2022",
    time: "07:49",
    data: "+8 CERO",
    status: "Expired",
  },
  {
    id: 3,
    name: "Top-up",
    date: "22 June 2022",
    time: "07:49",
    data: "-100 CERO",
    status: "",
  },
  {
    id: 4,
    name: "Redeem",
    date: "22 June 2022",
    time: "07:49",
    data: "+8 CERO",
    status: "",
  },
  {
    id: 5,
    name: "Redeem",
    date: "22 June 2022",
    time: "07:49",
    data: "+10 CERO",
    status: "",
  },
]

const HistoryContainer_New = () => {
  const [Category, setCategory] = useState("all")
  const { filterHistory, time_format } = useMainContainer()

  const handleChangeCategory = (e) => {
    setCategory(e.target.value)
  }

  const { download } = useDownloader()
  const fileUrl = "/example.pdf"
  const filename = "example.pdf"

  return (
    <Wrapper>
      <Wrapper_Container>
        <Button_Display />

        <HistoryWrapper>
          <Text type={22} fontWeight={700} color="white">
            CERO's history
          </Text>
          {/* <Text type={14} fontWeight={500} color="white">
            52 transactions
          </Text> */}
          <Box display="flex" gap={{ xs: 1, md: 3 }} flexDirection={{ xs: "column", md: "row" }}>
            {CeroButtonlist.map(({ label, src, background, color, href }) => {
              return (
                <Button
                  key={label}
                  variant="contained_square"
                  onClick={() => download(fileUrl, filename)}
                  sx={{ background: `${background}`, maxHeight: "100px" }}
                >
                  <Box width="15px" height="15px" display="flex" alignItems="center" justifyContent="center">
                    <Image src={src} alt="" width="100%" height="100%" />
                  </Box>
                  <Text type={12} fontWeight={500} color={color} sx={{ marginLeft: "10px" }}>
                    {label}
                  </Text>
                </Button>
              )
            })}
            <Select
              onChange={handleChangeCategory}
              wrappersx={{
                width: {
                  xs: "100%",
                  md: "unset",
                },
              }}
              fullWidth
              menus={month}
              value={Category}
              sx={{
                width: {
                  xs: "100%",
                  md: 150,
                  background: "#fff",
                  borderRadius: "10px",
                },
              }}
              placeholder="Category"
            />
            <Select
              onChange={handleChangeCategory}
              wrappersx={{
                width: {
                  xs: "100%",
                  md: "unset",
                  background: "#fff",
                  borderRadius: "10px",
                },
              }}
              fullWidth
              menus={year}
              value={Category}
              sx={{
                width: {
                  xs: "100%",
                  md: 150,
                  background: "#fff",
                  borderRadius: "10px",
                },
              }}
              placeholder="Category"
            />
            {/* <Box
              display="flex"
              gap={{ xs: 1, md: 5 }}
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent={{ xs: "flex-end", md: "flex-start" }}
            >
              <Select
                onChange={handleChangeCategory}
                wrappersx={{
                  width: {
                    xs: "100%",
                    md: "unset",
                  },
                }}
                fullWidth
                menus={month}
                value={Category}
                sx={{
                  width: {
                    xs: "50%",
                    md: 150,
                    background: "#fff",
                    borderRadius: "10px",
                  },
                }}
                placeholder="Category"
              />
              <Select
                onChange={handleChangeCategory}
                wrappersx={{
                  width: {
                    xs: "100%",
                    md: "unset",
                    background: "#fff",
                    borderRadius: "10px",
                  },
                }}
                fullWidth
                menus={year}
                value={Category}
                sx={{
                  width: {
                    xs: "50%",
                    md: 150,
                    background: "#fff",
                    borderRadius: "10px",
                  },
                }}
                placeholder="Category"
              />
            </Box> */}
          </Box>
          <Box>
            {filterHistory.map(({ method, datetime_create: time , values, status }, index) => {
              return (
                <Box key={time}>
                  <DividerStyled light />
                  <Box display="flex" flexDirection="row" gap="4px" justifyContent={"space-between"}>
                    <Box display="flex" flexDirection="column">
                      <Text type={18} color="white">
                        {[ACTIVITY_METHOD[method]]}
                      </Text>
                      <Text type={12} color="white">
                        {time_format(time)}
                      </Text>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent={"center"}>
                      <Text type={18} color="white">
                        +{values?.toFixed(3)} CERO
                      </Text>
                      {status == 2 ? null : (
                        <Text type={10} color="white" fontWeight={100}>
                          ({[ACTIVITY_STATUS[status.toString()]]})
                        </Text>
                      )}
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </HistoryWrapper>
      </Wrapper_Container>
      {/* <Button_Display  onClick={() => router.push("/wallet")} /> */}
    </Wrapper>
  )
}

export default HistoryContainer_New

const Wrapper = styled(Box)(({ theme }) => ({
  padding: "24px 0px 50px 0px",
  display: "flex",
  justifyContent: "center",
  height: "100%",
  gap: "24px",
  // background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
}))

const Wrapper_Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  gap: "24px",
})

const BackButton = styled(ButtonBase)({
  display: "flex",
  // justifyContent: "center",
  background: "rgba(165, 218, 203, 0.1)",
  borderRadius: "8px",
  maxWidth: "164px",
  height: "32px",
  gap: "8.5px",
  alignItems: "center",
})
const Button_Display = () => {
  const router = useRouter()
  return (
    <BackButton onClick={() => router.push("/wallet")}>
      <Image src="/ReverseNext.svg" alt=" " width="16px" height="14px" />
      <Text type={14} fontWeight={500} color="white">
        Back to Wallets
      </Text>
    </BackButton>
  )
}
const HistoryWrapper = styled(Box)(({ theme }) => ({
  padding: "16px",
  background: "rgba(165, 218, 203, 0.1)",
  boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "1200px",
  [theme.breakpoints.down("md")]: {
    minWidth: "500px",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "300px",
  },
  [theme.breakpoints.down("ex_sm")]: {
    minWidth: "200px",
  },
}))

const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: COLORS.GREEN100,
  margin: "16px 0 36px 0",
  [theme.breakpoints.down("md")]: {
    margin: "16px 0",
  },
}))
