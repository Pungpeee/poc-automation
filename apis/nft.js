import { requestNFT } from "./client"

export const getCollectionContact = async () => {
  const response = await requestNFT.get("/v2/nft/get_contract/-1")
  return response
}

export const getNFT = async (data) => {
  const response = await requestNFT.post("/v2/nft/nft_owner_info",data)
  return response
}
