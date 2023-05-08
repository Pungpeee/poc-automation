import { useQuery } from "react-query"
import { nftApi_new } from "../../apis"

export const useQueryGetNFT = ({ payload, options }) => {
  const query = useQuery(
    ["get NFT", payload],
    () => {
      return nftApi_new.getNFT(payload.token)
    },
    options
  )
  return query
}


export const useQueryGetAllNFT = ({options})=>{
    const query = useQuery("get all nft",nftApi_new.getAllNFT,options)
    return query
}