import { useMutation } from "react-query"
import { nftApi } from "../../apis"

export const useMutationGetNFT= ({ payload, options }) => {
  const mutate = useMutation(
    "getNFT_contact",
    () => {
      return nftApi.getNFT (payload.contract)
    },
    options
  )

  return mutate
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