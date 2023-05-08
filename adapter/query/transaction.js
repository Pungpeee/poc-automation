import { use } from "frisby"
import { useQuery } from "react-query"
import { transactionApi } from "../../apis"

export const useQueryTxDetail = ({ payload, options }) => {
  const query = useQuery(
    ["transaction-detail", payload],
    () => {
      return transactionApi.getTopupDetail(payload.id)
    },
    options
  )
  return query
}

export const getQueryDetail = ({ payload, options }) => {
  const query = useQuery(
    ["all-transaction-detail", payload],
    () => {
      return transactionApi.getTopupID(payload.id)
    },
    options
  )
  return query
}


