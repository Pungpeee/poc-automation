import { Box, Grid, styled } from "@mui/material"
import { size } from "lodash"
import React from "react"
import { Button, ConfirmEmail, Tag, Text, TextField, TextFieldPassword, TOCDialog } from "../../components"
import { CardStyled } from "../Login/Container_Old"
import useRegisterController from "./controller"
import { ConsentDialog } from "./View"

const ContainButton = styled("div")(({ theme }) => ({
  margin: "auto",
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}))

const Container = () => {
  const {
    control,
    formRules,
    termData,
    onSubmit,
    statePwdValue,
    handleRegister,
    consentModal,
    setConsentModal,
    isLoading,
  } = useRegisterController()
  const {
    password: { validate },
  } = formRules

  return (
    <CardStyled>
      <Grid container>
        <ConsentDialog
          renderContent={<div dangerouslySetInnerHTML={{ __html: termData?.body }} />}
          topic={termData?.topic}
          isOpen={consentModal}
          disabled={isLoading}
          onClose={() => setConsentModal(false)}
          onSubmit={handleRegister}
        />
        <Grid item xs={12} md={12}>
          <Text type="18" fontWeight={700} color="label2">
            REGISTER
          </Text>
        </Grid>
        <Grid item xs={12} md={12}>
          <Text type="48" mobileType="36" fontWeight={700} color="black">
            JUMP START
          </Text>
        </Grid>
        <Grid item xs={12} md={12}>
          <Text type="48" mobileType="36" fontWeight={700} color="black">
            YOUR WALLET
          </Text>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box mt={4}>
            <TextField
              name="email"
              control={control}
              label="E-MAIL"
              placeholder="E-MAIL ADDRESS"
              fullWidth
              rules={formRules.email}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box sx={{ marginTop: "29px" }}>
            <TextFieldPassword
              name="password"
              control={control}
              label="PASSWORD"
              placeholder="PASSWORD"
              type="password"
              fullWidth
              rules={formRules.password}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box sx={{ marginTop: "12px" }}>
            <TextFieldPassword
              name="confirm_password"
              control={control}
              label="CONFIRM PASSWORD"
              placeholder="CONFIRM PASSWORD"
              type="password"
              rules={formRules.confirm_password}
              fullWidth
            />
          </Box>
        </Grid>

        {size(statePwdValue) ? (
          <Grid item xs={12} md={12}>
            <Box sx={{ marginTop: "22px" }}>
              <Tag passed={validate.minimum(statePwdValue)} label="Must contain 8 or more characters" />
              <Tag passed={validate.isUpperCase(statePwdValue)} label="Must contain uppercase lettes" />
              <Tag passed={validate.isLowerCase(statePwdValue)} label="Must contain lowercase lettes" />
              <Tag passed={validate.containNumber(statePwdValue)} label="Must contain numbers" />
            </Box>
          </Grid>
        ) : null}

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
                  REGISTER
                </Text>
              </Button>
            </ContainButton>
            <Text type="14" color="meta" fontWeight={400} textAlign="center">
              By signing in or creating an account, you are agree with our Terms & Conditions and Privacy Statement
            </Text>
          </Box>
        </Grid>
      </Grid>
    </CardStyled>
  )
}
export default Container
