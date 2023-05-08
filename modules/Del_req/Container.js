import { Box, Grid, styled } from "@mui/material"
import { COLORS } from "../../theme"
import { useRouter } from "next/router"
import { size } from "lodash"
import React,{useEffect,useState} from "react"
import { Button, ConfirmEmail, Tag, Card,Text, TextField, TextFieldPassword, TOCDialog } from "../../components"
import useDeleteReqController from "./controller"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

const ContainButton = styled("div")(({ theme }) => ({
  margin: "auto",
  // backgroundColor:"red",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}))

const CardStyled = styled(Card)(({ theme }) => ({
  maxWidth: "600px",
  margin: "auto",
  padding: "48px 96px",
  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}))



const Container = () => {
  const router = useRouter()
  const {DeleteReq} = useDeleteReqController()

  return (
    <CardStyled>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <FontAwesomeIcon icon={faCircleExclamation} color="red" size="3x" />
            <br/>
            <Text type="25" color="red" fontWeight={700} textAlign="center">
              Delete an Account?
            </Text>
            <br/>
            <Text type="17" color="gray600" fontWeight={500} textAlign="center">
              You have 0.000 CERO
            </Text>
            <Text type="17" color="gray600" fontWeight={500} textAlign="center">
              After you delete you account
            </Text>
            <Text type="17" color="gray600" fontWeight={500} textAlign="center">
              you cannot use your coin.........
            </Text>
            <Text type="17" color="gray600" fontWeight={500} textAlign="center">
              Please check your mailbox
            </Text>
            <br/><br/><br/>
            <ContainButton>
              <Button variant="contained_square_red" fullWidth onClick={() => DeleteReq()}>
                <Text type="20" fontWeight={700} color="white">
                  Delete
                </Text>
              </Button>
            </ContainButton>
            <br/>
            <ContainButton>
              <Button variant="outlined_square" fullWidth >
                <Text type="20" fontWeight={700} color="primary">
                  Discard
                </Text>
              </Button>
            </ContainButton>
            
          </Box>
        </Grid>
      </Grid>
    </CardStyled>
  )
}
export default Container
