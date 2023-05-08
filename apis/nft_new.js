import { Token } from "@mui/icons-material"
import { requestNFTMobile, requestAnonymous, requestNFTMobileAnnonymous, requestNFTMobileBearer } from "./client"

export const getTokens = async (access_token, data) => {
  const response = await requestNFTMobile(access_token).post("/jwt/get_token", data)
  return response.data
}

export const getNFT = async (token) => {
  const res = await requestNFTMobileAnnonymous.get(`nft/nft_owner_nft_info/${token}`)
  return res.data
}

export const getAllNFT = async (token) => {
  const res = await requestNFTMobileAnnonymous.get(`/product`)
  return res.data
}

export const getTreeStock = async (access_token) => {
  const res = await requestNFTMobileBearer(access_token).get("/nft/get_tree_stock")
  return res.data
}
