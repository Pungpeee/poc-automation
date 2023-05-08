import { Dialog } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useMutationTopupCoin } from "../../../adapter/mutation/account"
import { Button, Text } from "../../../components"
import { COLORS } from "../../../theme"
import { toCurrecyFormat } from "../../../utils/number"
import toUpper from "lodash/toUpper"
import { TopupDialog } from "./topup_dialog"
import { Dialogcontroller } from "./controller"
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons"

const ConfirmTopupDialog = (props) => {
  const { open, handleCloseConfirm, thbAmount, tokenAmount } = props
  const [data,setData] = useState({})
  const { openTopup, handleCloseTopupConfirm, handleOpenTopupConfirm, profileData,Id,setHavetx,have_another_tx,txdata } = Dialogcontroller()
  const router = useRouter()
  const { mutate} = useMutationTopupCoin({
    onSuccess: (success) => {
      // setData(success.data)
      setHavetx(false)
      handleOpenTopupConfirm(success.id)
    },onError:(error)=>{
      if((error.response.data[0]== 'Details: This account already have Top-up transaction pending, Please Finish them first') && (error.response.status == 400)){
            if(have_another_tx == false){
              setHavetx(true)
            }else{
              handleOpenTopupConfirm(txdata.results.filter(a => a.status == 1)[0].id)
            }
        }
    }
    // onError:(error)=>{
    //   if((error.response.data.detail == 'Details: This account already have Top-up transaction pending, Please Finish them first') && (error.response.status == 400)){
    //     if(have_another_tx == false){
    //       setHavetx(true)
    //     }else{
    //       handleOpenTopupConfirm(txdata.results.filter(a => a.status == 1)[0].id)
    //     }
    //   }
    //   if(error.response.status == 401){
    //     if(have_another_tx == false){
    //       setHavetx(true)
    //     }else{
    //       handleOpenTopupConfirm(txdata.results.filter(a => a.status == 1)[0].id)
    //     }
    //     // handleOpenTopupConfirm(txdata.results.filter(a => a.status == 1)[0].id)
    //   }
    // }
  })

  const handleSubmitTopup = () => {
    const payload = {
      token_name: toUpper(router.query.coinId),
      thb_amount: Number(thbAmount),
      coin_amount: Number(tokenAmount),
      is_own_account: true,
      is_not_reuse: true,
      is_not_overtime: true,
    }
    mutate(payload)
    // handleOpenTopupConfirm()
  }

  return (
    <>
      <TopupDialog
        open={openTopup}
        handleCloseTopupConfirm={handleCloseTopupConfirm}
        handleCloseConfirm={handleCloseConfirm}
        // thbAmount={Number(thbAmount).toLocaleString()}
        Fname={profileData?.first_name}
        Lname={profileData?.last_name}
        FnameTh={profileData?.first_name_thai}
        LnameTh={profileData?.last_name_thai}
        email={profileData?.email}
        have_another_tx={have_another_tx}
        // ref1={data?.payment?.ref_code_1}
        // ref2={data?.payment?.ref_code_2}
        // qr='/backend/media/transaction/qrcode/2022-08/160_90120f30-194d-11ed-9ab1-0242ac110006.png'
        id={Id}
        // id='188'
      />
      <Dialog
        fullWidth
        onClose={handleCloseConfirm}
        maxWidth={"md"}
        open={open}
        PaperProps={{ sx: { padding: "38px" } }}
      >
        <Box display="flex" pb="40px" justifyContent="center">
          <Text type="18" color="black" fontWeight={500}>
            Confirm Top Up
          </Text>
        </Box>
        <Box>
          <Box pb="38px">
            <Item title="Amount Spent" amount={thbAmount ? toCurrecyFormat(thbAmount, 2) : "00.00"} currency="THB" />
          </Box>
          <Box pb="38px" borderBottom={`1px solid ${COLORS.GRAY400}`}>
            <Item
              title="Total Received"
              amount={tokenAmount ? toCurrecyFormat(tokenAmount, 8) : "00.00"}
              currency="CERO"
            />
          </Box>
          <Box pb="12px" pt="20px" borderBottom={`1px solid ${COLORS.GRAY400}`}>
            <SummaryItem title="Amount" amount={thbAmount ? toCurrecyFormat(thbAmount, 2) : "00.00"} currency="THB" />
          </Box>
        </Box>
        <Box pt="40px" display="flex" gap="12px" justifyContent="center">
          <Button onClick={handleCloseConfirm} variant="outlined_rounded">
            <Text type="20" fontWeight={700} color="primary">
              Disagree
            </Text>
          </Button>
          <Button variant="contained" onClick={handleSubmitTopup} autoFocus>
            <Text type="20" fontWeight={700} color="white">
              CONFIRM
            </Text>
          </Button>
        </Box>
      </Dialog>
    </>
  )
}

const Item = (props) => {
  const { title, amount, currency } = props

  return (
    <Box display="flex" justifyContent="space-between">
      <Text type="18" fontWeight={500}>
        {title}
      </Text>
      <Box display="flex" justifyContent="flex-start" gap="20px">
        <Text type="18" fontWeight={500}>
          {amount}
        </Text>
        <Text type="18" fontWeight={500}>
          {currency}
        </Text>
      </Box>
    </Box>
  )
}

const SummaryItem = (props) => {
  const { title, amount, currency } = props

  return (
    <Box display="flex" justifyContent="space-between">
      <Text type="18" fontWeight={500}>
        {title}
      </Text>
      <Box display="flex" justifyContent="flex-start" gap="32px">
        <Text type="18" color="primary" fontWeight={500}>
          {amount}
        </Text>
        <Text type="18" fontWeight={500}>
          {currency}
        </Text>
      </Box>
    </Box>
  )
}

export default ConfirmTopupDialog
