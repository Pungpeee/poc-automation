import { Container, Grid, styled, Box } from "@mui/material"
import ButtonBase from "@mui/material/ButtonBase"
import React, { Component, useState, useEffect, useCallback } from "react"
// import { useAuthContext } from "../../contexts/auth/consume"
// import { useQueryCarbonAcitivity, useQueryRank } from "../../adapter/query"
import { Text, Button, Select } from "../../components"
// import { COLORS } from "../../theme"
// import { CardItem } from "./View"
import Image from "next/image"
import DeviceDetector from "device-detector-js"

const PromotionContainer = () => {
  const [mcardID, setMcardID] = useState()
  const handleClickDownloadApp = useCallback(() => {
    const detector = new DeviceDetector()
    const device = detector.parse(window.navigator.userAgent)

    if (device.os.name === "iOS") {
      window.location.assign("https://apps.apple.com/th/app/carbon-wallet/id1614214805")
    } else if (device.os.name === "Android") {
      window.location.assign("https://play.google.com/store/apps/details?id=com.vekin.carbon_wallet")
    } else {
      window.location = "/download-app"
    }
  }, [])

  const handleClick = () => {
    const detector = new DeviceDetector()
    const device = detector.parse(window.navigator.userAgent)
    if (device.os.name === "Android") {
      const url = "intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end"

      window.location.replace(url)
    } else if (device.os.name === "iOS") {
      window.location.replace("instagram://")
      setTimeout(() => {
        window.location.replace("https://apps.apple.com/us/app/instagram/id389801252")
      }, 10000)
    }
  }

  const handleMobileAppClick = () => {
    window.location.replace(`co2://cabonwallet/mcard-login?id=${mcardID}`)
    // console.log(mcardID)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get("id")
    setMcardID(id)
  }, [])

  return (
    <MainBox>
      <Image src="/app-landing/sponsor_2.svg" width={129.73} height={56} alt=" " />
      <Text
        type="21"
        fontWeight={700}
        color="white"
        fontFamily={"Gotham"}
        sx={{ textAlign: "center", cursor: "default" }}
      >
        THE MALL GROUP
        <br />
        <Text type="37" fontWeight={700} color="white" fontFamily={"Gotham"} sx={{ cursor: "default" }}>
          GO GREEN
        </Text>
      </Text>
      <Image src="/app-landing/phone_1.svg" width={335} height={357} alt=" " />
      <Text
        type="21"
        fontWeight={700}
        color="white"
        fontFamily={"Gotham"}
        sx={{ textAlign: "center", cursor: "default" }}
      >
        Shop Green Products <br /> for Green Lifestyle Rewards
      </Text>
      <SubBox>
        <Text
          type="16"
          fontWeight={500}
          color="white"
          fontFamily={"Gotham"}
          sx={{ textAlign: "center", cursor: "default", height: "19px" }}
        >
          Click to Download
        </Text>
        <LogoDownloadWrapper>
          <DownloadAppWrapper
            onClick={() => window.location.assign("https://apps.apple.com/th/app/carbon-wallet/id1614214805")}
          >
            <Image src="/logo_download_app_store.png" width={110} height={30} alt=" " />
          </DownloadAppWrapper>
          <Line />
          <DownloadAppWrapper
            onClick={() =>
              window.location.assign("https://play.google.com/store/apps/details?id=com.vekin.carbon_wallet")
            }
          >
            <Image src="/logo_download_gplay.png" width={110} height={30} alt=" " />
          </DownloadAppWrapper>
        </LogoDownloadWrapper>
        <Text
          type="14"
          fontWeight={500}
          color="white"
          fontFamily={"Gotham"}
          sx={{ textAlign: "center", cursor: "default", height: "15px" }}
        >
          or click to open CERO app
        </Text>
        <CeroButtonWrapper>
          <CeroButton onClick={handleMobileAppClick}>
            <Image src="/logo_cero_4.svg" width={29.61} height={20.72} alt=" " />
            <Image src="/logo_cero_5.svg" width={42} height={11} alt=" " />
          </CeroButton>
        </CeroButtonWrapper>
      </SubBox>
      <ImgWrapper>
        <Image src="/app-landing/sponsor_1.svg" width={306.67} height={24} alt=" " />
      </ImgWrapper>
    </MainBox>
  )
}

export default PromotionContainer

const MainBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "16px",
  alignItems: "center",
  background: "url(bg.jpeg) no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: "100vw",
  height: "100vh",
  position: "relative",
  overflow: "hidden",
})

const SubBox = styled(Box)({
  display: "flex",
  gap: "8px",
  flexDirection: "column",
  alignItems: "center",
})

const ComponentBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
  marginTop: "-150px",
})

const LogoWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
})

const LogoDownloadWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "8px",
  background: "#3D8474",
  border: "solid 1px #fff",
  borderRadius: "8px",
})

const DownloadAppWrapper = styled(Box)({
  cursor: "pointer",
  height: "30px",
})

const Line = styled(Box)({
  borderLeft: "1px solid #fff",
  height: "20px",
})

const CeroButton = styled(Box)({
  display: "flex",
  padding: "8px",
  gap: "8px",
  background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
  backgroundBlendMode: "multiply",
  border: "1px solid #A5DACB",
  boxShadow: "32px 32px 92px rgba(0, 0, 0, 0.54)",
  borderRadius: "4px",
  cursor: "pointer",
})

const CeroButtonWrapper = styled(Box)({
  padding: "8px",
  borderRadius: "8px",
  background: "#3D8474",
  border: "solid 1px #fff",
})

const ImgWrapper = styled(Box)({
  marginTop: "16px",
})
