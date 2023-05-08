import { useMutation } from "react-query"
import { transactionApi } from "../../apis"

export const useMutationCancelTopup = ({ payload, options }) => {
  const mutate = useMutation(
    "cancel_topup",
    () => {
      return transactionApi.cancelTopup(payload.id, payload.data)
    },
    options
  )

  return mutate
}

export const useMutationSwap = ( options ) => {
  const mutate = useMutation("swap_coin", transactionApi.swapCoin, options)
  return mutate
}
