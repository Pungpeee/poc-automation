import { Box, Container, styled, Divider, TextField, InputAdornment } from "@mui/material"
import ButtonBase from "@mui/material/ButtonBase"
import Image from "next/image"
import toUpper from "lodash/toUpper"
import { useRouter } from "next/router"
import { Button, FieldSet, Text } from "../../components"
import Card from "../../components/Card"
import { COLORS } from "../../theme"
import { useTopupContainer } from "./controller"
import { ConfirmTopupDialog, NotVerifyDialog, PendingVerifyDialog } from "./view"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Checkbox_Custom from "../../components/Form/Checkbox"
import { Controller, useForm } from "react-hook-form"
// import InputAdornment from "@mui/material/InputAdornment"

const TopupContainer = () => {
  const {
    tokenForm,
    rateToken,
    rateThb,
    feeAmount,
    open,
    isAmountError,
    profileData,
    isError,
    feePercent,
    openNotVerify,
    openPendingVerify,
    handleOpenConfirm,
    handleCloseConfirm,
    handleChangeThb,
    handleChangeToken,
    rules1,
    rules2,
    rules3,
    setrules1,
    setrules2,
    setrules3,
  } = useTopupContainer()
  const { control, handleSubmit } = useForm()
  const router = useRouter()
  const isDisabledConfirm = Number(tokenForm.thbAmount) < 1 || Number(tokenForm.tokenAmount) <= 0
  const allRulesCheck = rules1 !== false && rules2 !== false && rules3 !== false

  if (isError) {
    return null
  }

  return (
    <Wrapper>
      <NotVerifyDialog open={openNotVerify} />
      <PendingVerifyDialog open={openPendingVerify} />
      <ConfirmTopupDialog
        thbAmount={tokenForm.thbAmount}
        tokenAmount={tokenForm.tokenAmount}
        open={open}
        handleCloseConfirm={handleCloseConfirm}
      />
      <Button_Display />
      <TopupWrapper>
        <Text type={20} fontWeight={700} color="white">
          Top-up
        </Text>
        <DividerStyled light />
        <Text type={12} fontWeight={700} color="white">
          Top-up method
        </Text>
        <MethodButton>
          <Image src="/qr_icon.svg" alt=" " width="52px" height="52px" />
          <Box display="flex" flexDirection="column" maxWidth="221px">
            <Text type={14} fontWeight={700} color="white">
              Mobile Banking (QR Code)
            </Text>
            <Text type={12} fontWeight={600} color="green040">
              Top-up process will be completed within 24 hours
            </Text>
          </Box>
          <Image src="/check_icon.svg" alt=" " width="16px" height="16px" />
        </MethodButton>
        <DividerStyled light />
        <Box display="flex" justifyContent="space-between" position="relative">
          <Text type={12} fontWeight={700} color="white">
            Details
          </Text>
          <Box display="flex" paddingRight="8px" gap="16px">
            <Text type={12} fontWeight={400} color="green040">
              1 CERO = 0.16555 THB
            </Text>
            <DividerStyled orientation="vertical" sx={{ borderColor: "#A5DACB" }} />
            <Text type={12} fontWeight={400} color="green040">
              Fee 0.1%
            </Text>
          </Box>
        </Box>
        <Box display="flex" gap="24px" alignItems="center" justifyContent="center" position="relative">
          <InputTextField
            name='Thb'
            onChange={(e) => handleChangeThb(e.target.value)}
            value={tokenForm.thbAmount}
            error={isAmountError}
            label="You want to pay"
            id="pay"
            variant="filled"
            autoFocus
          />
          <Swap_Icon />
          <InputTextField
            name='CERO'
            onChange={(e) => handleChangeToken(e.target.value)}
            value={tokenForm.tokenAmount}
            label="You will receive"
            id="recieve"
            variant="filled"
          />
        </Box>
        <Box
          sx={{
            maxWidth: "318px",
            marginLeft: "8px",
            marginTop: "-8px",
            background: "rgba(220, 93, 94, 0.75)",
            borderRadius: "4px",
            padding: "4px 8px",
            visibility: isAmountError ? "visible" : "hidden",
          }}
        >
          <Text type={12} fontWeight={700} color="error050">
            Minimum amount 1 THB
          </Text>
        </Box>
        <DividerStyled light />
        <Box display="flex" flexDirection="column" paddingY="4px">
          <Text type={14} fontWeight={700} color="white">
            Please read and follow the top-up rules:
          </Text>
          {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Use your own bank account (TrueMoney, Paotang, and E-wallet are NOT supported"
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "red" }} />}
              label="DON'T re-use this QR Code"
              sx={{ color: "white" }}
            />
            <FormControlLabel control={<Checkbox />} label="DON'T transfer during 23:30 - 00:10 (GMT +7)" />
          </FormGroup> */}
          <Checkbox_Custom
            label="Use your own bank account (TrueMoney, Paotang, and E-wallet are NOT supported)"
            checked={rules1}
            onChange={() => setrules1(!rules1)}
          />
          <Checkbox_Custom label="DON'T re-use this QR Code" checked={rules2} onChange={() => setrules2(!rules2)} />
          <Checkbox_Custom
            label="DON'T transfer during 23:30 - 00:10 (GMT +7)"
            checked={rules3}
            onChange={() => setrules3(!rules3)}
          />
        </Box>
        <DividerStyled light />
        <Box display="flex" gap="8px">
          <Button
            variant="contained_square_green"
            onClick={handleOpenConfirm}
            fullWidth
            disabled={isDisabledConfirm || isAmountError || !allRulesCheck}
          >
            <Text type={16} fontWeight={600} color="white" textAlign="center">
              Confirm
            </Text>
          </Button>
          <Button variant="outlined_square" fullWidth borderColor={COLORS.WHITE}>
            <Text type={16} fontWeight={600} color="white" textAlign="center">
              Cancel
            </Text>
          </Button>
        </Box>
      </TopupWrapper>
    </Wrapper>
  )
}

export default TopupContainer

const Wrapper = styled(Box)(({ theme }) => ({
  padding: "24px 360px 50px 360px",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  gap: "24px",
  background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
}))

const BackButton = styled(ButtonBase)({
  display: "flex",
  // justifyContent: "center",
  background: "rgba(165, 218, 203, 0.1)",
  borderRadius: "8px",
  maxWidth: "164px",
  height: "32px",
  gap: "8.5px",
  alignItems: "center",
})

const OrderRule = styled("ol")({
  "& li": {
    fontSize: "16px",
    fontFamily: "Prompt",
    fontWeight: 400,
    lineHeight: "24px",
  },
})

const TopupWrapper = styled(Box)({
  padding: "16px",
  background: "rgba(165, 218, 203, 0.1)",
  boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "720px",
})

const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: COLORS.DIVIDER_FOOTER,
  // margin: "16px 0 36px 0",
  [theme.breakpoints.down("md")]: {
    margin: "16px 0",
  },
}))

const MethodButton = styled(ButtonBase)({
  maxWidth: "336px",
  padding: "16px",
  display: "flex",
  gap: "16px",
  background: "rgba(165, 218, 203, 0.1)",
  alignContent: "center",
  borderRadius: "8px",
  maxHeight: "86px",
})

const SwapButton = styled(ButtonBase)({
  width: "40px",
  height: "40px",
  background: "#1FA37C",
  boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  position: "absolute",
})

const InputTextField = styled((props) => (
  <TextField
    InputProps={{
      disableUnderline: true,
      startAdornment: (
        <InputAdornment position="start">
          <Text type={18} fontWeight={400} color="green100">
           {props.name == 'Thb'?'THB':'CERO'}
          </Text>
        </InputAdornment>
      ),
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    width: "332px",
    height: "60px",
    overflow: "hidden",
    borderRadius: 4,
    // backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    backgroundColor: "white",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "white",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      borderColor: "white",
      color: "black",
    },
    // transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
  },
}))

const Swap_Icon = (props) => {
  return (
    <SwapButton>
      <Image src="/swap_icon.svg" alt=" " width="20px" height="18px" />
    </SwapButton>
  )
}

const Button_Display = () => {
  return (
    <BackButton>
      <Image src="/ReverseNext.svg" alt=" " width="16px" height="14px" />
      <Text type={14} fontWeight={700} color="white">
        Back to Wallets
      </Text>
    </BackButton>
  )
}
