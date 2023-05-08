import { Container, Grid, styled, Box, TextField, Checkbox, Dialog, Divider, ButtonBase } from "@mui/material"
import React, { Component, useState, useEffect, useCallback } from "react"

// import { useAuthContext } from "../../contexts/auth/consume"
// import { useQueryCarbonAcitivity, useQueryRank } from "../../adapter/query"
import { Text, SlideButton, TextFieldInput_Redeem, Button } from "../../components"
import { useForm, Controller, set } from "react-hook-form"
import { getTokens, getTreeStock } from "../../apis/nft_new"
import { useQueryGetNFT } from "../../adapter/query"
// import { COLORS } from "../../theme"
// import { CardItem } from "./View"
import Image from "next/image"
import axios from "axios"

const CATEGORY_LIST = [
  { pic: "Other" },
  { pic: "Tree" },
  { pic: "Dining" },
  { pic: "Golf" },
  { pic: "Recycle" },
  { pic: "Shopping" },
  { pic: "Travel" },
]

const CONDITION_LIST = [
  { label: "ขอสงวนสิทธิ์การรับถุง / คน / 1 การทำรายการ" },
  { label: "ระยะเวลาการร่วมกิจกรรม ตั้งแต่ วันนี้ - 2 เมษายน 2566 หรือจนกว่าถุงจะหมด" },
  { label: "จำกัดสิทธิ์ 500 ถุง / สาขา" },
  { label: "สาขาที่ร่วมกิจกรรม กูร์เมต์ มาร์เก็ต ทุกสาขา ยกเว้นสาขา Stand Alone" },
  {
    label: "บริษัท เดอะมอลล์ กรุ๊ป จำกัด ขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไข ยกเลิกได้ โดยไม่ต้องแจ้งให้ทราบล่วงหน้า",
  },
]

const RedeemGiftConatiner = () => {
  const { control, getValues, watch } = useForm()
  const [id, setID] = useState()
  const [token, setToken] = useState()
  const [stock, setStock] = useState()
  const [redeemed, setRedeemed] = useState()
  const [dialog, setDialog] = useState(false)
  const [error, setError] = useState(false)

  const handleDialog = () => {
    setDialog(true)
  }

  const CustomClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NFT_API_LOCAL_ENDPOINT,
    // baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const MintNFT = async (data) => {
    const res = await CustomClient.post("/nft/mint_nft", data)
    return res.data
  }

  const handleMint = () => {
    const payload = {
      account_id: id,
      redeem_code: getValues("code"),
    }
    MintNFT(payload).then(
      (s) => {
        handleDialog()
      },
      (e) => {
        setError(true)
      }
    )
  }

  const { data, refetch, isSuccess, isLoading } = useQueryGetNFT({
    payload: {
      token: token,
    },
    options: {
      onSuccess: (s) => {
        setRedeemed(s.nft_list[0].redeem ?? s.nft_list[0][0].redeem)
      },
      enabled: !!token,
    },
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const accessToken = urlParams.get("token")
    const id = urlParams.get("id")
    setToken(accessToken)
    setID(id)
  }, [])

  useEffect(() => {
    if (token) {
      getTreeStock(token).then(
        (s) => {
          setStock(s)
        },
        (e) => {}
      )
    }
  }, [token])

  useEffect(() => {
    if (redeemed) {
      setDialog(true)
    }
  }, [redeemed])

  useEffect(() => {}, [watch("code")])

  return (
    <>
      <Dialog
        fullWidth
        // onClose={() => setDialog(false)}
        maxWidth={false}
        open={dialog}
        PaperProps={{
          sx: {
            minWidth: "343px",
            maxWidth: "400px",
            background: "#fff",
            borderRadius: "16px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            padding: "32px",
          },
        }}
      >
        <Text type="24" fontWeight={700} color="green100" fontFamily="Prompt">
          Thank You!
        </Text>
        <Image src="/redeem_NFT/Recycling_icon.svg" alt="" width={200} height={200} />
        <Text type="16" fontWeight={500} color="gray666" fontFamily="Prompt" textAlign="center">
          You have received the Golden Mystery gift box!
        </Text>
        <Button
          variant="contained_square_redeem"
          fullWidth
          disableRipple
          onClick={() => {
            window.location.replace(`carbonwallet://pop-modal`)
          }}
        >
          <Text type="16" fontWeight={600} color="white" fontFamily="Prompt">
            Close
          </Text>
        </Button>
      </Dialog>
      <MoreDetailMainBox>
        {isLoading && <Loading />}
        {isSuccess && (
          <MoreDetailWrapper>
            <MoreDetailIMGWrapper>
              <Image src={data.nft_list[0].image ?? data.nft_list[0][0].image} alt="" layout="fill" />
              {/* <Image src="/redeem_NFT/NFT.png" alt="" layout="fill" /> */}
            </MoreDetailIMGWrapper>

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
                Golden mystery gift box
              </Text>
              <ComponentWrapper_Sub_1>
                <Image src="/redeem_NFT/CERO.svg" alt="" width={16} height={16} />
                <Text type="18" fontWeight={700} color="green100" fontFamily="Prompt">
                  Free CERO
                </Text>
              </ComponentWrapper_Sub_1>
              <ComponentWrapper_Sub_1>
                <Image src="/redeem_NFT/Date.svg" alt="" width={16} height={16} />
                <Text type="14" fontWeight={500} color="gray666" fontFamily="Prompt">
                  Redeem available: 27 March - 2 April 2023
                </Text>
              </ComponentWrapper_Sub_1>
              <MoreDetailConditionWrapper>
                <Text type="14" fontWeight={700} color="gray333">
                  เงื่อนไขกิจกรรม
                </Text>
                <ConditionList>
                  {CONDITION_LIST.map(({ label }) => {
                    return <li>{label}</li>
                  })}
                </ConditionList>
              </MoreDetailConditionWrapper>
              <DividerStyled flexItem />
              <TheMallListBox>
                {stock?.map(({ branch_name, quantity }) => {
                  return (
                    <TheMallList_Wrapper>
                      <Text type="12" fontWeight={400} color="black">
                        {branch_name}
                      </Text>
                      {/* <Text type="12" fontWeight={400} color="black">
                        {`จำนวนคงเหลือ ${quantity}`}
                      </Text> */}
                    </TheMallList_Wrapper>
                  )
                })}
              </TheMallListBox>
              <Text type="14" fontWeight={700} color="black" sx={{ marginLeft: "11px" }}>
                <Text type="14" fontWeight={700} color="redEF2" fontFamily="Roboto">
                  *{" "}
                </Text>
                กรุณากรอกรหัส
              </Text>
              {error && (
                <Text type="14" fontWeight={700} color="redEF2" sx={{ marginLeft: "11px" }}>
                  Error
                </Text>
              )}
              <TextFieldInput_Redeem name={"code"} control={control} placeholder={"Get redeem code from staff"} />
              <DividerStyled flexItem />
            </MoreDetailComponentWrapper>
            <SliderBox>
              <SliderWrapper_2>
                <SlideButton disabled={getValues("code") ? false : true} error={error} handleMint={handleMint} />
              </SliderWrapper_2>
            </SliderBox>
            {/* <BackButtonWrapper onClick={() => setMoreDetail(false)}>
          <Image src={`/redeem_NFT/back.svg`} alt="" width={20} height={20} />
        </BackButtonWrapper> */}
            {/* <CloseButtonWrapper disableRipple>
              <Image src={`/redeem_NFT/close.svg`} alt="" width={24} height={24} />
            </CloseButtonWrapper> */}
          </MoreDetailWrapper>
        )}
      </MoreDetailMainBox>
    </>
  )
}

export default RedeemGiftConatiner

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
  background: "rgba(255, 255, 255, 0.24)",
  border: " 1px solid #E5E5E5",
  borderRadius: "8px",
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

const MoreDetailWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "16px",
  maxWidth: "450px",
  position: "relative",
  padding:'0px 0px 42px 0px'
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
  touchAction:'none'
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

const TheMallListBox = styled(Box)({
  width: "100%",
  marginTop: "-2px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
})

const TheMallList_Wrapper = styled(Box)({
  minWidth: " 343px",
  maxWidth: "100%",
  height: " 36px",
  background: "rgba(31, 163, 124, 0.1)",
  borderRadius: "8px",
  display: "flex",
  padding: "0px 16px",
  justifyContent: "space-between",
  alignItems: "center",
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
