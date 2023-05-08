import { Box, Grid, styled } from "@mui/material"
import { useRouter } from "next/router"
import { size } from "lodash"
import React,{useEffect,useState} from "react"
import { Button, ConfirmEmail, Tag, Card,Text, TextField, TextFieldPassword, TOCDialog } from "../../components"
import useDeleteController from "./controller"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

const ContainButton = styled("div")(({ theme }) => ({
  margin: "auto",
  width: "50%",
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
  const { pathname } = useRouter()
  const {isLoading,Expired,Error,Success,deleteAcc} = useDeleteController()
  
  useEffect (()=>{
    deleteAcc()
  },[])

  
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

            {isLoading  && (
            <Text type="25" color="red" fontWeight={500} textAlign="center">
              Wait for a second
            </Text>
            )}
            {Success  && (
            <Text type="25" color="red" fontWeight={500} textAlign="center">
              Your Account have been deleted.
            </Text>
            )}
            {Expired &&(
            <Text type="25" color="red" fontWeight={500} textAlign="center">
              Your Link is expired.
            </Text>
            )}
            {Error && (
            <Text type="25" color="red" fontWeight={500} textAlign="center">
              Can not Delete your account.
            </Text>
            )}
          </Box>
        </Grid>
      </Grid>
    </CardStyled>
  )
}
export default Container
