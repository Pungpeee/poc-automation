import { Container, Grid, styled, Box, TextField, Checkbox, Dialog, Divider, ButtonBase } from "@mui/material"
import Slider, { SliderThumb } from "@mui/material/Slider"
import React, { Component, useState, useEffect, useCallback } from "react"
import { Text, Button, Select, SlideButton } from "../../components"
import { useForm, Controller, set } from "react-hook-form"
// import { COLORS } from "../../theme"
import { getTokens, getTreeStock } from "../../apis/nft_new"
import Barcode from "react-barcode"
// import { CardItem } from "./View"
import Image from "next/image"
import axios from "axios"
import useTimer from "easytimer-react-hook"
import { useQuery } from "react-query"

const CATEGORY_LIST = [
  { pic: "Other" },
  { pic: "Tree" },
  { pic: "Dining" },
  { pic: "Golf" },
  { pic: "Recycle" },
  { pic: "Shopping" },
  { pic: "Travel" },
]

const NFTClaimConatiner = () => {
  const [id, setID] = useState()
  const [isSlide, setIsSlide] = useState(false)
  const [seeAll, setSeeAll] = useState(true)
  // const [collectionID, setCollecttionID] = useState()
  const [token, setToken] = useState()
  const [data, setData] = useState()
  const [error, setError] = useState(false)
  const [timer, isTargetAchieved] = useTimer({
    countdown: true,
    startValues: { minutes: 30 },
  })

  const seconds = timer.getTimeValues().seconds
  const minutes = timer.getTimeValues().minutes

  const CustomClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NFT_API_LOCAL_ENDPOINT,
    // baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const ClaimNFT = async (data) => {
    const res = await CustomClient.post("/nft/claim_reward", data)
    return res.data
  }

  const GetNFT = async (id) => {
    const res = await CustomClient.get(`/product/collection/${id}`)
    return res.data
  }

  const useQueryGetNFT = ({ payload, options }) => {
    const query = useQuery(
      ["get nft", payload],
      () => {
        return GetNFT(payload.id)
      },
      options
    )
    return query
  }

  const {
    data: dataNFT,
    isLoading,
    isSuccess,
  } = useQueryGetNFT({
    payload: {
      id: id,
    },
    options: {
      onSuccess: (s) => {
        // console.log(s)
      },
      enabled: !!token && !!id,
    },
  })

  const handleClaim = () => {
    if (dataNFT.category === "discount") {
      const payload1 = {
        price: dataNFT.price * 10,
        type: "discount",
        brand: dataNFT.brand,
        collection_id: parseInt(id),
      }
      ClaimNFT(payload1).then(
        (s) => {
          setIsSlide(true)
          setSeeAll(false)
          timer.start()
          setData(s)
        },
        () => {
          setError(true)
        }
      )
    } else {
      const payload = {
        price: dataNFT.price * 10,
        type: dataNFT.category,
        brand: "",
        collection_id: parseInt(id),
      }
      ClaimNFT(payload).then(
        (s) => {
          setIsSlide(true)
          setSeeAll(false)
          timer.start()
          setData(s)
        },
        () => {
          setError(true)
        }
      )
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get("id")
    const accessToken = urlParams.get("token")
    // const collectionId = urlParams.get("collection_id")
    // setCollecttionID(parseInt(collectionId))
    setID(id)
    setToken(accessToken)
  }, [])

  return (
    <MoreDetailMainBox>
      {isLoading && <Loading />}
      {isSuccess && (
        <MoreDetailWrapper>
          <MoreDetailIMGWrapper_2>
            <Image src={dataNFT.image} alt="" height="184.76px" width="342px" />
          </MoreDetailIMGWrapper_2>
          <MoreDetailComponentWrapper>
            <IconBoxWrapper sx={{ position: "unset", padding: "0px" }}>
              {CATEGORY_LIST.map(({ pic }) => {
                return (
                  <IconWrapper>
                    <Image src={`/redeem_NFT/Icon/${pic}.svg`} alt="" width={12} height={12} />
                  </IconWrapper>
                )
              })}
            </IconBoxWrapper>
            <Text type="24" fontWeight={700} color="darkgreen" fontFamily="Prompt">
              {dataNFT.name}
            </Text>
            <ComponentWrapper_Sub_1>
              <Image src="/redeem_NFT/CERO.svg" alt="" width={16} height={16} />
              <Text type="18" fontWeight={700} color="green100" fontFamily="Prompt">
                {dataNFT.price} CERO
              </Text>
            </ComponentWrapper_Sub_1>
            <ComponentWrapper_Sub_1>
              <Image src="/redeem_NFT/Date.svg" alt="" width={16} height={16} />
              <Text type="14" fontWeight={500} color="gray666" fontFamily="Prompt">
                {dataNFT.description.startDate}
              </Text>
            </ComponentWrapper_Sub_1>
            {/* <Text
              type="14"
              fontWeight={400}
              as="div"
              sx={{
                lineHeight: "16px",
              }}
              color="gray333"
              fontFamily="Roboto"
            >
              {Text_Test.length} {`${Text_Test.substring(0, Text_Test.length)} ...`} <br/>
              {`${isSlide ? (seeAll ? Text_Test : Text_Test.substring(0, 70)) : Text_Test} `}
              {isSlide && (
                <Text type="10" fontWeight={500} sx={{textDecoration: 'underline'}} color="green100" pointer onClick={() => setSeeAll(!seeAll)}>
                  {seeAll ? "See less" : "See all"}
                </Text>
              )}
            </Text> */}
            <Text
              type="14"
              fontWeight={400}
              as="div"
              sx={{
                lineHeight: "16px",
              }}
              color="#DC5D5E"
              fontFamily="Prompt"
            >
              *{dataNFT.description.hightlight[0]}
              <br />*{dataNFT.description.hightlight[1]}{" "}
              {isSlide && !seeAll && (
                <Text
                  type="12"
                  fontWeight={500}
                  color="darkgreen"
                  sx={{ textDecoration: "underline" }}
                  pointer
                  onClick={() => setSeeAll(!seeAll)}
                >
                  See all
                </Text>
              )}
            </Text>
            {seeAll && (
              <MoreDetailConditionWrapper>
                <Text type="14" fontWeight={700} color="gray333" fontFamily="Prompt">
                  Condition
                </Text>
                <ConditionList>
                  {dataNFT.description.data.map((a, index) => {
                    return (
                      <li>
                        {a.slice(2, a.length)}{" "}
                        {index == dataNFT.description.data.length - 1 && isSlide && seeAll && (
                          <Text
                            type="12"
                            fontWeight={500}
                            color="darkgreen"
                            sx={{ textDecoration: "underline" }}
                            pointer
                            onClick={() => setSeeAll(!seeAll)}
                          >
                            See less
                          </Text>
                        )}{" "}
                      </li>
                    )
                  })}
                  {/* {(isSlide && seeAll) &&
                  <Text type="12" fontWeight={500} color="darkgreen" sx={{textDecoration: 'underline'}}  pointer onClick={() => setSeeAll(!seeAll)}>
                  See less
                </Text>
                
                } */}
                </ConditionList>
              </MoreDetailConditionWrapper>
            )}
            {isSlide && (
              <BarcodeBox>
                <Barcode value={data?.barcode} fontSize={5} width={1.3} height={40} />
                <TimeBox>
                  <Image src="/redeem_NFT/time.svg" alt="" width={19} height={19} />
                  <Text type="14" fontWeight={400} color="#DC5D5E" fontFamily="Prompt">
                    Your code is timeout in {minutes}.{seconds} s
                  </Text>
                </TimeBox>
              </BarcodeBox>
            )}
          </MoreDetailComponentWrapper>

          {!isSlide && <DividerStyled flexItem />}
          {!isSlide && (
            <SliderBox>
              <SliderWrapper_2>
                <SlideButton handleClaim={handleClaim} Text1={"Claim rewards"} Text2={"Slide to claim"} />
              </SliderWrapper_2>
            </SliderBox>
          )}
        </MoreDetailWrapper>
      )}
    </MoreDetailMainBox>
  )
}

export default NFTClaimConatiner

const MainBox = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#3a3a3a",
})

const CardBox = styled(Box)({
  width: "311px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0px",
  gap: "19px",
  background: " #FFFFFF",
  border: " 1px solid #E5E5E5",
  boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
  borderRadius: "16px",
  position: "relative",
})

const IMGWrapper = styled(Box)({
  width: " 311px",
  height: "250px",
  overflow: "hidden",
  borderRadius: "16px 16px 0px 0px",
  background: "pink",
  position: "relative",
})

const IconBoxWrapper = styled(Box)({
  display: "flex",
  padding: "8px",
  gap: "8px",
  position: "absolute",
  left: 8,
  top: 8,
})

const IconWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px",
  background: "rgba(31, 163, 124, 0.08)",
  border: "1px solid rgba(165, 218, 203, 0.32)",
  backdropFilter: " blur(2px)",
  borderRadius: "4px",
})

const CloseButtonWrapper = styled(ButtonBase)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px",
  position: "absolute",
  right: 8,
  top: 8,
})

const BackButtonWrapper = styled(ButtonBase)({
  padding: "8px",
  left: 8,
  top: 8,
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.24)",
  border: "1px solid #E5E5E5",
})

const ComponentWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0px 16px",
  gap: "16px",
})

const ComponentWrapper_Sub_1 = styled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
})

const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: "#E5E5E5",
}))

const SliderWrapper = styled(Box)({
  display: "flex",
  width: "100%",
  marginTop: "-19px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: " 8px 32px",
  gap: "8px",
  background: "red",
})

const MoreDetailMainBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  background: "#fff",
  // touchAction:'none'
})

const MoreDetailIMGWrapper = styled(Box)({
  height: "350px",
  // minWidth:'375px',
  width: "100%",
  maxWidth: "450px",
  objectFit: "fill",
  position: "relative",
})
const MoreDetailIMGWrapper_2 = styled(Box)({
  height: "350px",
  // minWidth:'375px',
  width: "100%",
  maxWidth: "450px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.51)",
})

const MoreDetailWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "16px",
  maxWidth: "450px",
  position: "relative",
  padding: "0px 0px 42px 0px",
})

const MoreDetailComponentWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "16px",
  padding: "0px 16px 6px 16px",
})

const MoreDetailConditionWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
})

const SliderWrapper_2 = styled(Box)({
  background: "#F2F8F6",
  padding: "4px",
  border: "1px solid #A5DACB",
  width: "279px",
  height: "100%",
  borderRadius: "32px",
  touchAction: "none",
})

const SliderBox = styled(Box)({
  width: "100%",
  marginTop: "-16px",
  padding: "8px 16px",
  display: "flex",
  justifyContent: "center",
})

const ConditionList = styled("ol")({
  margin: "0px",
  paddingLeft: "16px",
  ["& li"]: {
    fontSize: `12px`,
    fontWeight: 400,
    lineHeight: "14px",
    color: "#979797",
    fontFamily: "Prompt",
  },
})

const DialogWrapper_1 = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
})

const DialogTab = styled(Box)({
  background: "#666666",
  borderRadius: "6px",
  height: "6px",
  width: "50px",
})

const StaffIconWrapper = styled(Box)({
  width: "72px",
  height: "72px",
  background: "#F2F8F6",
  borderRadius: " 44px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

const BarcodeBox = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  minHeight: "400px",
})

const TimeBox = styled(Box)({
  display: "flex",
  gap: "4px",
})

const Loading = styled("div")({
  border: "16px solid #0000",
  borderRadius: "50%",
  borderTop: "16px solid #1FA37C",
  width: "120px",
  height: "120px",
  "::-webkit-animation": "spin 2s linear infinite" /* Safari */,
  animation: "spin 2s linear infinite",
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
})
