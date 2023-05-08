import { Box, Grid, styled } from "@mui/material"
import Image from "next/image"
import { Button, Card } from "../../components"
import React, { useState } from "react"
import Text from "../../components/Text"
import { useKycContainer } from "./controller"
import SelfieCamera from "./views/SelfieCamera"
import StepProgressKyc from "./views/StepProgressKyc"
import CompleteDialog from "./views/CompleteDialog"
import { Step1Container } from "./Step1"

const KycContainer = () => {
  const {
    activeIndex,
    isOpenCamera,
    webcamRef,
    isSelfied,
    photoKyc,
    photoName,
    isSuccess,
    isOpenComplete,
    setPhotoName,
    captureImage,
    handleOpenCamera,
    handleNextStep,
    handleClearImage,
    handleCloseCamera,
    handleChangePhotoKyc,
    handleBackStep,
    handleSubmitUploadPhoto,
  } = useKycContainer()

  return isSuccess ? (
    <>
      <CompleteDialog open={isOpenComplete} />
      <StepProgressKyc activeIndex={activeIndex} />
      {activeIndex === 1 && <Step1Container onNext={handleNextStep} />}
      {activeIndex === 2 && (
        <Step2
          onNext={handleNextStep}
          handleBackStep={handleBackStep}
          photoKyc={photoKyc}
          photoName={photoName}
          setPhotoName={setPhotoName}
          handleChangePhotoKyc={handleChangePhotoKyc}
        />
      )}
      {activeIndex === 3 && (
        <Step3
          isOpenCamera={isOpenCamera}
          handleBackStep={handleBackStep}
          handleOpenCamera={handleOpenCamera}
          webcamRef={webcamRef}
          isSelfied={isSelfied}
          imgSrc={photoKyc.id_selfie_image}
          captureImage={captureImage}
          handleClearImage={handleClearImage}
          handleCloseCamera={handleCloseCamera}
          handleSubmitUploadPhoto={handleSubmitUploadPhoto}
        />
      )}
    </>
  ) : null
}

const Step2 = (props) => {
  const { onNext, photoKyc, handleChangePhotoKyc, handleBackStep, photoName, setPhotoName } = props

  const isCanNextStep = !!photoKyc.id_front_image && !!photoKyc.id_back_image

  const handleClickOnNext = () => {
    if (isCanNextStep) {
      onNext()
    }
  }

  const handleClearFrontImage = () => {
    handleUploadFront(null)
  }

  const handleClearBackImage = () => {
    handleUploadBack(null)
  }

  const handleUploadFront = (e) => {
    if (!e) {
      handleChangePhotoKyc("id_front_image", null)
      setPhotoName({
        ...photoName,
        front: "",
      })
      return null
    }
    const reader = new FileReader()

    reader.onload = (result) => {
      handleChangePhotoKyc("id_front_image", result.target.result)
      setPhotoName({
        ...photoName,
        front: e.target.files[0].name,
      })
    }

    reader.onabort = () => {}

    if (e.target.value) {
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleUploadBack = (e) => {
    if (!e) {
      handleChangePhotoKyc("id_back_image", null)
      setPhotoName({
        ...photoName,
        back: "",
      })
      return null
    }
    const reader = new FileReader()

    reader.onload = (result) => {
      handleChangePhotoKyc("id_back_image", result.target.result)
      setPhotoName({
        ...photoName,
        back: e.target.files[0].name,
      })
    }

    reader.onabort = () => {}

    if (e.target.value) {
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <div>
      <Box pt="22px" pb={"8px"}>
        <Text color="black" type="18" fontWeight={500}>
          Upload Documents
        </Text>
      </Box>
      <Box pb="46px">
        <Text type="14">Upload a clear image of front side and back side of your national ID card</Text>
      </Box>
      <Box pb="16px">
        <Text as="div" color="black" type="18" fontWeight={500}>
          Front Identification Card
        </Text>
      </Box>
      <Box pb="50px" display="flex" gap="14px" alignItems="center" flexDirection={{ xs: "column", md: "row" }}>
        <Image width={295} height={185} objectFit="contain" src="/idcard-front.png" alt="card-front" />
        <Box width="100%" flex={0.7} gap={"24px"} display="flex" flexDirection="column">
          <Box>
            <input
              accept="image/*"
              onChange={handleUploadFront}
              style={{ display: "none" }}
              id="front-button-file"
              type="file"
              onClick={(event) => {
                event.target.value = null
              }}
            />
            <label htmlFor="front-button-file">
              <Button variant="outlined" component="span" fullWidth>
                <Text color="primary" type="20" fontWeight={700}>
                  UPLOAD
                </Text>
              </Button>
            </label>
          </Box>
          {!!photoName.front && (
            <Box
              borderRadius="3px"
              border="solid 1px #979797"
              padding="0px 7px"
              maxWidth="150px"
              overflow="hidden"
              height="24px"
            >
              <Box display="flex" justifyContent="space-between" height="100%" gap={"4px"} alignItems="center">
                <Text
                  type="12"
                  sx={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    wordBreak: "break-all",
                    "-webkit-line-clamp": "1",
                    "text-overflow": "ellipsis",
                    "-webkit-box-orient": "vertical",
                  }}
                  color="meta"
                >
                  {photoName.front}
                </Text>
                <Text onClick={handleClearFrontImage} sx={{ cursor: "pointer" }} type="12" color="meta">
                  X
                </Text>
              </Box>
            </Box>
          )}
          <div>
            <Text type="14" color="gray400">
              .jpg or .pdf
            </Text>
            <Text type="14" color="gray400">
              should be more than 500KB or 300DPI
            </Text>
          </div>
        </Box>
      </Box>

      <Box pb="16px">
        <Text as="div" color="black" type="18" fontWeight={500}>
          Back Identification Card
        </Text>
      </Box>

      <Box pb="50px" display="flex" gap="14px" alignItems="center" flexDirection={{ xs: "column", md: "row" }}>
        <Image width={295} height={185} objectFit="contain" src="/idcard-back.jpg" alt="card-back" />
        <Box width="100%" flex={0.7} gap={"24px"} display="flex" flexDirection="column">
          <Box marginLeft="12px">
            <input
              accept="image/*"
              onChange={handleUploadBack}
              style={{ display: "none" }}
              id="back-button-file"
              type="file"
              onClick={(event) => {
                event.target.value = null
              }}
            />
            <label htmlFor="back-button-file">
              <Button variant="outlined" component="span" fullWidth>
                <Text color="primary" type="20" fontWeight={700}>
                  UPLOAD
                </Text>
              </Button>
            </label>
          </Box>
          {!!photoName.back && (
            <Box
              borderRadius="3px"
              border="solid 1px #979797"
              padding="0px 7px"
              maxWidth="150px"
              overflow="hidden"
              height="24px"
            >
              <Box display="flex" justifyContent="space-between" height="100%" gap={"4px"} alignItems="center">
                <Text
                  type="12"
                  sx={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    wordBreak: "break-all",
                    "-webkit-line-clamp": "1",
                    "text-overflow": "ellipsis",
                    "-webkit-box-orient": "vertical",
                  }}
                  color="meta"
                >
                  {photoName.back}
                </Text>
                <Text onClick={handleClearBackImage} sx={{ cursor: "pointer" }} type="12" color="meta">
                  X
                </Text>
              </Box>
            </Box>
          )}
          <div>
            <Text type="14" color="gray400">
              .jpg or .pdf
            </Text>
            <Text type="14" color="gray400">
              should be more than 500KB or 300DPI
            </Text>
          </div>
        </Box>
      </Box>

      <Box display="flex" gap={2} justifyContent="center">
        <ButtonFormWrapper>
          <Button fullWidth variant="outlined" onClick={handleBackStep}>
            <Text color="primary" type="20" fontWeight={700}>
              BACK
            </Text>
          </Button>
        </ButtonFormWrapper>
        <ButtonFormWrapper>
          <Button disabled={!isCanNextStep} fullWidth variant="contained" onClick={handleClickOnNext}>
            <Text color="white" type="20" fontWeight={700}>
              NEXT
            </Text>
          </Button>
        </ButtonFormWrapper>
      </Box>
    </div>
  )
}

const Step3 = (props) => {
  const {
    isOpenCamera,
    handleOpenCamera,
    webcamRef,
    isSelfied,
    imgSrc,
    captureImage,
    handleClearImage,
    handleCloseCamera,
    handleBackStep,
    handleSubmitUploadPhoto,
  } = props
  return (
    <div>
      <Box pt="22px" pb={"8px"}>
        <Text color="black" type="18" fontWeight={500}>
          Verify
        </Text>
      </Box>
      <Box pb="46px">
        <Text type="14">Take a picture of your self holding the ID card</Text>
      </Box>
      <Box pb={6}>
        <KycImageFlexBox>
          <Card
            sx={{
              background: "#E8E8E8",
              borderRadius: "10px",
              padding: {
                xs: "24px 24px",
                md: "24px 42px",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box pb="24px">
              <Text type="20" color="primary" fontWeight={700}>
                TAKE YOUR SELFIE
              </Text>
            </Box>
            <Box pb="10px">
              <ListRuleSelfie>
                <li>Take a selfie of yourself</li>
                <li> Make sure your whole face is visible and centered</li>
              </ListRuleSelfie>
            </Box>
            {isSelfied ? (
              <ImageSelfie width={295} height={185} src={imgSrc} alt="selfie" />
            ) : (
              <Box pb="32px" display="flex" gap="18px" flexWrap="wrap" justifyContent="center">
                <Image width={120} height={120} objectFit="contain" src="/example-kyc1.jpg" alt="card-back" />
                <Image width={120} height={120} objectFit="contain" src="/example-kyc1.jpg" alt="card-back" />
                <Image width={120} height={120} objectFit="contain" src="/example-kyc1.jpg" alt="card-back" />
              </Box>
            )}
            <SelfieButtonWrapper>
              <Button fullWidth variant="contained" onClick={handleOpenCamera}>
                <Text color="white" type="20" fontWeight={700}>
                  {!isSelfied ? "Take a selfie" : "Re-Take"}
                </Text>
              </Button>
            </SelfieButtonWrapper>
          </Card>

          {isOpenCamera && (
            <SelfieCamera
              isSelfied={isSelfied}
              imgSrc={imgSrc}
              webcamRef={webcamRef}
              captureImage={captureImage}
              handleClearImage={handleClearImage}
              handleCloseCamera={handleCloseCamera}
            />
          )}
        </KycImageFlexBox>
      </Box>
      <Box display="flex" gap={2} justifyContent="center">
        <ButtonFormWrapper>
          <Button onClick={handleBackStep} fullWidth variant="outlined">
            <Text color="primary" type="20" fontWeight={700}>
              BACK
            </Text>
          </Button>
        </ButtonFormWrapper>
        <ButtonFormWrapper>
          <Button disabled={!isSelfied} onClick={handleSubmitUploadPhoto} fullWidth variant="contained">
            <Text color="white" type="20" fontWeight={700}>
              NEXT
            </Text>
          </Button>
        </ButtonFormWrapper>
      </Box>
    </div>
  )
}

export default KycContainer

const KycImageFlexBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 29,
  alignItems: "center",
})

const ImageSelfie = styled("img")({
  objectFit: "contain",
})

const ButtonFormWrapper = styled("div")({
  maxWidth: 173,
  width: "100%",
})

const SelfieButtonWrapper = styled("div")({
  maxWidth: 280,
  width: "100%",
})

const ListRuleSelfie = styled("ol")({
  ["& li"]: {
    fontFamily: "Prompt",
    fontSize: `16px`,
  },
})
