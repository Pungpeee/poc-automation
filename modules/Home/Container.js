import { Container, Grid, styled } from "@mui/material"
import React from "react"
import { Text } from "../../components"
import { COLORS } from "../../theme"
import { CardItem } from "./View"
import Image from "next/image"

const CardStyled = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: "16px",
    backgroundColor: COLORS.WHITE,
    margin: "-24px -8px",
  },
}))

const cardOptions = [
  {
    imageSource: "/wallet.svg",
    title: "What is Carbon Wallet?",
    description:
      "A platform for exchanging goods and services by tracking green activity in daily life through tokenized on blockchain to become CERO tokens from various technologies in the form of play to earn.",
  },
  {
    imageSource: "/todamoon.svg",
    title: "Our mission",
    description:
      "Empower to play to earn carbon saving in different aspects of daily lives and reward users for taking green activity.",
  },
  {
    imageSource: "/principle.svg",
    title: "Our principle",
    description:
      "Green in, green out. Users take green activity and save carbon to earn CERO coin and redeem green products, services, experiences from sustainable businesses and organizations.",
  },
]

const HomeContainer = () => {
  return (
    <Container>
      <CardStyled>
        <Grid container>
          <Grid item xs={12}>
            <Text color="primary25" type="24" fontWeight={700} as="div">
              WHAT IS
            </Text>
            <Text color="black" type="40" fontWeight={700} as="div">
              CARBON WALLET?
            </Text>
          </Grid>

          <Grid container spacing={3} mt={1}>
            {cardOptions.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <CardItem {...item} />
              </Grid>
            ))}
          </Grid>

          <Grid container justifyContent="center" mt={6}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: { xs: "flex-start", sm: "center" } }}>
              <Text color="primaryopacity" as="div" fontWeight={700} type="40">
                A WALLET LET YOU CONNECT
              </Text>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: { xs: "flex-start", sm: "center" } }}>
              <Text color="primaryopacity" as="div" fontWeight={700} type="40">
                TO CARBON COIN
              </Text>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ marginBottom: { xs: "42px" }, display: "flex", justifyContent: { xs: "flex-start", sm: "center" } }}
            >
              <Text color="label" type="18" fontWeight={700} as="div">
                DOWNLOAD WHITE PAPER <Image src="/coolicon.svg" alt=" " width={20} height={15} />
              </Text>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                opacity: "0.25",
                position: "absolute",
                marginTop: "128px",
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <Image src="/footer_circle.svg" alt=" " width={1000} height={400} />
            </Grid>
          </Grid>
        </Grid>
      </CardStyled>
    </Container>
  )
}

export default HomeContainer
