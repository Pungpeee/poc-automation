import { Container, Grid, styled, Box } from "@mui/material"
import ButtonBase from "@mui/material/ButtonBase"
import React, { Component, useState, useEffect } from "react"
// import { useAuthContext } from "../../contexts/auth/consume"
// import { useQueryCarbonAcitivity, useQueryRank } from "../../adapter/query"
import { Text, Button, Select } from "../../components"
// import { COLORS } from "../../theme"
// import { CardItem } from "./View"
import Image from "next/image"
// import { height, margin, style, width } from "@mui/system"
import { useNFTMarketplace } from "./controller"

const TopCollection = styled(Box)(({ theme }) => ({
  marginTop: "24px",
  display: "flex",
  gap: "16px",
  width: "100%",
  overflowX: "scroll",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}))
const NftCollection = styled(Box)(({ theme }) => ({
  marginTop: "24px",
  padding: "16px 12px",
  background: "rgba(165, 218, 203, 0.1)",
  display: "flex",
  flexWrap: "wrap",

  gap: "24px 8px",
  width: "1088px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}))

const NewReleaseContainer = styled(Box)(({ theme }) => ({
  marginTop: "60px",
  width: "100%",
  height: "650px",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
  background: "rgba(165, 218, 203, 0.1)",
  boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
}))

const NftContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "463px",
  maxWidth: "260px",
  borderRadius: "16px",
  flex: "0 0 25%",
  boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
  background: "#FFFFFF",
}))

const MainContainer = styled(Box)(({ theme }) => ({
  padding: "32px 186px 32px 186px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
}))

const MenuButton = styled(ButtonBase)({
  borderRadius: "26px",
  height: "100%",
  alignItems: "center",
  padding: "12px 16px",
})

const Options = [
  {
    label: "All",
    href: "/",
  },
  {
    label: "New released",
    href: "",
  },
  {
    label: "Eco-friendly",
    href: "/wallet",
  },
  {
    label: "Art",
    href: "/marketplace",
  },
  {
    label: "Celebrities",
    href: "",
  },
  {
    label: "Gaming",
    href: "",
  },
  {
    label: "Sport",
    href: "",
  },
  {
    label: "Music",
    href: "",
  },
  {
    label: "Cryto",
    href: "",
  },
]

const MarketPlaceExContainer = () => {
  // const { contractdata,res,nftData,result } = useNFTMarketplace()
  // const { nftData, contractdata } = useNFTMarketplace()
  const { contract, results,nftData } = useNFTMarketplace()

  

  return (
    <Box height="100%">
      <MainContainer>
        {results.map((d) => {
          return (
            <Text type="20" fontWeight={600} color="white">
              {d}
            </Text>
          )
        })}
        <Text type="20" fontWeight={600} color="white">
          Top NFT collectionss
        </Text>
        <TopCollection>
          {contract?.data.contract_list.map((d) => {
            return <Collections_display key={d.name} name={d.name} image={d.image} />
          })}
        </TopCollection>
        <Text type="20" fontWeight={600} color="white" sx={{ marginTop: "54px" }}>
          Explore NFTs
        </Text>
        <Box display="flex" gap="10px" alignItems="center" sx={{ maxHeight: "18px", marginTop: "32px" }}>
          {Options.map(({ label }) => {
            return (
              <MenuButton key={label}>
                <Text type={14} fontWeight={700} color="white">
                  {label}
                </Text>
              </MenuButton>
            )
          })}
        </Box>
        <NftCollection>
          {nftData.length !== 0
            ? nftData.map((d, idx) => {
                return <NFT_display key={idx} name={d.name} image={d.image} creator={d.properties.creators[0].name} />
              })
            : null}
        </NftCollection>
      </MainContainer>
    </Box>
  )
}

export default MarketPlaceExContainer

const Collections_display = (props) => {
  const { name, image } = props
  return (
    <Box display="flex" flex="0 0 16%" flexDirection="column" alignItems="center" justifyContent="center">
      <Box width="150px" height="150px" sx={{ borderRadius: "50%",overflow:'hidden' ,border:"5px solid #FFFFFF",boxShadow:'0px 16px 16px rgba(0, 0, 0, 0.16)'}}>
        <Image src={image} width="150px" height="150px" />
      </Box>
      <Text type="16" fontWeight={600} color="white" sx={{ marginTop: "16px" }}>
        {name}
      </Text>
    </Box>
  )
}

const NFT_display = (props) => {
  const { name, value, creator, image } = props
  return (
    <NftContainer>
      <Box height="260px" width="100%" sx={{ borderRadius: "16px 16px 0px 0px", overflow: "hidden" }}>
        {/* <Image src="/wallet.svg" alt="Picture of the author" width="100%" height="100%" /> */}
        <Image src={image} width="260px" height="260px" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        // alignItems="center"
        // alignContent="center"
        height="203px"
        padding="16px"
      >
        <Box display="flex" flexDirection="column" gap="2px">
          <Text type="14" fontWeight={500} color="gray666">
            3 Edition minted
          </Text>
          <Text type="20" fontWeight={600} color="black3333">
            {name}
          </Text>
          <Text type="14" fontWeight={700} color="green100">
            CERO {value}
          </Text>
        </Box>
        <Box height="50px" width="100%" display="flex" justifyContent="space-between">
          <Box display="flex" gap="4px" alignItems="center">
            <Box width="50px" height="50px" sx={{ borderRadius: "50%" }}></Box>
            <Text type="16" fontWeight={700} color="black3333">
              {creator}
            </Text>
          </Box>
        </Box>
      </Box>
    </NftContainer>
  )
}
