import { Dialog } from "@mui/material"
import { Box,styled } from "@mui/system"
import React, { useEffect } from "react"
import { Button, Text } from "../../../../components"
import ClearIcon from '@mui/icons-material/Clear';
import { COLORS } from "../../../../theme"
import PendingTopup from "./PendingTopup"
import SuccessTopup from "./SuccessTopup"
import ExpiredTopup from "./ExpiredTopup"
import FailedTopup from './FailedTopup'
import { Topupcontroller } from "./controller"


const TopupDialog = (props) => {
  const { open,handleCloseConfirm,handleCloseTopupConfirm,Fname,Lname,FnameTh,LnameTh,email,id,have_another_tx} = props
  const {txData,time_format,status_code,check_expired,date} = Topupcontroller(open,id)
  
  return (
    <Dialog fullWidth onClose={handleCloseTopupConfirm} scroll='body' maxWidth={"md"} open={open} PaperProps={{ sx: {width:"457px",padding: "16px",backgroundImage:'linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)',boxShadow:"0px 16px 16px rgba(0, 0, 0, 0.16)",borderRadius:"8px"} }}>
      <Box display="flex" flexDirection="column" >
        <Box display="flex" justifyContent="space-between" alignItems='center' sx={{height:"46px"}}> 
          <Text type="20" color="white" fontWeight={700} >
            Transaction detail {have_another_tx?'(Please Finish this first)':null}
          </Text>
          <Button onClick={handleCloseTopupConfirm} variant="outlined_square_2" sx={{width:"46px",height:"46px",background:'rgba(165, 218, 203, 0.1)'}}>
            <ClearIcon sx={{fontSize: 18 ,color:"#C4C4C4"}} />
          </Button>
        </Box>
        <br/>
        <Divider sx={{marginTop:"2px"}}/>
        {status_code === 1 &&
          <PendingTopup CloseConfirm={handleCloseConfirm} CloseTopup={handleCloseTopupConfirm} id={id} Fname={Fname} Lname={Lname} FnameTh={FnameTh} LnameTh={LnameTh} ref1={txData?.payment?.ref_code_1} ref2={txData?.payment?.ref_code_2} amount={Number(txData?.thb_values).toLocaleString()} qr={txData?.payment?.qrcode} transfer={`${Fname} ${Lname}`}/>}
        {status_code === 2 && 
          <SuccessTopup recieve={txData?.coin} amount={Number(txData?.thb_values).toLocaleString()} transfer={`${Fname} ${Lname}`} date={time_format(date)} pRate={txData?.rate_per_usdt} refid={txData?.payment?.ref_code_1}/>}
        {status_code === -2 &&
          <FailedTopup CloseConfirm={handleCloseConfirm} CloseTopup={handleCloseTopupConfirm} amount={Number(txData?.thb_values).toLocaleString()} transfer={`${Fname} ${Lname}`} date={time_format(date)} refid={txData?.payment?.ref_code_1} email={email}/>}
        {(status_code === -2 && check_expired) &&
          <ExpiredTopup CloseConfirm={handleCloseConfirm} CloseTopup={handleCloseTopupConfirm} amount={Number(txData?.thb_values).toLocaleString()} transfer={`${Fname} ${Lname}`} date={time_format(date)} refid={txData?.payment?.ref_code_1}/> 
        }
      </Box>
    </Dialog>
  )
}

export default TopupDialog

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  background: COLORS.VEKIN_GREEN,
})

const Divider_DASH = styled("div")({
  width: "100%",
  height: "3px",
  borderBottom:`dashed 1px ${COLORS.GRAY90}`
})

const Main = styled(Box)(({ theme }) => ({
  borderRadius:"8px",
  background:"white",
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems: 'center',
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}))