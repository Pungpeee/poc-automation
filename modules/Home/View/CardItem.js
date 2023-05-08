import { Box, styled } from "@mui/material"
import React from "react"
import { Text } from "../../../components"
import { COLORS } from "../../../theme"
import Image from "next/image"

const Wrapper = styled("div")(({ theme }) => ({
  backgroundColor: COLORS.WHITE,
  padding: "48px 24px",
  border: `3px solid ${COLORS.GRAY}`,
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    padding: "16px",
  },
  height: "100%",
}))

const WrapperImage = styled("div")(({ theme }) => ({
  textAlign: "center",
  margin: "60px 0px",
  backgroundColor: COLORS.GRAY100,
  borderRadius: "50%",
  margin: "auto",
  width: "120px",
  height: "120px",
  display: "flex",
  justifyContent: "center",
}))

const CardItem = ({ imageSource, title, description }) => {
  return (
    <Wrapper>
      <WrapperImage>
        <Image src={imageSource} width={120} height={120} alt=" " />
      </WrapperImage>
      <Box mt={4} sx={{ wordBreak: "break-word" }}>
        <Text type="20" fontWeight={700} color="gray800" as="div" textAlign="center">
          {title}
        </Text>
        <Text type="16" fontWeight={400} color="gray600" as="div">
          {description}
        </Text>
      </Box>
    </Wrapper>
  )
}

export default CardItem
