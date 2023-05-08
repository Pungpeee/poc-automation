import { Box, Grid, styled } from "@mui/material"
import React from "react"
import { Button, Card, Text, TextField, TextFieldPassword } from "../../components"
import Link from "next/link"
import useLoginController from "./controller"

const ContainButton = styled("div")(({ theme }) => ({
  margin: "auto",
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}))

export const CardStyled = styled(Card)(({ theme }) => ({
  maxWidth: "600px",
  margin: "auto",
  padding: "48px 96px",
  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}))

const Container = () => {
  const { control, onSubmit, formRules } = useLoginController()

  return (
    <CardStyled>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Text type="18" fontWeight={700} color="label2">
            SIGNIN
          </Text>
        </Grid>
        <Grid item xs={12} md={12}>
          <Text type="48" fontWeight={700} color="black">
            YOUR WALLET
          </Text>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box mt={4}>
            <TextField
              name="username"
              control={control}
              label="E-MAIL"
              placeholder="E-MAIL ADDRESS"
              fullWidth
              rules={formRules.email}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box sx={{ marginTop: "19px" }}>
            <TextFieldPassword
              name="password"
              control={control}
              label="PASSWORD"
              placeholder="PASSWORD"
              type="password"
              fullWidth
              rules={formRules.passwordRequiredOnly}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              marginTop: "22px",
              textAlign: "center",
            }}
          >
            <ContainButton>
              <Button variant="contained_rounded" fullWidth onClick={onSubmit}>
                <Text type="20" fontWeight={700} color="white">
                  SIGNIN
                </Text>
              </Button>
            </ContainButton>
            <Link href="/forgot-password" passHref>
              <Box sx={{ textDecoration: "underline", cursor: "pointer" }}>
                <Text type="14" color="meta" fontWeight={400}>
                  Forgot Your Password?
                </Text>
              </Box>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </CardStyled>
  )
}
export default Container
