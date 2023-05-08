import { Dialog } from "@mui/material"
import { Box, styled } from "@mui/system"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { Button, Text } from "../../../../components"
import { StylesCustom } from "../../../../components/Button"
import { COLORS } from "../../../../theme"
import { toCurrecyFormat } from "../../../../utils/number"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import toUpper from "lodash/toUpper"

const ExpiredTopup = (props) => {
  const {amount, transfer, date,refid,CloseTopup,CloseConfirm } = props
  const router = useRouter()

  return (
    <>
      <Main sx={{ marginTop: "20px" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: "16px", background: "#E5E5E5", width: "100%" }}
          position='relative'
        >
          <InfoOutlinedIcon sx={{fontSize: 18 ,color:"#979797"}} />
          <Text type="12" color="gray666" textAlign="center" fontWeight={500}>
           QR has expired
          </Text>
        </Box>
        <Divider_DASH sx={{ marginTop: "10px" }} />

        <Box display="flex" justifyContent='center' alignItems='center' mt='40px' sx={{background:"#E5E5E5",borderRadius:'50%',height:"72px",width:"72px"}}>
            <InfoOutlinedIcon sx={{fontSize: 50 ,color:"#979797"}} />
        </Box>

        <Text type={20} fontWeight={700} color="gray333" sx={{ marginTop: "24px" }}>
          Expired
        </Text>
        
            <Text type={12} fontWeight={600} color="gray9797" textAlign='center'>
        This transaction has expired due to incompleted transaction <br/> within  24 hours. <br/><br/> 

                    If payment has already been made,<br/>  
                please contact admin at admin@vekin.com
        </Text>
        {/* <Text type={12} fontWeight={600} color="gray9797">
        This transaction has expired due to incompleted transaction within 24 hours.

                    If payment has already been made, 
                please contact admin at admin@vekin.com
        </Text> */}
        <Divider_DASH sx={{ marginTop: "10px" }} />

        <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }} px="20px" pt="20px" w>
          <Text type={14} fontWeight={600} color="gray9797">
            Amount
          </Text>
          <Box>
            <Text type={20} fontWeight={700} color="green100" sx={{ paddingRight: "8px" }}>
              {amount}
            </Text>
            <Text type={14} fontWeight={600} color="black">
              THB
            </Text>
          </Box>
        </Box>

        <Divider_DASH sx={{ marginTop: "10px" }} />
        <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }} px="20px" pt="15px" w>
          <Text type={14} fontWeight={600} color="gray9797">
            Transfer To
          </Text>
          <Box>
            <Text type={14} fontWeight={600} color="black333">
              {transfer}
            </Text>
          </Box>
        </Box>
        <Divider_DASH sx={{ marginTop: "10px" }} />
        <Box display="flex" sx={{ justifyContent: "space-between", width: "100%" }} px="20px" pt="15px">
          <Text type={14} fontWeight={600} color="gray9797">
            Success On
          </Text>
          <Text type={14} fontWeight={600} color="black333">
            {date}
          </Text>
        </Box>
        <Divider_DASH sx={{ marginTop: "10px" }} />
        <Text type={12} fontWeight={600} color="gray9797" sx={{marginTop:'10px'}}>
          REF ID : {refid}
        </Text>
        <br />
      </Main>
      <Divider sx={{ marginTop: "20px" }} />
      <Box
        display="flex"
        justifyContent="center"
        sx={{ width: "100%", marginTop: "20px" }}
      >
        <Button variant="outlined_square" sx={{width:'273px',borderColor:"white"}} onClick={()=>{CloseTopup();CloseConfirm()}}>
          <Text textAlign="center" type={16} fontWeight={700} color="white" >
            Top-up Again
          </Text>
        </Button>
      </Box>
    </>
  )
}

export default ExpiredTopup

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  background: COLORS.VEKIN_GREEN,
})

const Divider_DASH = styled("div")({
  width: "100%",
  height: "3px",
  borderBottom: `dashed 1px ${COLORS.GRAY90}`,
})

const Main = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  background: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}))
