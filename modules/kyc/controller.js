import { useCallback, useRef, useState } from "react"
import isNil from "lodash/isNil"
import { useMutationUploadPhotoKyc } from "../../adapter/mutation/account"
import { useQueryprofile } from "../../adapter/query"
import { useRouter } from "next/router"

export const useKycContainer = () => {
  const [activeIndex, setActiveIndex] = useState(1)
  const router = useRouter()
  const [isOpenCamera, setIsOpenCamera] = useState(false)
  const [isOpenComplete, setIsOpenComplete] = useState(false)

  const { data: profileData, isSuccess } = useQueryprofile({
    options: {
      onSuccess: (data) => {
        if (data?.kyc_status !== -1) {
          router.push("/")
        }
        else if (data?.is_accepted_kyc_consent === true) {
          setActiveIndex(2)
        }
      },
    },
  })

  const [photoKyc, setPhotoKyc] = useState({
    id_front_image: null,
    id_back_image: null,
    id_selfie_image: null,
  })
  const [photoName, setPhotoName] = useState({
    front: "",
    back: "",
  })

  const webcamRef = useRef(null)

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setPhotoKyc({
      ...photoKyc,
      id_selfie_image: imageSrc,
    })
  }, [photoKyc])

  const handleClearImage = useCallback(() => {
    setPhotoKyc({
      ...photoKyc,
      id_selfie_image: null,
    })
  }, [photoKyc])

  const handleNextStep = useCallback(() => {
    setActiveIndex(activeIndex + 1)
  }, [activeIndex])

  const handleBackStep = useCallback(() => {
    setActiveIndex(activeIndex - 1)
  }, [activeIndex])

  const handleOpenCamera = () => {
    setIsOpenCamera(true)
    if (photoKyc.id_selfie_image) {
      setPhotoKyc({
        ...photoKyc,
        id_selfie_image: null,
      })
    }
  }

  const handleCloseCamera = () => {
    setIsOpenCamera(false)
  }

  const isSelfied = !isNil(photoKyc.id_selfie_image)

  const handleChangePhotoKyc = (type, value) => {
    setPhotoKyc({
      ...photoKyc,
      [type]: value,
    })
  }

  const { mutate } = useMutationUploadPhotoKyc({
    options: {
      onSuccess: () => {
        setIsOpenComplete(true)
      },
    },
  })
  const handleSubmitUploadPhoto = () => {
    mutate(photoKyc)
  }

  return {
    activeIndex,
    isOpenCamera,
    webcamRef,
    isSelfied,
    photoKyc,
    photoName,
    profileData,
    isSuccess,
    isOpenComplete,
    handleNextStep,
    handleOpenCamera,
    captureImage,
    handleClearImage,
    handleCloseCamera,
    handleBackStep,
    handleChangePhotoKyc,
    setPhotoName,
    handleSubmitUploadPhoto,
  }
}
