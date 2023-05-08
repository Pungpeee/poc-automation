import React from "react"
import Webcam from "react-webcam"

import { styled } from "@mui/system"
import { Dialog } from "@mui/material"
import { Button } from "../../../components"
import { PRIMARY_COLOR } from "../../../theme/color"
import Text from "../../../components/Text"

const Wrapper = styled("div")({
  "& video": {
    maxWidth: 600,
    maxHeight: 500,
    margin: "auto",
    width: "100%",
    height: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
})

const TakeSelfieButton = styled("button")({
  background: PRIMARY_COLOR,
  padding: "10px",
  zIndex: 200,
  maxWidth: 276,
  width: "100%",
  maxHeight: 48,
  borderRadius: 30,
})

const SelfieButtonWrapper = styled("div")({
  maxWidth: 280,
  width: "100%",
})

const Image = styled("img")({
  maxWidth: 600,
  maxHeight: 500,
  flex: 0,
  objectFit: "contain",
})

const SelfieCamera = (props) => {
  const { webcamRef, captureImage, handleClearImage, isSelfied, imgSrc, handleCloseCamera } = props
  return (
    <Dialog
      PaperProps={{
        sx: {
          justifyContent: "center",
        },
      }}
      fullScreen
      open
    >
      <Wrapper>
        {isSelfied ? (
          <>
            <Image width={500} height={600} src={imgSrc} alt="selfie" />
            <SelfieButtonWrapper>
              <Button variant="contained" fullWidth onClick={handleClearImage}>
                <Text type="20" fontWeight={700} color="white">
                  Take again
                </Text>
              </Button>
            </SelfieButtonWrapper>
            <SelfieButtonWrapper>
              <Button variant="contained" fullWidth onClick={handleCloseCamera}>
                <Text type="20" fontWeight={700} color="white">
                  Confirm
                </Text>
              </Button>
            </SelfieButtonWrapper>
          </>
        ) : (
          <>
            <Webcam mirrored ref={webcamRef} audio={false} screenshotFormat="image/jpeg" />
            <SelfieButtonWrapper>
              <Button variant="contained" fullWidth onClick={captureImage}>
                <Text type="20" fontWeight={700} color="white">
                  Take a selfie
                </Text>
              </Button>
            </SelfieButtonWrapper>
          </>
        )}
      </Wrapper>
    </Dialog>
  )
}

export default SelfieCamera
