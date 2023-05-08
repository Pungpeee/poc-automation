import { useQueryTxDetail } from "../../../../adapter/query"


export const Topupcontroller = (open, id) => {
  const {
    data: txData,
  } = useQueryTxDetail({
    payload: {
      id: id,
    },
    options: {
      // onSuccess: () => console.log("check"),
      refetchInterval: 5000,
      enabled: open,
    },
  })

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
    return `${date} ${month} ${year} ${time}`
  }
  
  const status_code = txData?.status
  const date = txData?.payment.datetime_create
  const date_iso = new Date(date)

  const today = new Date()
  const date_expired = new Date(date_iso)
  date_expired.setDate(date_expired.getDate() + 1)

  const check_expired = today > date_expired

  return {
    status_code,
    check_expired,
    time_format,
    txData,
    date
  }
}
