import { Container, Grid, styled, Box } from "@mui/material"
import React, { Component, useState, useEffect } from "react"
// import { useAuthContext } from "../../contexts/auth/consume"
// import { useQueryCarbonAcitivity, useQueryRank } from "../../adapter/query"
import { Text, Button, Select } from "../../components"
// import { COLORS } from "../../theme"
// import { CardItem } from "./View"
import Image from "next/image"
import { Banner } from "./view"
import { useRouter } from "next/router"
import { useNFTMarketplace } from "./controller"
// import { height, margin, style, width } from "@mui/system"

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
  marginTop: "16px",
  display: "flex",
  gap: "16px",
  width: "100%",
  overflowX: "scroll",
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
  maxWidth: "1088px",
}))
const TopCollectionContainer = styled(Box)(({ theme }) => ({
  width: "100%",

  display: "flex",
  flexDirection: "column",
  maxWidth: "1088px",
  [theme.breakpoints.down("md")]: {
    padding: "0px 8px 0px 8px",
  },
}))

const NftContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "463px",
  width: "260px",
  borderRadius: "16px",
  flex: "0 0 25%",
  boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
  background: "#FFFFFF",
}))

const MarketPlaceContainer = () => {
  const router = useRouter()
  const { contract, nftData } = useNFTMarketplace()

  return (
    <Box height="100%">
      <Banner />
      <Box
        justifyContent={"center"}
        width="100%"
        alignItems={"center"}
        py="50px"
        display="flex"
        flexDirection="column"
        sx={{ background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)" }}
      >
        <TopCollectionContainer
        >
          <Text type="20" fontWeight={600} color="white">
            Top NFT collections
          </Text>
          <TopCollection>
            {contract?.data?.contract_list.map((d) => {
              return <Collections_display name={d.name} image={d.image} />
            })}
          </TopCollection>
        </TopCollectionContainer>
        <NewReleaseContainer>
          <Text type="20" fontWeight={600} color="white">
            New released NFTs
          </Text>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Text type="14" fontWeight={500} color="green040">
              by Retrohub
            </Text>
            <Box onClick={() => router.push("/marketplace/all")}>
              <Text type="16" fontWeight={600} color="green_neon">
                Explore more
              </Text>
            </Box>
          </Box>
          <NftCollection>
            {nftData.map((d, idx) => {
              return <NFT_display key={idx} name={d.name} image={d.image} creator={d.properties.creators[0].name} />
            })}
          </NftCollection>
        </NewReleaseContainer>
      </Box>
    </Box>
  )
}

export default MarketPlaceContainer

const Collections_display = (props) => {
  const { name, image } = props
  return (
    <Box display="flex" flex="0 0 16%" flexDirection="column" alignItems="center" justifyContent="center">
      <Box
        width="150px"
        height="150px"
        sx={{
          borderRadius: "50%",
          overflow: "hidden",
          border: "5px solid #FFFFFF",
          boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
        }}
      >
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
        <Image src={image} width="330.8px" height="260px" />
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
            <Box width="50px" height="50px" sx={{ borderRadius: "50%", background: "blue" }}></Box>
            <Text type="16" fontWeight={700} color="black3333">
              {creator}
            </Text>
          </Box>
        </Box>
      </Box>
    </NftContainer>
  )
}
