import { Box, Container, styled, Divider, TextField, InputAdornment, MenuItem, Menu, ButtonBase } from "@mui/material"
import Image from "next/image"
import toUpper from "lodash/toUpper"
import { useRouter } from "next/router"
import { Button, FieldSet, Text } from "../../components"
import Card from "../../components/Card"
import { COLORS } from "../../theme"
import Checkbox_Custom from "../../components/Form/Checkbox"
import { swapController } from "./controller"
import { Controller, useForm } from "react-hook-form"
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { ConfirmTopupDialog } from "./view"

const TopupContainer = () => {
  const { control, handleSubmit } = useForm()
  const {
    rules,
    balance,
    handlechangerules,
    tokenForm,
    handleChangeToken,
    currentCoin,
    open,
    handleClick,
    handleSelect,
    opendialog,
    anchorEl,
    handleopendialog,
    handleclosedialog,
    setcurrentCoin,
    addCoinPercen,
    fee_amount
  } = swapController()
  const router = useRouter()

  const COIN = [
    { label: "GREEN", fee: 0.05 },
    { label: "T-VER", fee: 0.03 },
  ]

  return (
    <Wrapper>
      <ConfirmTopupDialog
        ceroAmount={tokenForm.CeroAmount}
        tokenAmount={tokenForm.tokenAmount}
        opendialog={opendialog}
        handleCloseConfirm={handleclosedialog}
      />
      <Button_Display />
      <TopupWrapper>
        <Text type={20} fontWeight={700} color="white">
          Redeem
        </Text>
        <DividerStyled />
        <Box display="flex" justifyContent="space-between" position="relative">
          <Text type={12} fontWeight={700} color="white">
            Details
          </Text>
          <Box display="flex" paddingRight="8px" gap="16px">
            {/* <Text type={12} fontWeight={400} color="green040">
              1 CERO = {(fee_amount?.total_fee).toFixed(3)} GREEN
            </Text> */}
            <DividerStyled orientation="vertical" sx={{ borderColor: "#A5DACB" }} />
            <Text type={12} fontWeight={400} color="green040">
              Available {balance} CERO
            </Text>
          </Box>
        </Box>
        <PercentageBar tokenAmount={tokenForm.CeroAmount} balance={balance} addCoinPercen={addCoinPercen} />

        <Box display="flex" gap="24px" alignItems="center" justifyContent="center" position="relative">
          <InputTextField
            name="CERO"
            onChange={(e) => handleChangeToken(e.target.value)}
            value={tokenForm.CeroAmount}
            label="You want to pay"
            variant="filled"
          />
          <Swap_Icon />
          <SelectCoin
            coin={currentCoin}
            coinAmount={tokenForm.tokenAmount}
            anchorEl={anchorEl}
            open={open}
            handleClick={handleClick}
            handleSelect={handleSelect}
          />
          {/* <InputTextField
            name="T-VER"
            value={tokenForm.tokenAmount}
            label="You will receive"
            variant="filled"
            onChange={handlechange}
          >
            {COIN.map((d) => (
              <MenuItem key={d.label} value={d.fee}>
                {d.label}
              </MenuItem>
            ))}
          </InputTextField> */}
        </Box>
        <Box
          sx={{
            maxWidth: "318px",
            marginLeft: "8px",
            marginTop: "-8px",
            background: "rgba(220, 93, 94, 0.75)",
            borderRadius: "4px",
            padding: "4px 8px",
            visibility: "hidden",
            // visibility: isAmountError ? "visible" : "hidden",
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
          <Checkbox_Custom
            label="DON'T transfer during 23:30 - 00:10 (GMT +7)"
            checked={rules}
            onChange={handlechangerules}
          />
        </Box>
        <DividerStyled light />
        <Box display="flex" gap="8px">
          <Button variant="contained_square_green" fullWidth onClick={handleopendialog} disabled={!rules}>
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

const SelectCoin = (props) => {
  const { coin, coinAmount, anchorEl, open, handleClick, handleSelect,fee } = props
  return (
    <>
      <SelectBox disableRipple onClick={(e) => handleClick(e)}>
        <Box display="flex" flexDirection="column" width="90%" height="100%">
          <Text type={12} fontWeight={500} color="gray9797">
            You will receive
          </Text>
          <Box display="flex" gap="4px" alignItems="center">
            <Text type={18} fontWeight={400} color="darkgreen">
              {coin}
            </Text>
            <Text type={18} fontWeight={700} color="darkgreen">
              {coinAmount}
            </Text>
          </Box>
        </Box>
        <Box width="10%" height="100%" display="flex" alignItems="center" justifyContent="center">
          <Image src="/Arrow_down.svg" alt=" " width="10px" height="6px" />
        </Box>
      </SelectBox>
      <StyledMenu
        id="demo-customized-menu"
        // MenuListProps={{
        //   "aria-labelledby": "demo-customized-button",
        // }}
        anchorEl={anchorEl}
        open={open}
        // onClose={handleSelect}
      >
        <MenuItem
          onClick={() => {
            handleSelect("GREEN")
          }}
          disableRipple
        >
          <Box display="flex" justifyContent="space-between" padding="8px" width="100%">
            <p>GREEN</p>
            <p className="unit">1 : 1 THB</p>
          </Box>
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            handleSelect("T-VER")
          }}
          disableRipple
        >
          <Box display="flex" justifyContent="space-between" padding="8px" width="100%">
            <p>T-VER</p>
            <p className="unit">1 : 0.001 Ton T-VER</p>
          </Box>
        </MenuItem> */}
      </StyledMenu>
    </>
  )
}

const PercentageBar = (props) => {
  const { tokenAmount, balance, addCoinPercen } = props
  const check25 = tokenAmount >= (balance * 25) / 100 && tokenAmount !== ""
  const check50 = tokenAmount >= (balance * 50) / 100 && tokenAmount !== ""
  const check75 = tokenAmount >= (balance * 75) / 100 && tokenAmount !== ""
  const checkequal = tokenAmount == balance && tokenAmount !== ""
  return (
    <Box width="100%" height="22px" sx={{ gap: "8px", padding: "0px 16px" }} display="flex">
      <Box
        onClick={() => addCoinPercen(balance, 25)}
        width="23%"
        sx={{ background: `${check25 ? "#00FFB7" : "rgba(165, 218, 203, 0.1)"}` }}
      ></Box>
      <Box
        onClick={() => addCoinPercen(balance, 50)}
        width="23%"
        sx={{ background: `${check50 ? "#00FFB7" : "rgba(165, 218, 203, 0.1)"}` }}
      ></Box>
      <Box
        onClick={() => addCoinPercen(balance, 75)}
        width="23%"
        sx={{ background: `${check75 ? "#00FFB7" : "rgba(165, 218, 203, 0.1)"}` }}
      ></Box>
      <Box
        onClick={() => addCoinPercen(balance, 100)}
        width="23%"
        sx={{ background: `${checkequal ? "#00FFB7" : "rgba(165, 218, 203, 0.1)"}` }}
      ></Box>
      <Text type={16} fontWeight={700} color="white" textAlign="center" sx={{ width: "8%" }}>
        {balance !== 0 ? ((tokenAmount / balance) * 100).toFixed(2) : "0.00"}%
      </Text>
    </Box>
  )
}

const SelectBox = styled(ButtonBase)({
  borderRadius: 4,
  border: "1px solid #E5E5E5",
  background: "rgba(255, 255, 255, 0.9)",
  display: "flex",
  padding: "8px 16px",
  gap: "4px",
  width: "332px",
  height: "60px",
})

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
  borderColor: "#1FA37C",
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

const SwapButton = styled(Box)({
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
            {props.name}
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

const StyledMenu = styled((props) => (
  <Menu
    elevation={6}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 8,
    // marginTop: theme.spacing(1),
    border: "1px solid #A5DACB",
    minWidth: 332,
    boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      fontSize: "14px",
      fontWeight: 600,
      color: "#10523E",
      "& .unit": {
        fontSize: "14px",
        fontWeight: 500,
        color: "#979797",
      },
      "&:hover": {
        // backgroundColor:'red',
        color: "#1FA37C",
        fontSize: "14px",
        fontWeight: 700,
        "& .unit": {
          fontSize: "14px",
          fontWeight: 500,
          color: "#1FA37C",
        },
      },
    },
  },
}))
// ))(({ theme }) => ({
//   "& .MuiPaper-root": {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
//     boxShadow:
//       "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
//     "& .MuiMenu-list": {
//       padding: "4px 0",
//     },
//     "& .MuiMenuItem-root": {
//       "&:active": {
//         backgroundColor: "red",
//       },
//     },
//   },
// }))
