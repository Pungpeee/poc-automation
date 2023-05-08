import { Container as ContainerMUI, Grid, styled, Box, TextField, Checkbox } from "@mui/material"
import ButtonBase from "@mui/material/ButtonBase"
import React, { Component, useState, useEffect, useCallback } from "react"
// import { useAuthContext } from "../../contexts/auth/consume"
// import { useQueryCarbonAcitivity, useQueryRank } from "../../adapter/query"
import { Text, Button, Select } from "../../components"
import { useForm, Controller } from "react-hook-form"
// import { COLORS } from "../../theme"
// import { CardItem } from "./View"
import Image from "next/image"
import axios from "axios"
import { useQuery } from "react-query"

const NFTMarketContainer = () => {
  const [token, setToken] = useState()
  const [cero, setCERO] = useState(0)

  const CustomClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NFT_API_LOCAL_ENDPOINT,
    // baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const GetAllNFT = async () => {
    const res = await CustomClient.get(`/product`)
    return res.data
  }

  const useQueryGetAllNFT = (options) => {
    const query = useQuery(["get all nft"], GetAllNFT, options)
    return query
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")
    const cero = urlParams.get("cero")
    setToken(token)
    setCERO(parseFloat(cero))
  }, [])

  const { data, isSuccess,isLoading } = useQueryGetAllNFT({
    onSuccess: (s) => {
      console.log(s)
    },
    enabled: !!token,
  })

  const handleRoute = (id) => {
    const urlParams = new URLSearchParams(window.location.search)
    const ceroURL = urlParams.get("cero")
    window.location.href = `nft-buy?id=${id}&token=${token}&cero=${ceroURL}`
  }

  return (
    <Wrapper>
      <MainBox>
        {isLoading && <Loading/>}
        {isSuccess &&
          data.map(({ id, name, price, image, description,remaining}) => {
            return (
              <NFT_Display
                handleRoute={handleRoute}
                id={id}
                name={name}
                price={price}
                image={image}
                count={remaining.count}
                desc={description}
              />
            )
          })}
      </MainBox>
    </Wrapper>
  )
}

export default NFTMarketContainer

const NFT_Display = ({ id, image, name, count,desc, price, handleRoute }) => {
  return (
    <NFT_Wrapper onClick={() => handleRoute(id)}>
      <NFT_Image_Wrapper>
        {/* <Image src={`/redeem_NFT/NFT2.png`} alt="" layout="fill" /> */}
        <Image
          //   src={"https://retohub.blob.core.windows.net/retohub/themall/card/d7c2cdb0-ca3c-11ed-82d0-afb0f9ea0781.png"}
          alt=""
          src={image !== "" ? image : "/redeem_NFT/NFT2.png"}
          layout="fill"
        />
      </NFT_Image_Wrapper>
      <NFT_TEXT_WRAPPER>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Text type="12" fontWeight={400} color="gray9797" fontFamily="Prompt">
              {name.replace(/Conditions.|Conditions/g,'')}
              {/* {name.length > 7 ? `${name.substring(0, 5)}...` : name} */}
            </Text>
            <Text type="8" fontWeight={400} color="grayc6c6" fontFamily="Prompt">
              คงเหลือ {count}
            </Text>
          </Box>
          <Text type="20" fontWeight={700} color="green100" fontFamily="Prompt">
            {price} CERO
          </Text>
        </Box>
      </NFT_TEXT_WRAPPER>
    </NFT_Wrapper>
  )
}

const Wrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100vw",
})

const MainBox = styled(Box)({
  width: "100vw",
  height: "100vh",
  maxWidth: "450px",
  minWidth: "375px",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "8px",
  padding: "16px",
})

const NFT_Wrapper = styled(Box)({
  display: "flex",
  maxWidth: "167.5px",
  flexDirection: "column",
  gap: "8px",
})

const NFT_Image_Wrapper = styled(Box)({
  display: "flex",
  objectFit: "fill",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  height: "160px",
  width: "167.5px",
  borderRadius: "8px",
})

const NFT_TEXT_WRAPPER = styled(Box)({
  padding: "8px",
  width: "100%",
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
