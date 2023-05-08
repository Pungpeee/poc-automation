import { useState } from "react"
import { useQueryprofile } from "../../adapter/query"
import { useMutationUpdateProfileKyc, useMutationChangePWD } from "../../adapter/mutation/account"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { formValidate } from "../../utils/formValidate"

export const EditController = () => {
  const [open, setopen] = useState(false)
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
  const [OTPdisplay, setOTPdisplay] = useState(true)
  const [resetPic, setresetPic] = useState(false)
  const [number, setnumber] = useState("")
  const [current, setCurrent] = useState("profile")
  const [ischange, setischange] = useState(false)
  const [kycNumber, setkycNumber] = useState(false)
  const [image, setimage] = useState()
  const [profilePic, setprofilePic] = useState("")
  const { control, handleSubmit, reset, setValue, watch, getValues, setError } = useForm()

  const { mutate: mutateChangePWD } = useMutationChangePWD({
    onSuccess: (success) => router.push("/"),
    onError: (res) =>
      setError("current_password", {
        message: res?.response.data.old_password[0] ? "Incorrect current password" : "This field is invalid",
      }),
    // onError: (res) => console.log(res?.response.data.detail )
  })
  const { mutate } = useMutationUpdateProfileKyc({
    onSuccess: () => {
      refetch()
    },
  })

  const {
    data: profile,
    isSuccess,
    refetch,
  } = useQueryprofile({
    options: {
      onSuccess: (s) => {
        // setprofile(s),
        setkycNumber(s.kyc_profile?.is_mobile_verify), setnumber(s.phone?.replace("66", "0") || '-'), setprofilePic(s.image)
      },
    },
  })

  const router = useRouter()
  const kyc_status = profile?.kyc_status

  const handlecurrent = (label, href) => {
    setCurrent(label)
    if (href ?? null) {
      router.push(href)
    } else {
      return null
    }
  }

  const handlechange = (val, type) => {
    var currentval = type == "first_name" ? profile.first_name : profile.last_name
    if (currentval !== val) {
      setischange(true)
    } else {
      setischange(false)
    }
  }

  const handleGoToKycPage = () => {
    router.push("/kyc")
  }

  const handleclose = () => {
    setopen(false)
  }

  const handleopen = () => {
    setopen(true)
  }

  // const handleinputchange = (val)=>{
  //   if(number.length < 10){
  //     setnumber(val)
  //   }else{
  //     return null
  //   }
  // }

  const handleChangeNumber = (val) => {
    setnumber(val)
    setValue("number", val)
  }

  const handleOpenOTPdisplay = () => {
    setOTPdisplay(true)
  }

  const handleCloseOTPdisplay = () => {
    setOTPdisplay(false)
  }

  const handleResetPic = () => {
    setresetPic(true)
  }

  const onChange = (imageList) => {
    const payload = {
      image: imageList[0].data_url,
    }
    mutate(payload)
    setresetPic(false)
  }

  const handleSubmitUser = handleSubmit((val) => {
    const payload = {
      first_name: val.first_name ?? profile.first_name,
      last_name: val.last_name ?? profile.last_name,
    }
    mutate(payload)
  })

  const clearall = () => {
    reset({
      first_name: "",
      last_name: "",
    })
    handleResetPic()
  }

  const handleConfirmDeleteDialogClose = () => {
    setConfirmDeleteDialog(false)
  }

  const handleChangePWD = handleSubmit((val) => {
    const payload = {
      old_password: val.current_password,
      new_password: val.new_password,
    }
    mutateChangePWD(payload)
  })

  return {
    current,
    handlecurrent,
    profile,
    isSuccess,
    kyc_status,
    mutate,
    ischange,
    handlechange,
    kycNumber,
    setkycNumber,
    handleGoToKycPage,
    open,
    handleclose,
    handleopen,
    // handleinputchange,
    number,
    OTPdisplay,
    handleOpenOTPdisplay,
    handleChangeNumber,
    refetch,
    handleResetPic,
    resetPic,
    control,
    handleSubmit,
    reset,
    setValue,
    onChange,
    image,
    profilePic,
    handleSubmitUser,
    clearall,
    setConfirmDeleteDialog,
    confirmDeleteDialog,
    handleConfirmDeleteDialogClose,
    //********************************************/
    watch,
    getValues,
    formRules: formValidate(getValues),
    statePwdValue: watch("new_password"),
    handleChangePWD,
    setError,
  }
}
