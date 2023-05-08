import { Container, Grid, styled, Box, useTheme } from "@mui/material"
import React, { Component, useState, useEffect, useMemo } from "react"
import { useAuthContext } from "../../contexts/auth/consume"
import {
  useQueryCarbonAcitivity,
  useQueryRank,
  useQueryprofile,
  useQueryMyRank,
  useQueryCarbonBalance,
  useQueryCarbonOverall,
} from "../../adapter/query"
import { Text, Button, Select } from "../../components"
import { rankType } from "../../utils/rank_type"
import { COLORS } from "../../theme"
import { CardItem } from "./View"
import Image from "next/image"
import { useRouter } from "next/router"
import { borderRadius, margin } from "@mui/system"
import Shopping_Logo from "../../public/Shopping_Logo"
import ProfileRank from "../../public/frame-top3/ProfileRank"
import HeroAnimation from "../../components/HeroAnimation"
import { RankDisplay as RankDisplay_new } from "./Container"

const CardStyled = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: "16px",
    backgroundColor: COLORS.WHITE,
    margin: "-24px -8px",
  },
}))

const Circle = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "red",
  borderRadius: "50%",
})

const FirstPlace = styled(Box)({
  width: "166px",
  height: "100%",
  background: "linear-gradient(180deg, #FBF196 1.11%, #FFD645 37.74%, #CCF2AF 83.82%, rgba(255, 255, 255, 0) 96.52%)",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  alignItems: "center",
})

const SecondPlace = styled(Box)({
  width: "166px",
  height: "320px",
  background: "linear-gradient(180.11deg, #D4DCE1 8%, #A1ABB2 59.58%, rgba(255, 255, 255, 0) 97.05%)",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  alignItems: "center",
})

const ThirdPlace = styled(Box)({
  width: "166px",
  height: "320px",
  background: "linear-gradient(180.11deg, #DBC5B6 5.68%, #C5A186 80.51%, rgba(255, 255, 255, 0) 97.29%)",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  alignItems: "center",
})

const WrapperText = styled(Box)({
  maxWidth: "160px",
  overflowWrap: "break-word",
  wordWrap: "break-word",
  textAlign: "center",
})

export const NameIcon = styled((pros) => <Box {...pros} />)(({ theme }) => ({
  textTransform: "uppercase",
  width: "60px",
  height: "60px",
  background: COLORS.GREEN040,
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  // [theme.breakpoints.down("sm")]: {
  //   width: "20px",
  //   height: "20px",
  // },
}))
export const NameIcon_2 = styled((pros) => <Box {...pros} />)(({ theme }) => ({
  textTransform: "uppercase",
  width: "60px",
  height: "60px",
  background: COLORS.GREEN040,
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  [theme.breakpoints.down("xl")]: {
    width: "30px",
    height: "30px",
  },
  [theme.breakpoints.down("md")]: {
    width: "20px",
    height: "20px",
  },
  [theme.breakpoints.down("ex_sm")]: {
    width: "15px",
    height: "15px",
  },
}))

const KycDisplay = styled(Box)(({ theme }) => ({
  background: "rgba(220, 93, 94, 0.8)",
  width: "100%",
  borderRadius: "4px",
  boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
  padding: "8px",
  display: "flex",
  gap: "5px",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    gap: "10px",
  },
}))

const cardOptions = [
  {
    imageSource: "/wallet.svg",
    title: "What is Carbon Wallet?",
    description:
      "A platform for exchanging goods and services by tracking green activity in daily life through tokenized on blockchain to become CERO tokens from various technologies in the form of play to earn.",
  },
  {
    imageSource: "/todamoon.svg",
    title: "Our mission",
    description:
      "Empower to play to earn carbon saving in different aspects of dairy lives and reward users for taking green activity.",
  },
  {
    imageSource: "/principle.svg",
    title: "Our principle",
    description:
      "Green in, green out. Users take green activity and save carbon to earn CERO coin and redeem green products, services, experiences from sustainable businesses and organizations.",
  },
]

const menuCategory = [
  {
    key: "all",
    value: "all",
    display: "All",
  },
  {
    key: "dining",
    value: "dining",
    display: "Dining",
  },
  {
    key: "shopping",
    value: "shopping",
    display: "Shopping",
  },
  {
    key: "transport",
    value: "trasportation",
    display: "Transport",
  },
  {
    key: "recycling",
    value: "recycling",
    display: "Recycling",
  },
  {
    key: "foresting",
    value: "foresting",
    display: "Foresting",
  },
  {
    key: "others",
    value: "others",
    display: "Others",
  },
]

const menuRanking = [
  { value: "main", key: "main", display: "Main" },
  { value: "golf", key: "golf", display: "Golf" },
]

const MOCK_USER_RANK = [
  { image: "", full_name: "Akira Aki", email: "Akira@gmail.com", total_carbon_saving: 665, rank: "1" },
  { image: "", full_name: "Sarah", email: "s.a@gmail.com", total_carbon_saving: 400, rank: "2" },
  { image: "", full_name: "Benzama", email: "bemza@gmail.com", total_carbon_saving: 200, rank: "3" },
]

// for mock in Main ranking
const MOCK_USER_RANK_2 = [
  { image: "", full_name: "Akira Aki", email: "Akira@gmail.com", total_carbon_saving: 665, rank: "1", comp: "scg" },
  { image: "", full_name: "Sarah", email: "s.a@gmail.com", total_carbon_saving: 400, rank: "2", comp: "banpu" },
  { image: "", full_name: "Benzama", email: "bemza@gmail.com", total_carbon_saving: 200, rank: "3", comp: "banpi" },
  { image: "", full_name: "Okoya", email: "okk@gmail.com", total_carbon_saving: 100, rank: "4", comp: "scg" },
  { image: "", full_name: "Sarah", email: "s.a@gmail.com", total_carbon_saving: 9, rank: "5", comp: "banpu" },
  { image: "", full_name: "Benzama", email: "bemza@gmail.com", total_carbon_saving: 4, rank: "6", comp: "banpi" },
  { image: "", full_name: "Akira Aki", email: "Akira@gmail.com", total_carbon_saving: 3, rank: "7", comp: "scg" },
  { image: "", full_name: "Sarah", email: "s.a@gmail.com", total_carbon_saving: 2, rank: "8", comp: "banpu" },
  { image: "", full_name: "Benzama", email: "bemza@gmail.com", total_carbon_saving: 0.1, rank: "9", comp: "banpi" },
  { image: "", full_name: "Benzama", email: "bemza@gmail.com", total_carbon_saving: 0.05, rank: "10", comp: "banpi" },
]

// for mock in Golf ranking
const MOCK_USER_RANK_3 = [
  {
    image: "",
    full_name: "NARABODIN SWAENDGEE (17 YEARS.)",
    email: "NARABODIN SWAENDGEE (17 YEARS.)",
    total: "E",
    r1: "75",
    r2: "69",
    co2: "20",
    rank: "1",
    comp: "scg",
  },
  {
    image: "",
    full_name: "PANGYAPAT KHANTIYOO (16 YEARS.)",
    email: "PANGYAPAT KHANTIYOO (16 YEARS.)",
    total: "+7",
    r1: "74",
    r2: "77",
    co2: "15",
    rank: "2",
    comp: "scg",
  },
  {
    image: "",
    full_name: "BHUMKIT PICHAYASAOWAPAK (15 YEARS.)",
    email: "BHUMKIT PICHAYASAOWAPAK (15 YEARS.)",
    total: "+8",
    r1: "78",
    r2: "74",
    co2: "13",
    rank: "3",
    comp: "scg",
  },
  {
    image: "",
    full_name: "BHUMKIT PICHAYASAOWAPAK (15 YEARS.)",
    email: "BHUMKIT PICHAYASAOWAPAK (15 YEARS.)",
    total: "+9",
    r1: "76",
    r2: "77",
    co2: "9",
    rank: "4",
    comp: "scg",
  },
  {
    image: "",
    full_name: "THACHATA LIMPAWIKORN (16 YEARS.)",
    email: "THACHATA LIMPAWIKORN (16 YEARS.)",
    total: "+9",
    r1: "75",
    r2: "78",
    co2: "7",
    rank: "5",
    comp: "scg",
  },
  {
    image: "",
    full_name: "TANA BUTWAEW (15 YEARS.)",
    email: "TANA BUTWAEW (15 YEARS.)",
    total: "+10",
    r1: "76",
    r2: "78",
    co2: "5",
    rank: "6",
    comp: "scg",
  },
  {
    image: "",
    full_name: "PUNYAWAT JONGSRI-ADISORN ( 16 YEARS.)",
    email: "PUNYAWAT JONGSRI-ADISORN ( 16 YEARS.)",
    total: "+11",
    r1: "76",
    r2: "79",
    co2: "6",
    rank: "7",
    comp: "scg",
  },
  {
    image: "",
    full_name: "PATTHADON VIRIYAPRAKOB ( 16 YEARS.)",
    email: "PATTHADON VIRIYAPRAKOB ( 16 YEARS.)",
    total: "+14",
    r1: "78",
    r2: "80",
    co2: "5",
    rank: "8",
    comp: "scg",
  },
  {
    image: "",
    full_name: "SATORU KANED (18 YEARS.)",
    email: "SATORU KANED (18 YEARS.)",
    total: "+14",
    r1: "79",
    r2: "79",
    co2: "3",
    rank: "9",
    comp: "scg",
  },
  {
    image: "",
    full_name: "NUTTADECH PHUEAKKWANYUEN (16 YEARS)",
    email: "NUTTADECH PHUEAKKWANYUEN (16 YEARS)",
    total: "+12",
    r1: "79",
    r2: "75",
    co2: "3",
    rank: "10",
    comp: "scg",
  },
]

const HomeContainer = (props) => {
  const { isAuth } = useAuthContext()
  const router = useRouter()
  const theme = useTheme()
  const [Category, setCategory] = useState("all")
  const [seeVerified, setseeVerified] = useState()
  const [rankCurrent, setRankCurrent] = useState("main")
  const { data: activity } = useQueryCarbonAcitivity({})
  const [test, settest] = useState(3)

  const { data: carbonBalance } = useQueryCarbonBalance({})

  const { data: carbonOverall } = useQueryCarbonOverall({})

  const { data: rank } = useQueryRank({
    payload: {
      type: rankType[Category],
    },
    options: {
      // onSuccess: (d) => console.log(d),
      // onError: (err) => console.log(err),
    },
  })

  const { data: myRank } = useQueryMyRank({
    options: {
      // onSuccess: (s) => console.log(s),
      // onError: (err) => console.log(err),
    },
  })

  const { data: profile } = useQueryprofile({
    options: {
      // onSuccess: (s) => console.log(s),
      // onError: (err) => console.log(err),
    },
  })

  const count = rank?.count

  const handleChangeCategory = (e) => {
    setCategory(e.target.value)
  }

  const handleChangeCurrent = (e) => {
    setRankCurrent(e.target.value)
  }

  const handleGoToKycPage = () => {
    router.push("/kyc")
  }

  const normalize = (text) => {
    switch (text) {
      case "shopping":
        return "Shopping"
      case "dining":
        return "Dining"
      case "transportation":
        return "Transportation"
      case "recycling":
        return "Recycling"
      case "foresting":
        return "Foresting"
      case "others":
        return "Others"
    }
  }

  useEffect(() => {
    if (profile?.kyc_status == 2 || profile?.kyc_status == 1) {
      localStorage.setItem("seeVerified", false)
    }

    setseeVerified(localStorage.getItem("seeVerified"))

    if (profile?.kyc_status == 3) {
      localStorage.setItem("seeVerified", true)
    }

    // if(test == 2 || test == 1 ){
    //   localStorage.setItem("seeVerified", false)
    // }
    // setseeVerified(localStorage.getItem("seeVerified"))

    // if(test == 3){
    //   localStorage.setItem("seeVerified", true)
    // }
  }, [])
  return (
    <Box>
      {isAuth ? (
        <>
          {/* ------------------------------------- Carbon Saving --------------------------------------------------*/}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
            }}
          >
            <Box
              height="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              px={{ xs: "16px", md: "170px" }}
              py="32px"
              sx={{ paddingTop: "32px" }}
            >
              {(!(seeVerified == "true") && profile?.kyc_status) == 3 && <Kyc_Check_Verify />}
              {profile?.kyc_status == 2 && <Kyc_Check_Inreview />}
              {(profile?.kyc_status == 1 || profile?.kyc_status == -1) && (
                <Kyc_Check_Unverify handleOnclick={handleGoToKycPage} />
              )}
              {/* {(kyc_status == 1 || kyc_status == -1) && <Kyc_Check_Unverify handleOnclick={handleGoToKycPage} />} */}
              <Box
                sx={{
                  background: "rgba(165, 218, 203, 0.1)",
                  boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
                  borderRadius: "8px",
                }}
                px={{ xs: "0px", md: "28px" }}
                mt="24px"
                py="28px"
                height="100%"
                width="100%"
                display="flex"
                alignItems="center"
              >
                <Box display="flex" flexDirection="column" width="100%" alignItems="center">
                  <Text type="16" fontWeight={600} color="white">
                    You saved
                  </Text>
                  <Text type="32" fontWeight={700} color="green_neon">
                    {activity?.overall_carbon_saving?.toFixed(5)}
                  </Text>
                  <Text type="14" fontWeight={400} color="green040" textAlign="center">
                    See how far you can save carbon for this world through your activities in daily life
                  </Text>
                  {/* ------------------------------------- Icons ------------------------------------------------------*/}
                  <CarbonSavingBox_Auth>
                    {activity?.category.map((d) => {
                      return (
                        <CarbonSavingDisplay
                          key={d.type_display}
                          value={d.total_carbon_saving.toFixed(2)}
                          category={d.type_display}
                          isAuth={isAuth}
                        />
                      )
                    })}
                  </CarbonSavingBox_Auth>
                </Box>
              </Box>
              <Box
                width="100%"
                height={{ xs: "50px", md: "110px" }}
                marginTop="39px"
                sx={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}
              >
                <Image src="/Large_Leaderboard_1.png" layout="fill" objectFit="fill" />
              </Box>
            </Box>
          </Box>
          {/* ------------------------------------- Ranking -----------------------------------------------------*/}
          <Box
            width="100%"
            height="100%"
            sx={{
              background: "url(bg_leaderboard.png) no-repeat ",
              backgroundSize: "100%",
            }}
          >
            {/* ------------------------------------ Top3 -------------------------------------------------------*/}
            <Box
              display="flex"
              justifyContent="center"
              paddingTop="64px"
              // marginTop="64px"
              height="460px"
              width="100%"
              alignItems="flex-end"
              sx={{ background: "rgba(241, 243, 245, 0.5)" }}
            >
              {count > 3 ? (
                <Top3_Display_Fix data={rank?.results.filter((d, index) => index < 3)} />
              ) : (
                <Top3_Display_Fix data={MOCK_USER_RANK} />
              )}
            </Box>
            {/* ----------------------------------- Top10 --------------------------------------------------------*/}
            <Box
              width="100%"
              // height="1140px"
              sx={{ background: "rgba(241, 243, 245, 0.5)" }}
              px={{ xs: "0px", md: "100px",lg:'260px' }}
            >
              <Box
                width="100%"
                height="100%"
                p={{ md: "32px" }}
                px={{ xs: "0px" }}
                py={{ xs: "32px" }}
                sx={{ background: "#FFF", borderRadius: "8px" }}
              >
                {/* -------------------------------- Header ----------------------------------------------------- */}
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  width="100%"
                  px={{ xs: "16px" }}
                >
                  <Text type="32" fontWeight="500" color="#22523E">
                    TOP 10 LEADERS
                  </Text>
                  <Box display="flex" gap={5} justifyContent={{ xs: "flex-end", md: "flex-start" }}>
                    <Select
                      onChange={handleChangeCurrent}
                      wrapperSx={{
                        width: {
                          xs: "100%",
                          md: "unset",
                        },
                      }}
                      fullWidth
                      menus={menuRanking}
                      value={rankCurrent}
                      sx={{
                        width: {
                          xs: "50%",
                          md: 150,
                          background: "#fff",
                          borderRadius: "100px",
                        },
                      }}
                      placeholder="Category"
                    />
                  </Box>
                </Box>
                <br />
                {/* -------------------------------- Ranking Board ------------------------------------------------*/}
                <Box
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  sx={{ background: rankCurrent === "golf" ? "#4F4D4B" : "", borderRadius: "4px" }}
                >
                  {rankCurrent === "main" ? (
                    <div>
                      {rank?.results.map(({ full_name, email, image, rank, total_carbon_saving },index) => {
                        return (
                          <RankDisplay_new
                            name={full_name}
                            isme={email === profile?.email}
                            img={image}
                            rank={index+1}
                            // rank={rank}
                            email={email}
                            carbon={total_carbon_saving}
                            key={rank}
                          />
                        )
                      })}
                      {/* {myRank?.detail === undefined ? (
                        <RankDisplay_new
                          key={myRank?.rank}
                          rank={myRank?.rank}
                          name={myRank?.full_name}
                          email={myRank?.email}
                          carbon={myRank?.total_carbon_saving}
                          img={myRank?.image}
                          isTop={false}
                        />
                      ) : (
                        <></>
                        // <NoRankDisplay name={profile?.first_name} email={profile?.email} image={profile?.image} />
                      )} */}
                    </div>
                  ) : rankCurrent === "golf" ? (
                    <>
                      <Box display="flex" width="100%" minWidth="800px" height="40px" sx={{ background: "#0D4364" }}>
                        <Box sx={{ width: "55%", paddingLeft: "40px", display: "flex", alignItems: "center" }}>
                          <Text width="100px" type={16} fontWeight={600} color="white">
                            NAME
                          </Text>
                        </Box>
                        <Box
                          sx={{
                            width: "45%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0px 10px 0px 10px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "25%",
                              height: "100%",
                            }}
                          >
                            <Text width="100px" type={16} fontWeight={600} color="white">
                              TOTAL
                            </Text>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "25%",
                              height: "100%",
                            }}
                          >
                            <Text width="100px" type={16} fontWeight={600} color="white">
                              ROUND 1
                            </Text>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "25%",
                              height: "100%",
                            }}
                          >
                            <Text width="100px" type={16} fontWeight={600} color="white">
                              ROUND 2
                            </Text>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "25%",
                              height: "100%",
                            }}
                          >
                            <Image src="/cero_2.svg" width="40px" height="40px" />
                            <Text width="100px" type={10} fontWeight={600} color="white" sx={{ width: "30px" }}>
                              CERO SCORE
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                      {MOCK_USER_RANK_3.map(({ full_name, email, total, r1, r2, co2, rank, image, comp }) => {
                        return (
                          <RankDisplay2
                            key={rank}
                            rank={rank}
                            comp={comp}
                            name={full_name}
                            email={email}
                            co2={co2}
                            image={image}
                            total={total}
                            r1={r1}
                            r2={r2}
                          />
                        )
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
                <Box display="flex" justifyContent="center">
                  <Button variant="outlined_square" sx={{ marginTop: "20px", width: "320px" }}>
                    <Text type="20" fontWeight={700} color="primary">
                      Go to Leaderboard
                    </Text>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        // Unauth
        <>
          {/* ------------------------------------- Carbon Saving ----------------------------------------------*/}
          <Box
            sx={{
              height: "100%",
              width: "100%",
              backgroundImage: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
            }}
          >
            {/* ------------------------------------ Carbon Saving ----------------------------------------------*/}
            <Box
              display="flex"
              height="531px"
              sx={{
                [theme.breakpoints.down("md")]: {
                  flexDirection: "column-reverse",
                },
              }}
            >
              <Box
                width="50%"
                height="531px"
                display="flex"
                alignItems="center"
                alignContent="center"
                justifyContent="flex-end"
                sx={{
                  [theme.breakpoints.down("md")]: {
                    width: "100%",
                    justifyContent: "flex-start",
                  },
                  [theme.breakpoints.down("ex_sm")]: {
                    maxHeight: "300px",
                  },
                }}
              >
                <Box
                  width="536px"
                  height="283px"
                  display="flex"
                  justifyContent="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <Box
                    width="350px"
                    height="254px"
                    display="flex"
                    flexDirection="column"
                    sx={{
                      [theme.breakpoints.down("ex_sm")]: {
                        width: "200px",
                      },
                    }}
                  >
                    {/* <Text>{activity.overall_carbon_saving}</Text> */}
                    <Text
                      type={28}
                      fontWeight={700}
                      breakpoints={"ex_sm"}
                      mobileFontWeight={500}
                      mobileType={14}
                      color="white"
                    >
                      Save world's CO2,
                      <br />
                      Create your wallet
                    </Text>
                    <Text type={14} fontWeight={500} margin="2px" color="white">
                      Empower to play to earn carbon saving in different aspects of dairy lives and reward users for
                      taking green activity.
                    </Text>
                    <Button variant="outlined_square" fullWidth sx={{ marginTop: "20px" }}>
                      <Text type="20" fontWeight={700} color="primary">
                        Join us
                      </Text>
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box
                width="50%"
                display={"none"}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    width: "100%",
                    display: "inline",
                  },
                  [theme.breakpoints.down("ex_sm")]: {
                    height: "300px",
                  },
                }}
                height="531px"
                position={"relative"}
                overflow={"hidden"}
              >
                <Image src="/Mask_group.png" width="721px" height="531px" />

                {/* <HeroAnimation /> */}
              </Box>
              <Box
                width="50%"
                display={"inline"}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    width: "100%",
                    display: "none",
                  },
                }}
                height="531px"
                position={"relative"}
                overflow={"hidden"}
              >
                <HeroAnimation />
              </Box>
            </Box>
            {/* ----------------------------------------- Activity ----------------------------------------------- */}
            <Box
              sx={{ background: "rgba(165, 218, 203, 0.1)" }}
              display="flex"
              flexDirection="column"
              width="100%"
              py="32px"
              alignItems="center"
            >
              <Text type="16" fontWeight={600} color="white">
                Now we saved
              </Text>
              <Text type="32" fontWeight={700} color="green_neon">
                {/* {(activity?.overall_carbon_saving).toFixed(5)} */}
                {/* {activity?.overall_carbon_saving?.toFixed(5)} */}
                {carbonOverall?.carbon_removed}
              </Text>
              <Text type="14" fontWeight={400} color="green040" textAlign="center">
                See how far you can save carbon for this world through your activities in daily life
              </Text>
              {/* ------------------------------------- Icons ------------------------------------------------------*/}
              <CarbonSavingBox>
                {activity?.category.map((d) => {
                  return (
                    <CarbonSavingDisplay
                      key={d.type_display}
                      value={d.total_carbon_saving.toFixed(2)}
                      category={d.type_display}
                      mock={carbonOverall?.carbon_removed}
                    />
                  )
                })}
              </CarbonSavingBox>
            </Box>
          </Box>
          {/* ------------------------------------- Ranking -----------------------------------------------------*/}
          <Box
            width="100%"
            height="100%"
            sx={{
              background: "url(bg_leaderboard.png) no-repeat ",
              backgroundSize: "100%",
            }}
          >
            {/* ------------------------------------ Top3 -------------------------------------------------------*/}
            <Box
              display="flex"
              justifyContent="center"
              paddingTop="64px"
              // marginTop="64px"
              height="460px"
              width="100%"
              alignItems="flex-end"
              sx={{ background: "rgba(241, 243, 245, 0.5)" }}
            >
              {count > 3 ? (
                <Top3_Display_Fix data={rank?.results.filter((d, index) => index < 3)} />
              ) : (
                <Top3_Display_Fix data={MOCK_USER_RANK} />
              )}
            </Box>
            {/* ----------------------------------- Top10 --------------------------------------------------------*/}
            <Box
              width="100%"
              height="1140px"
              sx={{ background: "rgba(241, 243, 245, 0.5)" }}
              px={{ xs: "0px", md: "260px" }}
            >
              <Box width="100%" height="100%" py="25px">
                {/* -------------------------------- Header ----------------------------------------------------- */}
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  width="100%"
                >
                  <Text type={20} fontWeight={700}>
                    Top 10 Leaders
                  </Text>
                  <Box display="flex" gap={1} justifyContent={{ xs: "flex-end", md: "flex-start" }}>
                    <Select
                      onChange={handleChangeCurrent}
                      wrapperSx={{
                        width: {
                          xs: "100%",
                          md: "unset",
                        },
                      }}
                      fullWidth
                      menus={menuRanking}
                      value={rankCurrent}
                      sx={{
                        width: {
                          xs: "50%",
                          md: 150,
                          background: "#fff",
                          borderRadius: "100px",
                        },
                      }}
                      placeholder="Category"
                    />
                    {/* <Button variant="outlined_rounded" sx={{ width: "120px", borderWidth: "5px" }}>
                      <Text type="20" fontWeight={600} color="primary">
                        Main
                      </Text>
                    </Button>
                    <Button variant="outlined_rounded" borderColor='#979797' sx={{ width: "120px" }}>
                      <Text type="20" fontWeight={600} color="primary">
                        GOLF
                      </Text>
                    </Button> */}
                  </Box>
                </Box>
                <br />
                {/* -------------------------------- Ranking Board ------------------------------------------------*/}
                <Box
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  sx={{ background: rankCurrent === "golf" ? "#4F4D4B" : "", borderRadius: "4px" }}
                >
                  {rankCurrent === "main" ? (
                    <>
                      {rank?.results.map(({ full_name, email, image, rank, total_carbon_saving },index) => {
                        return (
                          <RankDisplay_new
                            name={full_name}
                            img={image}
                            // rank={rank}
                            rank={index+1}
                            email={email}
                            carbon={total_carbon_saving}
                          />
                        )
                      })}
                    </>
                  ) : rankCurrent === "golf" ? (
                    <>
                      <Box
                        display="flex"
                        width="100%"
                        minWidth="800px"
                        height="40px"
                        sx={{
                          background: "#0D4364",
                          [theme.breakpoints.down("xl")]: {
                            minWidth: "unset",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: "55%",
                            paddingLeft: "40px",
                            display: "flex",
                            alignItems: "center",
                            [theme.breakpoints.down("md")]: {
                              paddingLeft: "15px",
                              width: "40%",
                            },
                          }}
                        >
                          <Text
                            width="100px"
                            type={16}
                            fontWeight={600}
                            mobileType={12}
                            breakpoints={"lg"}
                            color="white"
                            mobileWidth={"40px"}
                          >
                            NAME
                          </Text>
                        </Box>
                        <Box
                          sx={{
                            width: "45%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0px 10px 0px 10px",

                            [theme.breakpoints.down("xl")]: {
                              width: "60%",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "25%",
                              height: "100%",
                            }}
                          >
                            <Text
                              width="100px"
                              type={16}
                              fontWeight={600}
                              color="white"
                              mobileFontWeight={400}
                              mobileType={10}
                              breakpoints={"lg"}
                            >
                              TOTAL
                            </Text>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "25%",
                              height: "100%",
                            }}
                          >
                            <Text
                              width="100px"
                              type={16}
                              fontWeight={600}
                              mobileFontWeight={400}
                              mobileType={10}
                              color="white"
                              breakpoints={"lg"}
                            >
                              ROUND 1
                            </Text>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "25%",
                              height: "100%",
                            }}
                          >
                            <Text
                              width="100px"
                              type={16}
                              fontWeight={600}
                              mobileFontWeight={400}
                              mobileType={10}
                              color="white"
                              breakpoints={"lg"}
                            >
                              ROUND 2
                            </Text>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "25%",
                              height: "100%",
                            }}
                          >
                            <Image src="/cero_2.svg" width="40px" height="40px" />
                            <Box
                              sx={{
                                [theme.breakpoints.down("sm")]: {
                                  display: "none",
                                },
                              }}
                            >
                              <Text width="100px" type={10} fontWeight={600} color="white" sx={{ width: "30px" }}>
                                CERO SCORE
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      {MOCK_USER_RANK_3.map(({ full_name, email, total, r1, r2, co2, rank, image, comp }) => {
                        return (
                          <RankDisplay2
                            key={rank}
                            rank={rank}
                            comp={comp}
                            name={full_name}
                            email={email}
                            co2={co2}
                            image={image}
                            total={total}
                            r1={r1}
                            r2={r2}
                            theme={theme}
                          />
                        )
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
                <Box display="flex" justifyContent="center">
                  <Button variant="outlined_square" sx={{ marginTop: "20px", width: "320px" }}>
                    <Text type="20" fontWeight={700} color="primary">
                      Join our activity
                    </Text>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default HomeContainer

const RankDisplay = (props) => {
  const { rank, name, comp, co2, email, image, isTop, is_me } = props

  return (rank <= 10 && isTop) || (rank > 10 && !isTop) ? (
    <Box
      display="flex"
      width="100%"
      height="76px"
      px="8px"
      justifyContent="space-between"
      sx={{ borderRadius: "8px", background: `${is_me ? "#F1F3F5" : null}` }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {rank <= 3 ? (
          <Image src={`/icon-top-rank/icon_${rank}_rank.svg`} alt="" width="45" height="45" />
        ) : (
          <Text type="20" fontWeight="900" color="#00664E" sx={{ width: "5px", margin: "0 22px 0 17px" }}>
            {rank}
          </Text>
        )}
        {image !== "" ? (
          <Box
            sx={{
              borderRadius: "50%",
              overflow: "hidden",
              maxWidth: "60px",
              maxHeight: "60px",
              border: "5px solid #59B29F",
            }}
          >
            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/media/${image}`} width="60" height="60" />
          </Box>
        ) : (
          <NameIcon>
            <Text type="14" fontWeight={700}>
              {name ? name.slice(0, 1) : email ? email.slice(0, 1) : ""}
            </Text>
          </NameIcon>
        )}
        <Box display="flex" flexDirection="column" justifyContent="flex-start">
          <Text type={20} fontWeight={900} color="#00664E">
            {name == " " ? email : name}
          </Text>
          <Text type={12} fontWeight={600}>
            {comp}
          </Text>
        </Box>
      </Box>
      <Box width="230px" display="flex" justifyContent="space-between" alignItems="center">
        {/* <Circle sx={{ width: "30px", height: "30px" }}></Circle> */}
        {/* <Image src={`/Shopping.svg`} width="44px" height="44px" /> */}
        <Shopping_Logo />
        <Text type="20" fontWeight="500" sx={{ color: "#59B29F" }}>
          {co2.toFixed(3)} kg CO2e
        </Text>
      </Box>
    </Box>
  ) : null
}

const RankDisplay2 = ({ name, email, total, r1, r2, co2, rank, image, comp, theme }) => {
  return (
    <Box
      display="flex"
      width="100%"
      minWidth="800px"
      height="76px"
      sx={{
        "&:hover": {
          background: "#1FADEB",
        },
        [theme?.breakpoints.down("xl")]: {
          minWidth: "unset",
        },
      }}
    >
      {/* <Box sx={{ width: "60%", paddingLeft: "10px", display: "flex", alignItems: "center" }}>
        <Text width="100px" type={20} fontWeight={600} color="white">
          NARABODIN SWAENDGEE (17 YEARS.)
        </Text>
      </Box> */}
      <Box
        display="flex"
        width="55%"
        alignItems="center"
        gap={3}
        paddingLeft="10px"
        sx={{
          [theme?.breakpoints.down("md")]: {
            gap: "8px",
            width: "40%",
          },
        }}
      >
        <Text
          type={18}
          fontWeight={700}
          color="white"
          mobileFontWeight={400}
          mobileType={10}
          breakpoints={"lg"}
          width={"5px"}
        >
          {rank}
        </Text>
        {image !== "" ? (
          <Box
            sx={{
              borderRadius: "50%",
              overflow: "hidden",
              maxWidth: "60px",
              maxHeight: "60px",
              border: "5px solid #59B29F",
            }}
          >
            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/media/${image}`} width="60px" height="60px" />
          </Box>
        ) : (
          <NameIcon_2>
            <Text type="14" fontWeight={700} mobileFontWeight={400} mobileType={10}>
              {name == " " ? email.slice(0, 1) : name.slice(0, 1)}
            </Text>
          </NameIcon_2>
        )}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          sx={{
            [theme?.breakpoints.down("md")]: {
              width: "70px",
            },
          }}
        >
          <Box
            sx={{
              display: "block",
              [theme?.breakpoints.down("ex_sm")]: {
                display: "none",
              },
            }}
          >
            <Text type={16} fontWeight={700} color="white" mobileFontWeight={400} mobileType={10} breakpoints={"lg"}>
              {name == " " ? email : name}
            </Text>
          </Box>
          <Box
            sx={{
              display: "none",
              [theme?.breakpoints.down("ex_sm")]: {
                display: "block",
              },
            }}
          >
            <Text type={16} fontWeight={700} color="white" mobileFontWeight={400} mobileType={10} breakpoints={"lg"}>
              {`${name.slice(0,8)}..`}
            </Text>
          </Box>
          <Text type={12} fontWeight={600} color="white" mobileFontWeight={400} mobileType={10} breakpoints={"lg"}>
            {comp}
          </Text>
        </Box>
      </Box>
      <Box
        sx={{
          width: "45%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 10px 0px 10px",
          [theme?.breakpoints.down("md")]: {
            width: "60%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "25%",
            height: "100%",
          }}
        >
          <Text
            width="100px"
            type={20}
            fontWeight={600}
            color="white"
            mobileFontWeight={400}
            mobileType={14}
            breakpoints={"lg"}
          >
            {total}
          </Text>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "25%",
            height: "100%",
          }}
        >
          <Text
            width="100px"
            type={20}
            fontWeight={600}
            color="white"
            mobileFontWeight={400}
            mobileType={14}
            breakpoints={"lg"}
          >
            {r1}
          </Text>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "25%",
            height: "100%",
          }}
        >
          <Text
            width="100px"
            type={20}
            fontWeight={600}
            color="white"
            mobileFontWeight={400}
            mobileType={14}
            breakpoints={"lg"}
          >
            {r2}
          </Text>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "25%",
            height: "100%",
          }}
        >
          <Text
            width="100px"
            type={20}
            fontWeight={600}
            color="white"
            mobileFontWeight={400}
            mobileType={14}
            breakpoints={"lg"}
          >
            {co2}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

const NoRankDisplay = ({ name, email, image }) => {
  return (
    <Box
      display="flex"
      width="100%"
      height="76px"
      px="10px"
      justifyContent="space-between"
      sx={{ borderRadius: "8px", background: "#F1F8F6" }}
    >
      <Box display="flex" alignItems="center" gap={3}>
        {image ? (
          <Box
            sx={{
              borderRadius: "50%",
              overflow: "hidden",
              maxWidth: "60px",
              maxHeight: "60px",
              border: "5px solid #59B29F",
            }}
          >
            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/media/${image}`} width="60px" height="60px" />
          </Box>
        ) : (
          <NameIcon>
            <Text type="14" fontWeight={700}>
              {name ? name.slice(0, 1) : email ? email.slice(0, 1) : ""}
            </Text>
          </NameIcon>
        )}
        <Box display="flex" flexDirection="column" justifyContent="flex-start">
          <Text type={16} fontWeight={700} color="#00664E">
            {name == "" ? email : name}
          </Text>
          <Text type="14" fontWeight="500">
            No ranking
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

const CarbonSavingDisplay = (props) => {
  const { category, value, isAuth, mock } = props
  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ minWidth: { xs: "100px", md: "148px" } }}>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "72px", width: "72px" }}>
        <Image src={`/${category}.svg`} alt="" width="100%" height="100%" />
      </Box>
      <Text type={12} fontWeight={500} color="green040">
        {category}
      </Text>
      {isAuth ? (
        <Text type={18} fontWeight={600} color="green_neon">
          {value}
        </Text>
      ) : (
        <Text type={18} fontWeight={600} color="white">
          {category === "Shopping" ? mock?.toFixed(2) : value}
        </Text>
      )}
      {/* <Text type={18} fontWeight={600} color='white'>
        {value}
      </Text> */}
      <Text type={12} fontWeight={500} color="green040">
        kg CO2
      </Text>
    </Box>
  )
}

const Top3_Display = (props) => {
  const { data } = props
  return (
    <>
      {data !== undefined ? (
        <>
          <SecondPlace>
            <NameIcon sx={{ width: "100px", height: "100px", marginTop: "30px" }}>
              <Text type="25" fontWeight={700}>
                {data != undefined && data[1].full_name != " " ? data[1]?.full_name?.slice(0, 1) : "5"}
              </Text>
            </NameIcon>
            <Text type={50} fontWeight={900} sx={{ marginTop: "3px" }} color="white">
              {data != undefined ? data[1].rank : null}
            </Text>
            {/* <WrapperText> */}
            <Text type={20} fontWeight={700} sx={{ marginTop: "3px" }} color="white">
              {data[1].full_name}
            </Text>

            {/* </WrapperText> */}
            <Text type={14} fontWeight={700} sx={{ marginTop: "3px" }} color="white">
              {data != undefined ? data[1].total_carbon_saving.toFixed(3) : null} kg CO2e
            </Text>
          </SecondPlace>
          <FirstPlace>
            <NameIcon sx={{ width: "100px", height: "100px", marginTop: "30px" }}>
              <Text type="25" fontWeight={700}>
                {data != undefined && data[0].full_name != " "
                  ? data[0].full_name.slice(0, 1)
                  : data[0].email.slice(0, 1)}
              </Text>
            </NameIcon>
            <Text type={50} fontWeight={900} sx={{ marginTop: "3px" }} color="white">
              {data != undefined ? data[0].rank : null}
            </Text>
            <WrapperText>
              <Text type={20} fontWeight={700} sx={{ marginTop: "3px" }} color="white">
                {data != undefined && data[0].full_name != " " ? data[0].full_name : data[0].email}
              </Text>
            </WrapperText>

            <Text type={14} fontWeight={700} sx={{ marginTop: "3px" }} color="white">
              {data != undefined ? data[0].total_carbon_saving.toFixed(3) : null} kg CO2e
            </Text>
          </FirstPlace>
          <ThirdPlace>
            <NameIcon sx={{ width: "100px", height: "100px", marginTop: "30px" }}>
              <Text type="25" fontWeight={700}>
                {data != undefined && data[2].full_name != " "
                  ? data[2].full_name.slice(0, 1)
                  : data[2].email.slice(0, 1)}
              </Text>
            </NameIcon>
            <Text type={50} fontWeight={900} sx={{ marginTop: "3px" }} color="white">
              {data != undefined ? data[2].rank : null}
            </Text>
            <Text type={20} fontWeight={700} sx={{ marginTop: "3px" }} color="white">
              {data != undefined && data[2].full_name != " " ? data[2].full_name : data[2].email}
            </Text>
            <Text type={14} fontWeight={700} sx={{ marginTop: "3px" }} color="white">
              {data != undefined ? data[2].total_carbon_saving.toFixed(3) : null} kg CO2e
            </Text>
          </ThirdPlace>
        </>
      ) : null}
    </>
  )
}

const Top3_Display_Fix = (props) => {
  const { data } = props
  return (
    <>
      {data !== undefined && (
        <>
          {data[1] !== undefined && (
            <SecondPlace>
              {/* <NameIcon sx={{ width: "100px", height: "100px", marginTop: "30px" }}>
                <Text type="25" fontWeight={700}>
                  {data != undefined && data[1].full_name != " " ? data[1]?.full_name?.slice(0, 1) : "5"}
                </Text>
              </NameIcon> */}
              {data[1].image !== "" ? (
                <ProfileRank frame={2} profile={data[1].image} />
              ) : (
                <ProfileRank frame={2}>
                  <NameIcon sx={{ width: "119px", height: "119px", position: "absolute", top: "-68px" }}>
                    <Text type="25" fontWeight={700}>
                      {data != undefined && data[1].full_name != " "
                        ? data[1]?.full_name?.slice(0, 1)
                        : data[1].email.slice(0, 1)}
                    </Text>
                  </NameIcon>
                </ProfileRank>
              )}
              <Text type={50} fontWeight={900} sx={{ marginTop: "3px" }} color="white">
                {data != undefined ? data[1].rank : null}
              </Text>
              <WrapperText>
                <Text type={20} fontWeight={700} sx={{ marginTop: "3px" }} color="white">
                  {data != undefined && data[1].full_name != " " ? data[1].full_name : data[1].email}
                </Text>
              </WrapperText>
              <Text type={14} fontWeight={700} sx={{ marginTop: "3px" }} color="white">
                {data != undefined ? data[1].total_carbon_saving.toFixed(3) : null} kg CO2e
              </Text>
            </SecondPlace>
          )}
          {data[0] !== undefined && (
            <FirstPlace>
              {/* <NameIcon sx={{ width: "100px", height: "100px", marginTop: "30px" }}>
                <Text type="25" fontWeight={700}>
                  {data != undefined && data[0].full_name != " "
                    ? data[0].full_name.slice(0, 1)
                    : data[0].email.slice(0, 1)}
                </Text>
              </NameIcon> */}
              {data[0].image !== "" ? (
                <ProfileRank frame={1} profile={data[0].image} />
              ) : (
                <ProfileRank frame={1}>
                  <NameIcon sx={{ width: "119px", height: "119px", position: "absolute", top: "-68px" }}>
                    <Text type="25" fontWeight={700}>
                      {data != undefined && data[0].full_name != " "
                        ? data[0]?.full_name?.slice(0, 1)
                        : data[0].email.slice(0, 1)}
                    </Text>
                  </NameIcon>
                </ProfileRank>
              )}
              <Text type={50} fontWeight={900} sx={{ marginTop: "3px" }} color="white">
                {data != undefined ? data[0].rank : null}
              </Text>
              <WrapperText>
                <Text type={20} fontWeight={700} sx={{ marginTop: "3px" }} color="white">
                  {data != undefined && data[0].full_name != " " ? data[0].full_name : data[0].email}
                </Text>
              </WrapperText>

              <Text type={14} fontWeight={700} sx={{ marginTop: "3px" }} color="white">
                {data != undefined ? data[0].total_carbon_saving.toFixed(3) : null} kg CO2e
              </Text>
            </FirstPlace>
          )}
          {data[2] !== undefined && (
            <ThirdPlace>
              {/* <NameIcon sx={{ width: "100px", height: "100px", marginTop: "30px" }}>
                <Text type="25" fontWeight={700}>
                  {data != undefined && data[2].full_name != " "
                    ? data[2].full_name.slice(0, 1)
                    : data[2].email.slice(0, 1)}
                </Text>
              </NameIcon> */}
              {data[2].image !== "" ? (
                <ProfileRank frame={3} profile={data[2].image} />
              ) : (
                <ProfileRank frame={3}>
                  <NameIcon sx={{ width: "119px", height: "119px", position: "absolute", top: "-68px" }}>
                    <Text type="25" fontWeight={700}>
                      {data != undefined && data[2].full_name != " "
                        ? data[2]?.full_name?.slice(0, 1)
                        : data[2].email.slice(0, 1)}
                    </Text>
                  </NameIcon>
                </ProfileRank>
              )}
              <Text type={50} fontWeight={900} sx={{ marginTop: "3px" }} color="white">
                {data != undefined ? data[2].rank : null}
              </Text>
              <WrapperText>
                <Text type={20} fontWeight={700} sx={{ marginTop: "3px" }} color="white">
                  {data != undefined && data[2].full_name != " " ? data[2].full_name : data[2].email}
                </Text>
              </WrapperText>
              <Text type={14} fontWeight={700} sx={{ marginTop: "3px" }} color="white">
                {data != undefined ? data[2].total_carbon_saving.toFixed(3) : null} kg CO2e
              </Text>
            </ThirdPlace>
          )}
        </>
      )}
    </>
  )
}

const Kyc_Check_Unverify = (props) => {
  const { handleOnclick } = props
  return (
    <KycDisplay onClick={handleOnclick}>
      <Image src="/Alert.svg" width="14px" height="13px" />
      <Text type={14} fontWeight={500} mobileType={12} mobileFontWeight={400} mobileWidth={"250px"} color="white">
        Your account is not verify, please check your mailbox with in 24 hours
      </Text>
    </KycDisplay>
  )
}
const Kyc_Check_Verify = () => {
  return (
    <KycDisplay sx={{ background: "rgba(89, 178, 159, 0.8)" }}>
      <Image src="/Verify.svg" width="14px" height="13px" />
      <Text type={14} fontWeight={500} color="white">
        Your account has been verified
      </Text>
    </KycDisplay>
  )
}
const Kyc_Check_Inreview = () => {
  return (
    <KycDisplay sx={{ background: "rgba(239, 178, 116, 0.8)" }}>
      <Image src="/Inreview.svg" width="14px" height="13px" />
      <Text type={14} fontWeight={500} color="white">
        Your KYC is in review. If your account doesn't approve with in 72 hours, please contact our admin
        (admin@vekin.co)
      </Text>
    </KycDisplay>
  )
}

const CarbonSavingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "16px",
  width: "100%",
  marginTop: "10px",
  [theme.breakpoints.down("md")]: {
    padding: "16px",
  },
}))
const CarbonSavingBox_Auth = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "16px",
  width: "100%",
  marginTop: "10px",
  [theme.breakpoints.down("md")]: {
    padding: "0px",
    flexWrap: "wrap",
  },
}))
