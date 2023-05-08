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
  { label: "Please bring your mobile phone to redeem at the point of purchase." },
  { label: "Cannot be redeemed from mobile phone screen capture." },
  { label: "This privilege is reserve for Thai residential customers only." },
  { label: "Limited to 7,000 redemption / month." },
  { label: "Once redeemed points cannot be returned to your account." },
  {
    label:
      "Vekin Customers who choose to redeem rewards from partners' points must have point membership account with such partners (e.g., Bankchak Points, Citi Reward Point, K Point), and must havepoint accounts linked according to the procedures, and terms & conditions as specified on CERO app.",
  },
]

const RedeemNFTConatiner = () => {
  const [moreDetail, setMoreDetail] = useState(true)
  const [dialog, setDialog] = useState(false)

  const handleDialog = () => {
    setDialog(true)
  }

  return (
    <>
      {!moreDetail && (
        <MainBox>
          <CardBox>
            <IMGWrapper>
              <Image src="/redeem_NFT/NFT.png" alt="" width={311} height={250} />
            </IMGWrapper>
            <ComponentWrapper>
              <Text type="24" fontWeight={700} color="darkgreen" fontFamily="Roboto">
                Golden mystery gift box
              </Text>
              <ComponentWrapper_Sub_1>
                <Image src="/redeem_NFT/CERO.svg" alt="" width={16} height={16} />
                <Text type="20" fontWeight={700} color="green100" fontFamily="Roboto">
                  500 CERO
                </Text>
              </ComponentWrapper_Sub_1>
              <ComponentWrapper_Sub_1>
                <Image src="/redeem_NFT/DATE.svg" alt="" width={16} height={16} />
                <Text type="14" fontWeight={700} color="gray666" fontFamily="Roboto">
                  Available : 1 January - 30 June 2023
                </Text>
              </ComponentWrapper_Sub_1>

              <Text
                type="14"
                fontWeight={400}
                as="div"
                sx={{
                  display: " -webkit-box",
                  "-webkit-line-clamp": "4",
                  "-webkit-box-orient": "vertical",
                  overflow: " hidden",
                  textOverflow: " ellipsis ",
                  lineHeight: "16px",
                }}
                color="gray333"
                fontFamily="Roboto"
              >
                Mystery gifts include all premium gift from Vekin! <br />
                Our mystery boxes offer a unique opportunity to buy a large volume of goods at an unbeatable price. Why
                should you buy individual products separately, when you can buy them from us in one big package with a
                50% discount?! Whether you're looking for cosmetics, food or electronics, our Mystery boxes will always
                surprise you.
              </Text>
            </ComponentWrapper>
            <Text
              type="14"
              fontWeight={500}
              color="green100"
              fontFamily="Roboto"
              pointer
              onClick={() => setMoreDetail(true)}
            >
              More Detail
            </Text>
            <DividerStyled flexItem />
            <Box
              sx={{ width: "100%", marginTop: "-16px", padding: "8px 16px", display: "flex", justifyContent: "center" }}
            >
              <SliderWrapper_2>
                <SlideButton />
              </SliderWrapper_2>
            </Box>
            <IconBoxWrapper>
              {CATEGORY_LIST.map(({ pic }) => {
                return (
                  <IconWrapper>
                    <Image src={`/redeem_NFT/Icon/${pic}.svg`} alt="" width={12} height={12} />
                  </IconWrapper>
                )
              })}
            </IconBoxWrapper>
            <CloseButtonWrapper disableRipple>
              <Image src={`/redeem_NFT/close.svg`} alt="" width={24} height={24} />
            </CloseButtonWrapper>
          </CardBox>
        </MainBox>
      )}
      {moreDetail && (
        <>
          <Dialog
            fullWidth
            onClose={() => setDialog(false)}
            maxWidth={false}
            open={dialog}
            PaperProps={{
              sx: {
                bottom: 0,
                margin: "0px",
                minWidth: "375px",
                width: "100%",
                maxWidth: "450px",
                height: "317px",
                background: "#FFF",
                padding: "16px 32px",
                borderRadius: "24px 24px 0px 0px",
                position: "absolute",
              },
            }}
          >
            <DialogWrapper_1>
              <DialogTab />
              <StaffIconWrapper>
                <Image src="/redeem_NFT/staff1.svg" width={41} height={41} />
              </StaffIconWrapper>
            </DialogWrapper_1>
          </Dialog>
          <MoreDetailMainBox>
            <MoreDetailWrapper>
              <MoreDetailIMGWrapper>
                <Image src="/redeem_NFT/NFT.png" alt="" layout="fill" />
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
                <Text type="24" fontWeight={700} color="darkgreen" fontFamily="Roboto">
                  Golden mystery gift box
                </Text>
                <ComponentWrapper_Sub_1>
                  <Image src="/redeem_NFT/CERO.svg" alt="" width={16} height={16} />
                  <Text type="18" fontWeight={700} color="green100" fontFamily="Roboto">
                    500 CERO
                  </Text>
                </ComponentWrapper_Sub_1>
                <ComponentWrapper_Sub_1>
                  <Image src="/redeem_NFT/DATE.svg" alt="" width={16} height={16} />
                  <Text type="14" fontWeight={500} color="gray666" fontFamily="Roboto">
                    Redeem available: 1 January - 30 June 2023
                  </Text>
                </ComponentWrapper_Sub_1>
                <Text
                  type="14"
                  fontWeight={400}
                  as="div"
                  sx={{
                    lineHeight: "16px",
                  }}
                  color="gray333"
                  fontFamily="Roboto"
                >
                  Mystery gifts include all premium gift from Vekin! <br />
                  Our mystery boxes offer a unique opportunity to buy a large volume of goods at an unbeatable price.
                  Why should you buy individual products separately, when you can buy them from us in one big package
                  with a 50% discount?! Whether you're looking for cosmetics, food or electronics, our Mystery boxes
                  will always surprise you.
                </Text>
                <MoreDetailConditionWrapper>
                  <Text type="14" fontWeight={700} color="gray333" fontFamily="Roboto">
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
                  <SlideButton handleDialog={handleDialog} />
                </SliderWrapper_2>
              </SliderBox>
              <BackButtonWrapper onClick={() => setMoreDetail(false)}>
                <Image src={`/redeem_NFT/back.svg`} alt="" width={20} height={20} />
              </BackButtonWrapper>
            </MoreDetailWrapper>
          </MoreDetailMainBox>
        </>
      )}
    </>
  )
}

export default RedeemNFTConatiner

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

const MoreDetailWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "16px",
  maxWidth: "450px",
  position: "relative",
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
    fontFamily: "Roboto",
  },
})

const DialogWrapper_1 = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems:'center',
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
