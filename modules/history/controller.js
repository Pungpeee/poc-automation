import { useMemo, useState } from "react"
import { useInfiniteQuery } from "react-query"
import { requestWithCredential } from "../../apis/client"
import { COIN_CHOICES } from "../../utils/coin"

export const useHistoryContainer = ({ filterCoin }) => {
  const [historyData, setHistoryData] = useState([])
  const { fetchNextPage, hasNextPage } = useInfiniteQuery(
    "history",
    async ({ pageParam = 1 }) => {
      const params = {
        page: pageParam,
      }
      const response = await requestWithCredential.get("/api/transaction/", {
        params,
      })
      return response.data
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.next !== null) {
          return allPages.length + 1
        }
        return null
      },
      onSuccess: (data) => {
        setHistoryData(
          data.pages
            .map((tx) => {
              return tx.results
            })
            .flat()
        )
      },
    }
  )

  const filterHistory = useMemo(() => {
    if (filterCoin === "all") {
      return historyData
    }
    return historyData && filterCoin && filterCoin !== "all"
      ? historyData.filter((history) => history.coin === COIN_CHOICES[filterCoin] ?? "")
      : []
  }, [filterCoin, historyData])

  return { filterHistory, hasNextPage, fetchNextPage }
}
