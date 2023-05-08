import { useQuery } from "react-query"
import { nftApi } from "../../apis"

export const useQueryNFT= ({options }) => {
  const query = useQuery(
    ["getCollection"],
    () => {
      return nftApi.getCollectionContact()
    },
    options
  )
  return query
}

// export const getQueryDetail = ({payload,options}) =>{
//   const query = useQuery(
//     ["all-transaction-detail",payload],
//     ()=>{
//       return transactionApi.getTopupID(payload.id)
//     },
//     options
//   )
//   return query
// }