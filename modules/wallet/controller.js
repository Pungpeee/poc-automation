import { useQueryBalance, useQueryprofile } from "../../adapter/query"
import { requestWithCredential } from "../../apis/client"
import { useInfiniteQuery } from "react-query"
import { useRouter } from "next/router"
import useClipboard from "react-use-clipboard"
import { useMemo, useState } from "react"
import { COIN_CHOICES } from "../../utils/coin"
import { COIN_MAP } from "../../utils/coin_map"
import { CHAIN_MAP } from "../../utils/chain_map"

export const useMainContainer = () => {
  const [currentid, setcurrentid] = useState(1)
  const [pageParam, setpageParam] = useState(1)
  const [coinList, setcoinList] = useState([])
  const [Txdata, setTxdata] = useState([])
  const [current, setCurrent] = useState({
    name: "",
    chain: "",
    address: "",
  })
  const { data: CoinBalance, isSuccess } = useQueryBalance({
    options: {
      onSuccess: (s) => {
        var list = Object.entries(s?.wallet)
          .flat()
          .filter((d) => typeof d == "object")
        setcoinList(list)
        setCurrent({
          name: list[0].coin,
          chain: CHAIN_MAP[list[0].chain],
          address: list[0].address,
        })
      },
    },
  })
  const { data: profileData } = useQueryprofile({})

  // const cointNameList = isSuccess
  //   ? Object.entries(CoinBalance?.wallet)
  //       .flat()
  //       .filter((d) => typeof d == "object")
  //   : []

  // const [current, setCurrent] = useState({
  //   name: "",
  //   chain: "",
  //   address: "",
  // })
  const [isCopied, setCopied] = useClipboard(current.address, {
    // `isCopied` will go back to `false` after 1000ms.
    successDuration: 2000,
  })

  // const setcurrent = () => {
  //   if (isSuccess) {
  //     setCurrent({
  //       name: cointNameList[0].coin,
  //       chain: CHAIN_MAP[cointNameList[0].chain],
  //       address: cointNameList[0].address,
  //     })
  //   }
  //   return null
  // }

  const { fetchNextPage, hasNextPage, refetch } = useInfiniteQuery(
    "history",
    async ({ pageParam = 1 }) => {
      const params = {
        page: pageParam,
        // coin: currentid,
      }
      const response = await requestWithCredential.get("/api/transaction/", {
        params,
      })
      return response.data
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        // console.log(lastPage)
        // console.log(allPages)
        if (lastPage && lastPage.next !== null) {
          return allPages.length + 1
        }
        return null
      },
      onSuccess: (data) => {
        // console.log(data.pages)
        setTxdata(
          data.pages
            .map((tx) => {
              return tx.results
            })
            .flat()
        )
      },
    }
  )

  // refetch({refetchPage:(page,index) => index===0})

  const router = useRouter()
  const handleClickTopup = () => {
    router.push("/topup/cero")
  }

  const handleClickHistory = (filterCoin) => {
    router.push(`/history/${filterCoin ? filterCoin : ""}`)
  }

  // const pendingNoti = useMemo(() => {
  //   return isSuccess
  //     ? data.transaction_list
  //         .filter((tx) => tx.status == "1" || tx.status == "-1")
  //         .reduce((accum, prev) => {
  //           return { ...accum, [COIN_CHOICES[prev.coin]]: prev.status }
  //         }, {})
  //     : false
  // }, [isSuccess, data])

  const handlecurrent = (name, chain, add) => {
    // console.log(`${name} ${chain} ${add}`)
    setCurrent({
      name: name,
      chain: CHAIN_MAP[chain],
      address: add,
    })
    // setcurrent(name)
    setcurrentid(COIN_MAP.find((d) => d.label == name).value)
  }

  const filterHistory = useMemo(() => {
    return Txdata && current?.name ? Txdata.filter((history) => history.coin === currentid ?? "") : []
  }, [currentid, Txdata])

  const month_format = (month) => {
    switch (month) {
      case "01":
        return "January"
        break
      case "02":
        return "February"
        break
      case "03":
        return "March"
        break
      case "04":
        return "April"
        break
      case "05":
        return "May"
        break
      case "06":
        return "June"
        break
      case "07":
        return "July"
        break
      case "08":
        return "August"
        break
      case "09":
        return "September"
        break
      case "10":
        return "October"
        break
      case "11":
        return "November"
        break
      case "12":
        return "December"
        break
    }
  }

  const time_format = (d) => {
    let year = d?.slice(0, 4)
    let month = month_format(d?.slice(5, 7))
    let date = d?.slice(8, 10)
    let time = d?.slice(11, 16)
    return `${date} ${month} ${year}, ${time}`
  }

  return {
    CoinBalance,
    isSuccess,
    profileData,
    // pendingNoti,
    handleClickTopup,
    handleClickHistory,
    isCopied,
    setCopied,
    current,
    handlecurrent,
    hasNextPage,
    fetchNextPage,
    Txdata,
    currentid,
    filterHistory,
    time_format,
    // cointNameList,
    coinList,
    // setcurrent,
  }
}
