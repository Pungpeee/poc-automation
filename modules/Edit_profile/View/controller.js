import { useState } from "react"
import { useMutationUpdateProfileKyc } from "../../../adapter/mutation/account"
import useTimer from "easytimer-react-hook"

export const NumberDialogController = () => {
  const [openOTP, setopenOTP] = useState(false)
  const [test, settest] = useState(false)
  const [openNumber, setopenNumber] = useState(false)
  const [OTPsuccess, setOTPsuccess] = useState(false)
  const [refCode, setrefCode] = useState("")
  const [OTP, setOTP] = useState("")
  const [error, seterror] = useState(false)
  const { mutate } = useMutationUpdateProfileKyc({
    onSuccess: (s) => {
      setrefCode(s.data.otp_ref_code)
      handleopenOTP()
    },
  })

  const handlecloseOTP = () => {
    setopenOTP(false)
  }

  const handleopenOTP = () => {
    if (openOTP) {
      return null
    }
    setopenOTP(true)
  }

  const handleopenNumber = () => {
    setopenNumber(true)
  }
  const handlecloseNumber = () => {
    setopenNumber(false)
  }

  // const handleinputchange = (val) => {
  //   if (number.length < 10) {
  //     setnumber(val)
  //   } else {
  //     return null
  //   }
  // }

  const handleSubmitUser = (val) => {
    // console.log(val)
    var numberPayload = val.replace("0", "66")
    const payload = {
      phone: numberPayload,
    }
    mutate(payload)
    // if (isSuccess) {
    //   handleopenOTP()
    // }
  }

  //******************************* OTP Controller ****************************************

  const handleReqAgain = (val,time) => {
    if(time == 0){
      timer.start()
      var numberPayload = val.replace("0", "66")
      const payload = {
        phone: numberPayload,
      }
      mutate(payload)
    }
    return null
  }

  const [timer, isTargetAchieved] = useTimer({
    /* Hook configuration */
    countdown: true,
    startValues: { seconds: 60 },
  })

  // timer.start()
  const handleOTPChange = (val) => {
    setOTP(val)
  }

  const handleOTPSuccessClose = () => {
    setOTPsuccess(false)
  }
  const handleOTPSuccessOpen = () => {
    setOTPsuccess(true)
  }

  return {
    // setnumber,
    openOTP,
    handlecloseOTP,
    handleopenOTP,
    mutate,
    // handleinputchange,
    openNumber,
    handleopenNumber,
    handlecloseNumber,
    refCode,
    setrefCode,
    handleSubmitUser,
    handleReqAgain,
    OTP,
    handleOTPChange,
    timer,
    error,
    seterror,
    OTPsuccess,
    setOTPsuccess,
    handleOTPSuccessClose,
    handleOTPSuccessOpen,
    setOTP,
  }
}
