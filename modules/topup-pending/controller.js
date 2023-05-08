import dayjs from "dayjs"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { useQueryprofile, useQueryTxDetail } from "../../adapter/query"
import { requestWithCredential } from "../../apis/client"

export const useTopupPendingContainer = () => {
  const router = useRouter()
  const [isPaymentMode, setIsPaymentMode] = useState(false)
  const { data: profileData, isSuccess: profileIsSuccess } = useQueryprofile({})

  const uploadForm = useForm()

  const { data, isError, isLoading, isSuccess } = useQueryTxDetail({
    payload: {
      id: router.query.txId,
    },
    options: {
      retry: 0,
      onError: () => {
        router.push("/wallet")
      },
    },
  })

  const onCancelUploadSlipMode = () => {
    setIsPaymentMode(false)
  }

  const handleClickOpenPaymentMode = () => {
    setIsPaymentMode(true)
  }

  const { mutate } = useMutation(
    (payload) => {
      return requestWithCredential.post(`/api/transaction/top-up/upload_payslip/${router.query.txId}/`, payload)
    },
    {
      onSuccess: () => {
        router.replace("/topup/complete")
      },
    }
  )

  const submitUpload = uploadForm.handleSubmit((val) => {
    const payload = {
      datetime_stamp: dayjs(val.date)
        .set("hour", val.time.slice(0, 2))
        .set("minute", val.time.slice(3))
        .format("YYYY-MM-DDThh:ss:mm+07:00"),
      payment_slip: val.payment_slip,
    }
    mutate(payload)
  })

  return {
    data,
    isPaymentMode,
    isError,
    isLoading,
    isSuccess,
    profileData,
    profileIsSuccess,
    uploadForm,
    handleClickOpenPaymentMode,
    onCancelUploadSlipMode,
    submitUpload,
  }
}
