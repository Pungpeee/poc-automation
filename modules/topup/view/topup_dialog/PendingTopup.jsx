import { Dialog } from "@mui/material"
import { Box, styled } from "@mui/system"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { Button, Text } from "../../../../components"
import { COLORS } from "../../../../theme"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { useMutationCancelTopup } from "../../../../adapter/mutation/transactions"

const PendingTopup = (props) => {
  const { Fname, Lname, FnameTh, LnameTh, ref1, ref2, amount, transfer, qr, id,CloseTopup,CloseConfirm } = props
  const [cancelOpen, setcancelOpen] = useState(false)
  const router = useRouter()
  const { mutate } = useMutationCancelTopup({
    payload: {
      id: id,
      data:{
        status: -3,
        desc: "Cancel this transaction",
      }
    },
    options: {
      onSuccess:()=>{
        CloseConfirm()
        CloseTopup()
      },
    },
  })

  const handlecancel = () => {
    // const payload = {
    //   status: -3,
    //   desc: "Cancel this transaction",
    // }
    // const { data } = await axios.patch(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+`/api/transaction/${id}/`,payload);
    // console.log(data)
    mutate()
  }

  const openCancel = () => {
    setcancelOpen(true)
  }

  const closeCancel = () => {
    setcancelOpen(false)
  }

  return (
    <>
      <Dialog
        fullWidth
        onClose={closeCancel}
        scroll="body"
        maxWidth={"md"}
        open={cancelOpen}
        PaperProps={{
          sx: { width: "327px", padding: "16px", boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)", borderRadius: "8px" },
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Text color="error100" type={18} fontWeight={700}>
            Cancel
          </Text>
          <Text color="gray666" type={14} fontWeight={500} sx={{marginTop:"16px"}}>
            Cancel to top-up {amount} THB?
          </Text>
          <Box width="100%" display="flex" justifyContent="space-between" pa='3px' gap='5px' mt='24px'>
            <Button variant="contained_square_red" onClick={() => handlecancel()} fullWidth>
              <Text type={14} fontWeight={700} color="error050">
                Confirm
              </Text>
            </Button>
            <Button variant="outlined_square" onClick={() => closeCancel()} fullWidth>
              <Text type={14} fontWeight={700} color='green100'>
                Cancel
              </Text>
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Main sx={{ marginTop: "20px" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: "16px", background: "rgba(255, 214, 10, 0.25)", width: "100%" }}
        >
          <InfoOutlinedIcon sx={{ fontSize: 18, color: "#D8907D" }} />
          <Text type="12" color="coral" textAlign="center" fontWeight={500}>
            Top-up with mismatching info will be rejected
          </Text>
        </Box>
        <Divider_DASH sx={{ marginTop: "10px" }} />
        <Text type={14} fontWeight={500} color="gray666" sx={{ marginTop: "10px" }}>
          User only bank account named
        </Text>
        <Text type={20} fontWeight={700} color="green100">
          {Fname} {Lname}
        </Text>
        <Text type={14} fontWeight={600} color="black">
          {FnameTh} {LnameTh}
        </Text>
        <Box sx={{ width: "200px", height: "200px", marginTop: "10px" }}>
          <img width={200} src={process.env.NEXT_PUBLIC_MEDIA_ENDPOINT + qr} alt="qrcode" />
          {/* <img width={200} src={process.env.NEXT_PUBLIC_MEDIA_ENDPOINT + data?.payment?.qrcode} alt="qrcode" /> */}
        </Box>
        <Text type={12} fontWeight={600} color="gray9797">
          REF ID : {ref1}
        </Text>
        <Text type={12} fontWeight={600} color="gray9797">
          REF ID 2 : {ref2}
        </Text>
        <Divider_DASH sx={{ marginTop: "10px" }} />
        <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }} px="20px" pt="10px" w>
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
        <Box display="flex" sx={{ justifyContent: "space-between", width: "100%" }} px="20px" pt="10px">
          <Text type={14} fontWeight={600} color="gray9797">
            Transfer to
          </Text>
          <Text type={14} fontWeight={600} color="black333">
            {transfer}
          </Text>
        </Box>
        <br />
        {/* <Text type="12" color="coral" textAlign="center" fontWeight={500} sx={{marginTop:"16px",background:"rgba(255, 214, 10, 0.25)",width:"100%"}} >
            <InfoOutlinedIcon sx={{paddingTop:'5px',fontSize: 20}}/> Top-up with mismatching info will be rejected
          </Text> */}
      </Main>
      <Divider sx={{ marginTop: "20px" }} />
      <Box display="flex" flexDirection="row" justifyContent="space-evenly" sx={{ width: "100%", marginTop: "20px" }}>
        <Button variant="contained_square_red" onClick={() => openCancel()}>
          <Text type={16} fontWeight={700} color="error050">
            Cancel Order
          </Text>
        </Button>
        <Button
          variant="outlined_square_white"
          onClick={() => window.open(process.env.NEXT_PUBLIC_MEDIA_ENDPOINT + qr, "_blank")}
        >
          <Text type={16} fontWeight={700} color="white">
            Download QR Code
          </Text>
        </Button>
      </Box>
    </>
  )
}

export default PendingTopup

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
