import { useEffect, useState } from "react"
import Decimal from "decimal.js"
import isEmpty from "lodash/isEmpty"
import get from "lodash/get"
import { useRouter } from "next/router"
import toUpper from "lodash/toUpper"
import { useQueryprofile } from "../../adapter/query"
import { Token } from "@mui/icons-material"

export const useTopupContainer = () => {
  const [tokenForm, setTokenForm] = useState({
    thbAmount: "",
    tokenAmount: "",
  })
  const [rules1, setrules1] = useState(false)
  const [rules2, setrules2] = useState(false)
  const [rules3, setrules3] = useState(false)
  const [open, setopen] = useState(false)
  const [openNotVerify, setOpenNotVerify] = useState(false)
  const [openPendingVerify, setOpenPendingVerify] = useState(false)

  const handleOpenConfirm = () => {
    setopen(true)
  }

  const { data: profileData, isError } = useQueryprofile({
    options: {
      retry: 0,
      onSuccess: (data) => {
        if (data.kyc_status === -1) {
          return setOpenNotVerify(true)
        }

        if (data.kyc_status === 1 || data.kyc_status === 2) {
          return setOpenPendingVerify(true)
        }
      },
    },
  })

  const handleCloseConfirm = () => {
    setopen(false)
  }

  const { query } = useRouter()

  const [feeAmount, setFeeAmount] = useState(0)
  const [feePercent, setFeePercent] = useState(0)

  const [isAmountError, setIsAmountError] = useState(false)

  const rateToken = get(profileData, `currency.${toUpper(query.coinId)}`, 0)
  const rateThb = get(profileData, `currency.THB`, 0)

  const calculateFee = (thbAmount) => {
    if (thbAmount > 100000) {
      setFeePercent(0.2)
      return { feeRate: 0.2, feeAmount: new Decimal(new Decimal(thbAmount).mul(0.001).toFixed(8)).toNumber() }
    } else if (thbAmount >= 50) {
      setFeePercent(0.1)
      return { feeRate: 0.1, feeAmount: new Decimal(new Decimal(thbAmount).mul(0.002).toFixed(8)).toNumber() }
    } else {
      setFeePercent(0)
      return { feeRate: 0, feeAmount: 0.1 }
    }
  }

  const handleChangeThb = (val) => {
    const isMatchedRegex = new RegExp(/^(\d*|(\d)+([.]\d{0,2}))?$/g).test(val)
    const isMatchedHaveNumber = new RegExp(/[0-9]/g).test(val)
    if (!isMatchedRegex) {
      return null
    }
    if (!isMatchedHaveNumber || isEmpty(val)) {
      setFeeAmount(0)
      return setTokenForm({
        thbAmount: "",
        tokenAmount: "",
      })
    }
    const numberThb = new Decimal(val).toNumber()
    const fee = calculateFee(numberThb)
    const mutateNumberToken = new Decimal(numberThb).minus(fee.feeAmount).dividedBy(rateThb).toFixed(8)

    if (numberThb > 1000000 || numberThb < 1) {
      setIsAmountError(true)
    } else {
      setIsAmountError(false)
    }
    setFeeAmount(fee.feeAmount)
    setTokenForm({
      thbAmount: val,
      tokenAmount: Math.max(Number(new Decimal(mutateNumberToken).toFixed(8)), 0),
    })
  }

  const handleChangeToken = (val) => {
    const isMatchedRegex = new RegExp(/^(\d*|(\d)+([.]\d{0,9}))?$/g).test(val)
    const isMatchedHaveNumber = new RegExp(/[1-9]/g).test(val)
    if (!isMatchedRegex) {
      return null
    }
    if (!isMatchedHaveNumber || isEmpty(val)) {
      setFeeAmount(0)
      return setTokenForm({
        thbAmount: "",
        tokenAmount: "",
      })
    }
    const numberToken = new Decimal(val).toNumber()
    const mutateNumberThb = new Decimal(numberToken).mul(rateThb).toNumber()

    const fee = calculateFee(mutateNumberThb)
    const thbFeeRate = new Decimal(fee.feeRate).dividedBy(100).toNumber()

    const thbAmountWithFee = mutateNumberThb > 0 ? new Decimal(mutateNumberThb).dividedBy(1 - thbFeeRate).toNumber() : 0

    if (thbAmountWithFee > 1000000) {
      setIsAmountError(true)
    } else {
      setIsAmountError(false)
    }

    setFeeAmount(fee.feeAmount)
    setTokenForm({
      thbAmount: Math.max(0, Number(new Decimal(thbAmountWithFee).toFixed(2))),
      tokenAmount: val,
    })
  }

  const handleRules = (id) => {
    setrules({
      rule:true
    })
  }

  return {
    tokenForm,
    rateToken,
    rateThb,
    open,
    feeAmount,
    profileData,
    isAmountError,
    isError,
    openNotVerify,
    openPendingVerify,
    feePercent,
    handleChangeThb,
    handleChangeToken,
    handleCloseConfirm,
    handleOpenConfirm,
    rules1,
    rules2,
    rules3,
    setrules1,
    setrules2,
    setrules3,
  }
}
