import React, { useCallback, useEffect } from "react"
import ButtonBase from "@mui/material/ButtonBase"
import { Box, Drawer, Grid, IconButton, styled } from "@mui/material"
import Image from "next/image"
import { Button, Text, TextField } from "../components"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { formValidate } from "../utils/formValidate"
import { useAuthContext } from "../contexts/auth/consume"
import Menus, { NameIcon, WrapperStatus } from "./HeaderMenuNew"
import { useState } from "react"
import { COLORS } from "../theme"
import { useQueryprofile } from "../adapter/query"
import useSignout from "../hooks/useSignout"
import DeviceDetector from "device-detector-js"

const HeaderStyled = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "9px 14px",
  height: "58px",
  position: "relative",
  background: "linear-gradient(167.96deg, #00424D 1.04%, #2C6979 100%)",
  boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.08)",
  top: "0px",
  left: "auto",
  right: "0px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

const ContainerMenu = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  justifyContent: "space-evenly",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}))

const MenuButton = styled(ButtonBase)({
  display: "flex",
  borderRadius: "8px",
  height: "100%",
  flexDirection: "column",
  alignItems: "center",
  padding: "12px 16px",
})

const InMenuButtonStyled = styled(Box)(({ current, label }) => ({
  borderBottom: `${current === label ? "2px solid #00FFB7" : null}`,
  paddingBottom: "5px",
}))

const AccountButton = styled(ButtonBase)({
  padding: "4px",
  borderRadius: "8px",
  background: "#4CB596",
  display: "flex",
  maxWidth: "200px",
  alignItems: "center",
})

const ContainMenuStyled = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  [theme.breakpoints.down("md")]: {
    padding: "8px",
  },
}))

const MenuListStyled = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}))

const MenuStyled = styled("div")(({ theme }) => ({
  display: "none",
  marginRight: "22px",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}))

const LogoStyled = styled("div")(({ theme }) => ({
  margin: "0 0 0 48px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  [theme.breakpoints.down("md")]: {
    margin: "0 0 0 15px",
  },
}))

const WrapperImage = styled("div")(({ theme }) => ({
  width: "55.38px",
  height: "55.38px",
  [theme.breakpoints.down("md")]: {
    width: "35px",
    height: "36px",
  },
}))

const WrapperText = styled("div")({
  cursor: "pointer",
  maxWidth: "48px",
})

const WrapperPadding = styled("div")(({ theme }) => ({
  padding: "48px 156px",
  [theme.breakpoints.down("md")]: {
    padding: "48px 16px",
  },
}))

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
}))

const MenuOptions = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "My Cards",
    href: "",
  },
  {
    label: "Wallets",
    href: "/wallet",
  },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "Leaderboard",
    href: "/",
  },
]

const VectorBg = styled("img")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "60%",
  bottom: 0,
  left: 0,
  zIndex: 1,
  [theme.breakpoints.down("md")]: {
    objectFit: "cover",
  },
}))

const WrapperButton = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}))

const useHeaderController = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm()

  const onSubmit = handleSubmit((formValue) => {
    router.push({
      pathname: "/register",
      query: { email: formValue.email },
    })
  })

  return {
    formRule: formValidate(),
    control,
    onSubmit,
  }
}

const ButtonDrawer = styled(Button)`
  padding: 0 !important;
  justify-content: flex-end;
`

export const IconPending = styled("span")`
  width: 21px;
  height: 21px;
  background: ${COLORS.ORANGE};
  border-radius: 50%;
`

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  ".MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}))

export const STATUS = {
  "-1": "no_process",
  1: "not_verify",
  2: "in_review",
  3: "approve",
}

const Header = ({ role }) => {
  const { formRule, control, onSubmit } = useHeaderController()
  const [current, setCurrent] = useState()
  const router = useRouter()
  const { signOut } = useSignout()
  const { data: profileData } = useQueryprofile({})
  const { isAuth } = useAuthContext()
  const [open, setOpen] = useState(false)
  const kycStatus = STATUS[profileData?.kyc_status]

  const checkIsLoginPage = router.pathname == "/login" || router.pathname == "/register"

  useEffect(() => {
    setCurrent(handle_current(router.pathname))
  }, [router])

  const handle_current = (pathname) => {
    switch (pathname) {
      case "/":
        return "Home"
        break
      case "/wallet":
        return "Wallets"
        break
      case "/leaderboard":
        return "Leaderboard"
        break
      case "/mycard":
        return "My Cards"
        break
      case "/marketplace":
        return "Marketplace"
        break
    }
  }

  const handleClickDownloadApp = useCallback(() => {
    const detector = new DeviceDetector()
    const device = detector.parse(window.navigator.userAgent)

    if (device.os.name === "iOS") {
      window.location.assign("https://apps.apple.com/th/app/carbon-wallet/id1614214805")
    } else if (device.os.name === "Android") {
      window.location.assign("https://play.google.com/store/apps/details?id=com.vekin.carbon_wallet")
    } else {
      window.location = "/download-app"
    }
  }, [])

  const handleButton = (label, href) => {
    // setCurrent(label)
    if (label == "Leaderboard" && router.pathname == "/") {
      if (isAuth) {
        window.scrollTo(0, 570)
      } else {
        window.scrollTo(0, 900)
      }
    } else if (label == "Leaderboard" && router.pathname !== "/") {
      router.push(href).then(() => {
        if (isAuth) {
          window.scrollTo(0, 570)
        } else {
          window.scrollTo(0, 900)
        }
      })
    } else {
      router.push(href)
    }
  }

  return (
    <HeaderStyled>
      <Box marginTop={3}>
        <Image src="/cero_icon_group.svg" alt="" width="100%" height="100%" onClick={() => router.push("/")} />
      </Box>
      <ContainerMenu>
        {MenuOptions.map(({ label, href }, index) => {
          return (
            <MenuButton key={index} onClick={() => handleButton(label, href)}>
              <InMenuButtonStyled current={current} label={label}>
                <Text
                  type={12}
                  fontWeight={current == label ? 700 : 500}
                  color={current == label ? "white" : "green040"}
                >
                  {label}
                </Text>
              </InMenuButtonStyled>
            </MenuButton>
          )
        })}
        <PartnerWithUS_Button onClick={() => (window.location = "/partner_with_us")}>
          <Text type={12} fontWeight={700} color={"#10523E"}>
            Partner With Us
          </Text>
        </PartnerWithUS_Button>
      </ContainerMenu>
      {isAuth ? (
        <Menus profileData={profileData} kycStatus={kycStatus} />
      ) : // <AccountButton>
      // <Box></Box>
      // </AccountButton>
      !checkIsLoginPage ? (
        <>
          <WrapperButton>
            <Button
              variant="outlined_square"
              sx={{ borderRadius: "8px", borderColor: "white", height: "100%" }}
              onClick={() => handleButton("", "/login")}
            >
              <Text type={12} fontWeight={700} color="white">
                Sign in
              </Text>
            </Button>
          </WrapperButton>
          {/* <Test2 /> */}

          <HamburgerIconWrapper>
            <Image src="/menu.svg" alt="Picture of the author" width={35} height={22} onClick={() => setOpen(!open)} />
            <DrawerStyled
              anchor={"right"}
              open={open}
              onClose={() => setOpen(!open)}
              PaperProps={{
                sx: {
                  width: "60vw",
                  padding: "22px 24px",
                  textAlign: "right",
                  display: "flex",
                  flexDirection: "column",
                },
              }}
              BackdropProps={{
                sx: {
                  backgroundColor: COLORS.GRAY600,
                },
              }}
            >
              <Box>
                <ButtonDrawer disableRipple onClick={() => setOpen(!open)}>
                  <Image src="/close.svg" width={17} height={17} alt=" " />
                </ButtonDrawer>

                {MenuOptions.map(({ label, href }, index) => {
                  return (
                    <ButtonDrawer
                      disableRipple
                      variant="text"
                      key={index}
                      fullWidth
                      onClick={() => {
                        setOpen(!open)
                        router.replace(href)
                      }}
                    >
                      <Text type={16} fontWeight={500} color="black" textAlign="right">
                        {label}
                      </Text>
                    </ButtonDrawer>
                  )
                })}
                <ButtonDrawer
                  disableRipple
                  variant="text"
                  key={"signin"}
                  fullWidth
                  onClick={() => {
                    setOpen(!open)
                    router.replace("/login")
                  }}
                >
                  <Text type={16} fontWeight={500} color="black" textAlign="right">
                    Sign-in
                  </Text>
                </ButtonDrawer>
                <ButtonDrawer
                  disableRipple
                  variant="text"
                  key={"partner"}
                  fullWidth
                  onClick={() => {
                    setOpen(!open)
                    router.replace("/partner_with_us")
                  }}
                >
                  <Text type={16} fontWeight={500} color="green100" textAlign="right">
                    Partner with us
                  </Text>
                </ButtonDrawer>
              </Box>
            </DrawerStyled>
          </HamburgerIconWrapper>
        </>
      ) : (
        <>
          <Box></Box>
          <HamburgerIconWrapper>
            <Image src="/menu.svg" alt="Picture of the author" width={35} height={22} onClick={() => setOpen(!open)} />
            <DrawerStyled
              anchor={"right"}
              open={open}
              onClose={() => setOpen(!open)}
              PaperProps={{
                sx: {
                  width: "60vw",
                  padding: "22px 24px",
                  textAlign: "right",
                  display: "flex",
                  flexDirection: "column",
                },
              }}
              BackdropProps={{
                sx: {
                  backgroundColor: COLORS.GRAY600,
                },
              }}
            >
              <Box>
                <ButtonDrawer disableRipple onClick={() => setOpen(!open)}>
                  <Image src="/close.svg" width={17} height={17} alt=" " />
                </ButtonDrawer>

                {MenuOptions.map(({ label, href }, index) => {
                  return (
                    <ButtonDrawer
                      disableRipple
                      variant="text"
                      key={index}
                      fullWidth
                      onClick={() => {
                        setOpen(!open)
                        router.replace(href)
                      }}
                    >
                      <Text type={16} fontWeight={500} color="black" textAlign="right">
                        {label}
                      </Text>
                    </ButtonDrawer>
                  )
                })}
                <ButtonDrawer
                  disableRipple
                  variant="text"
                  key={"signin"}
                  fullWidth
                  onClick={() => {
                    setOpen(!open)
                    router.replace("/login")
                  }}
                >
                  <Text type={16} fontWeight={500} color="black" textAlign="right">
                    Sign-in
                  </Text>
                </ButtonDrawer>
                <ButtonDrawer
                  disableRipple
                  variant="text"
                  key={"partner"}
                  fullWidth
                  onClick={() => {
                    setOpen(!open)
                    router.replace("/partner_with_us")
                  }}
                >
                  <Text type={16} fontWeight={500} color="green100" textAlign="right">
                    Partner with us
                  </Text>
                </ButtonDrawer>
              </Box>
            </DrawerStyled>
          </HamburgerIconWrapper>
        </>
      )}
    </HeaderStyled>
  )
}

export default Header

const PartnerWithUS_Button = styled(ButtonBase)({
  width: "118px",
  height: "39px",
  background: "#00FFB7",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

const HamburgerIconWrapper = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}))
