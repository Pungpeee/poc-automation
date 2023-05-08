import { useQueryBalance, useQueryprofile } from "../../adapter/query"
import { useRouter } from "next/router"
import useClipboard from "react-use-clipboard"
import { COIN_CHOICES } from "../../utils/coin"
import { useMemo } from "react"

export const useMainContainer = () => {
  const { data, isSuccess } = useQueryBalance()
  const { data: profileData } = useQueryprofile({})
  const [isCopied, setCopied] = useClipboard(data?.public_key, {
    // `isCopied` will go back to `false` after 1000ms.
    successDuration: 2000,
  })

  const router = useRouter()
  const handleClickTopup = () => {
    router.push("/topup/cero")
  }

  const handleClickHistory = (filterCoin) => {
    router.push(`/history/${filterCoin ? filterCoin : ""}`)
  }

  const pendingNoti = useMemo(() => {
    return isSuccess
      ? data.transaction_list
          .filter((tx) => tx.status == "1" || tx.status == "-1")
          .reduce((accum, prev) => {
            return { ...accum, [COIN_CHOICES[prev.coin]]: prev.status }
          }, {})
      : false
  }, [isSuccess, data])


  return { data, isSuccess, profileData, pendingNoti, handleClickTopup, handleClickHistory, isCopied, setCopied }
}
