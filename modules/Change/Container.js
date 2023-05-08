import { Box, Grid, styled } from "@mui/material"
import { size } from "lodash"
import React from "react"
import { Button, Tag, Text, TextField, TextFieldPassword } from "../../components"
import { CardStyled } from "../Login/Container_Old"
import useChangeController from "./controller"

const HeaderStyled = styled(CardStyled)(({ theme }) => ({
  background: "none",
  padding: "0 0 24px 0",
  [theme.breakpoints.down("md")]: {
    padding: "0 0 24px 0",
  },
}))

const Container = () => {
  const { control, formRules, onSubmit, statePwdValue } = useChangeController()
  const {
    password: { validate },
  } = formRules

  return (
    <>
      <HeaderStyled>
        <Grid container>
          <Grid item xs={6} md={12}>
            <Text type="36" color="black" fontWeight={700}>
              CHANGE PASSWORD
            </Text>
          </Grid>
        </Grid>
      </HeaderStyled>
      <CardStyled>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Box mt={4}>
              <TextFieldPassword
                name="old_password"
                control={control}
                label="CURRENT PASSWORD"
                placeholder="CURRENT PASSWORD"
                fullWidth
                type="password"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ marginTop: "29px" }}>
              <TextFieldPassword
                name="new_password"
                control={control}
                label="NEW PASSWORD"
                placeholder="NEW PASSWORD"
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

          <Grid
            container
            spacing="22px"
            sx={{
              marginTop: size(statePwdValue) ? 0 : "22px",
              flexWrap: { xs: "nowrap", md: "wrap" },
              flexDirection: { xs: "column-reverse", md: "row" },
            }}
          >
            <Grid item md={6} xs={12}>
              <Button variant="outlined_rounded" fullWidth onClick={onSubmit}>
                <Text type="20" fontWeight={700} color="primary">
                  CANCEL
                </Text>
              </Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button variant="contained_rounded" fullWidth onClick={onSubmit}>
                <Text type="20" fontWeight={700} color="white">
                  CONFIRM
                </Text>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardStyled>
    </>
  )
}
export default Container
