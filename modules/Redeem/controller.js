import { useEffect, useState } from "react"
import Decimal from "decimal.js"
import isEmpty from "lodash/isEmpty"
import get from "lodash/get"
import { useRouter } from "next/router"
import toUpper from "lodash/toUpper"
import { useQueryprofile, useQueryBalance  } from "../../adapter/query"

export const swapController = () => {
  const {push} = useRouter()
  const [opendialog, setopendialog] = useState(false)
  // const [fee,setfee] = useState()
  const [currentCoin, setcurrentCoin] = useState("GREEN")
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleSelect = (val) => {
    setAnchorEl(null)
    setcurrentCoin(val)
  }

  const [balance, setbalance] = useState(0)
  // const [feeAmount, setFeeAmount] = useState(0)
 
  const { data: profileData, isError } = useQueryBalance({
    options: {
      retry: 0,
      onSuccess: (data) => {
        setbalance(data.wallet.sol.balance)
      },
    },
  })
  const [rules, setrules] = useState(false)
  const [tokenForm, setTokenForm] = useState({
    CeroAmount: "",
    tokenAmount: "",
  })

  const handlechangerules = () => {
    setrules(!rules)
  }

  const handlechange = (event) => {
    setcurrentCoin(event.target.value)
  }

  const handleChangeToken = (val) => {
    const isMatchedRegex = new RegExp(/^(\d*|(\d)+([.]\d{0,5}))?$/g).test(val)
    const isMatchedHaveNumber = new RegExp(/[0-9]/g).test(val)
    if (!isMatchedRegex) {
      return null
    }
    if (!isMatchedHaveNumber || isEmpty(val)) {
      // setFeeAmount(0)
      return setTokenForm({
        CeroAmount: "",
        tokenAmount: "",
      })
    }
    if (val <= balance) {
      setTokenForm({
        CeroAmount: val,
        // tokenAmount: (val /fee_amount.total_fee).toFixed(5),
        tokenAmount: val < fee.total_fee ? 0 :  (val-fee.total_fee).toFixed(4),
      })
    }
  }

  const handleopendialog = () => {
    setopendialog(true)
  }

  const handleclosedialog = () => {
    setopendialog(false)
  }

  const addCoinPercen = (balance, percentage) => {
    if (percentage == 100) {
      setTokenForm({
        CeroAmount: balance,
        tokenAmount: balance < fee.total_fee ? 0 :  (balance-fee.total_fee).toFixed(4)
      })
    } else {
      setTokenForm({
        CeroAmount: ((balance * percentage) / 100).toFixed(4),
        tokenAmount: ((balance * percentage) / 100).toFixed(4) < fee.total_fee ? 0 :  (((balance * percentage) / 100).toFixed(4)-fee.total_fee).toFixed(4)
      })
    }
    // console.log(balance, percentage)
  }

  return {
    rules,
    balance,
    tokenForm,
    handleChangeToken,
    handlechange,
    handlechangerules,
    currentCoin,
    open,
    anchorEl,
    handleClick,
    handleSelect,
    opendialog,
    handleopendialog,
    handleclosedialog,
    addCoinPercen,
  }
}
