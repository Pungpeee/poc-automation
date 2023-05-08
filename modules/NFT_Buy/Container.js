import { Container, Grid, styled, Box, TextField, Checkbox, Dialog, Divider, ButtonBase } from "@mui/material"
import Slider, { SliderThumb } from "@mui/material/Slider"
import React, { Component, useState, useEffect, useCallback } from "react"

// import { useAuthContext } from "../../contexts/auth/consume"
// import { useQueryCarbonAcitivity, useQueryRank } from "../../adapter/query"
import { Text, Button, Select, SlideButton } from "../../components"
import { useForm, Controller, set } from "react-hook-form"
// import { COLORS } from "../../theme"
// import { CardItem } from "./View"
import Image from "next/image"
import axios from "axios"
import { useQuery,useMutation} from "react-query"
import { nftApi } from "../../apis"

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
  {
    label:
      "E-Coupon นี้ ใช้เป็นส่วนลดเฉพาะสำหรับซื้อสินค้าสินค้าที่ Gourmet Market / Home Fresh Mart โดยไม่มียอดซื้อขั้นต่ำ",
  },
  { label: "จำกัดการใช้ E-Coupon ส่วนลด / 1 ใบเสร็จ" },
  {
    label: "E-Coupon นี้ สามารถใช้ได้ที่ แผนก กูร์เมต์ มาร์เก็ต และ โฮม เฟรช มาร์ท ทุกสาขา (ยกเว้นสาขาบลูพอร์ตหัวหิน)",
  },
  { label: "แสดงรหัส E-Coupon เพื่อรับส่วนลดกับพนักงานที่จุดแคชเชียร์ ก่อนการชำระเงินเท่านั้น" },
  {
    label:
      "สินค้ากลุ่มแอลกอฮอล์ / Wine Cellar / Liquor Shop, บุหรี่, นมผงทารกสูตร 1,2 , สินค้ายกหีบ / ขายเหมา และสินค้าที่ขายผ่านช่องทางออนไลน์ / Call to Order ไม่ร่วมรายการ",
  },
  {
    label: "ในกรณีรับสิทธิ์แล้ว ไม่ได้นำมาใช้สิทธิ์ ไม่ว่ากรณีใดก็ตาม ขอสงวนสิทธิ์ในการไม่ชดเชยให้ทุกกรณี",
  },
  {
    label: "E-Coupon ส่วนลด ไม่สามารถแลกเปลี่ยน หรือทอนเป็นเงินสดได้ ",
  },
  {
    label: "ไม่สามารถใช้ร่วมกับรายการส่งเสริมการขายอื่นๆ ได้",
  },
  {
    label: "ไม่สามารถ Capture หน้าจอโทรศัพท์ เพื่อรับสิทธิ์ได้",
  },
]

const Text_Test =
  "Mystery gifts include all premium gift from Vekin! Our mystery boxes offer a unique opportunity to buy a large volume of goods at an unbeatable price. Why should you buy individual products separately, when you can buy them from us in one big package with a 50% discount?! Whether you're looking for cosmetics, food or electronics, our Mystery boxes will always surprise you."

const NFTBuyConatiner = () => {
  const [moreDetail, setMoreDetail] = useState(true)
  const [token, setToken] = useState()
  const [id, setID] = useState()
  const [cero, setCero] = useState()
  const [dialog, setDialog] = useState(false)
  const [isSlide, setIsSlide] = useState(false)
  const [seeAll, setSeeAll] = useState(false)

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

  const useMutationBuyNFT = (options) => {
    const mutate = useMutation("buy nft", BuyNFT, options)
    return mutate
  }

  const BuyNFT = async (data) => {
    const res = await CustomClient.post("/nft/transfer_to_master_wallet", data)
    return res.data
  }

  const GetNFT = async (id) => {
    const res = await CustomClient.get(`/product/${id}`)
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
    isSuccess,
    isLoading,
  } = useQueryGetNFT({
    payload: {
      id: id,
    },
    options: {
      onSuccess: (s) => {
        console.log(s)
      },
      enabled: !!token && !!id,
    },
  })

  const {mutate} = useMutationBuyNFT({
    onSuccess:(s)=>{
      // console.log(s)
      setDialog(true)
    },
    onError:(e)=>{
      // console.log(e)
    }
  })

  const handleBuy = () => {
    const payload = {
      product_id: dataNFT.id,
      amount: dataNFT.price,
    }
    mutate(payload)
    // BuyNFT(payload).then(
    //   () => {
    //     setDialog(true)
    //   },
    //   (e) => {}
    // )
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")
    const id = urlParams.get("id")
    const cero = urlParams.get("cero")
    setCero(parseFloat(cero))
    setToken(token)
    setID(id)
  }, [])

  const test2 = () => {
    return (
      <Text type="10" fontWeight={500} color="green100" pointer>
        See all
      </Text>
    )
  }

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
        <Text type="24" fontWeight={700} color="green100" fontFamily="Roboto">
          Thank You!
        </Text>
        <Image src="/redeem_NFT/Recycling_icon.svg" alt="" width={200} height={200} />
        <Text type="16" fontWeight={500} color="gray666" fontFamily="Roboto" textAlign="center">
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
          <Text type="16" fontWeight={600} color="white" fontFamily="Montserrat">
            Close
          </Text>
        </Button>
      </Dialog>

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
                <br />*{dataNFT.description.hightlight[1]}
              </Text>
              <MoreDetailConditionWrapper>
                <Text type="14" fontWeight={700} color="gray333" fontFamily="Prompt">
                  Condition
                </Text>
                <ConditionList>
                  {CONDITION_LIST.map(({ label }) => {
                    return <li>{label}</li>
                  })}
                </ConditionList>
              </MoreDetailConditionWrapper>
            </MoreDetailComponentWrapper>
            <DividerStyled flexItem />
            <SliderBox>
              <SliderWrapper_2>
                <SlideButton disabled={cero < dataNFT.price} handleBuy={handleBuy} />
              </SliderWrapper_2>
            </SliderBox>
          </MoreDetailWrapper>
        )}
      </MoreDetailMainBox>
    </>
  )
}

export default NFTBuyConatiner

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
