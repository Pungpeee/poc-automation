import React, { useCallback } from "react"
import { Box, Drawer, IconButton, styled } from "@mui/material"
import Image from "next/image"
import { Button, Text } from "../components"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuthContext } from "../contexts/auth/consume"
import Menus, { NameIcon } from "./HeaderMenu"
import { useState } from "react"
import { COLORS } from "../theme"
import { useQueryprofile } from "../adapter/query"
import useSignout from "../hooks/useSignout"

const ROLE = {
  banner: "banner",
}

const HeaderStyled = styled("div")(({ theme, role }) => ({
  width: "100%",
  position: "relative",
  top: "0px",
  left: "auto",
  right: "0px",
  backgroundImage: role === ROLE?.banner ? 'url("/bg.png")' : "linear-gradient(to right, #1EAB8D 10%, #196078 75%)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  boxSizing: "border-box",
  backgroundPosition: "bottom",
  [theme.breakpoints.up("lg")]: {
    minHeight: role === ROLE?.banner ? 600 : "100%",
  },
}))

const ContainMenuStyled = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  background: "radial-gradient(148.65% 253.72% at -20.21% 52.07%, #1EAB8D 0%, #196078 82.88%)",
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

const MenuOptions = [
  {
    label: "ABOUT US",
    href: "/",
  },
  {
    label: "REGISTER",
    href: "/register",
  },
  {
    label: "SIGN-IN",
    href: "/login",
  },
]

const MenuAuthOptions = [
  {
    label: "Wallet",
    href: "/wallet",
  },
  {
    label: "top-up",
    href: "/topup/cero",
  },
  {
    label: "history",
    href: "/history",
  },
  {
    label: "change password",
    href: "/change-password",
  },
]

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
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}))

export const STATUS = {
  "-1": "no_process",
  1: "not_verify",
  2: "in_review",
  3: "approve",
}

const DownloadAppHeader = ({ role }) => {
  const router = useRouter()
  const { signOut } = useSignout()
  const { data: profileData } = useQueryprofile({})
  const { isAuth } = useAuthContext()
  const [open, setOpen] = useState(false)
  const kycStatus = STATUS[profileData?.kyc_status]

  return (
    <HeaderStyled role={role}>
      <ContainMenuStyled>
        <LogoStyled>
          <WrapperImage>
            <Image src="/wallet.svg" alt="Picture of the author" width="100%" height="100%" />
          </WrapperImage>
          <Link href="/" passHref>
            <WrapperText>
              <Text color="white" type="20" fontWeight="700">
                CARBON WALLET
              </Text>
            </WrapperText>
          </Link>
        </LogoStyled>
        <MenuListStyled>
          {isAuth ? (
            <Menus profileData={profileData} kycStatus={kycStatus} />
          ) : (
            MenuOptions.map(({ label, href }, index) => {
              return (
                <Button disableRipple variant="text" key={index} onClick={() => router.push(href)}>
                  <Text type={16} fontWeight={500} color="white">
                    {label}
                  </Text>
                </Button>
              )
            })
          )}
        </MenuListStyled>
        <MenuStyled>
          <IconButton>
            {isAuth ? (
              <>
                <NameIcon onClick={() => setOpen(!open)}>
                  <Text type="20" fontWeight={400} color="white">
                    {profileData?.email?.slice(0, 1)}
                  </Text>
                </NameIcon>
                <DrawerStyled
                  anchor={"right"}
                  open={open}
                  onClose={() => setOpen(!open)}
                  on
                  PaperProps={{
                    sx: {
                      width: "85vw",
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

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                      <NameIcon>
                        <Text type="20" fontWeight={400} color="white">
                          {profileData?.email?.slice(0, 1)}
                        </Text>
                      </NameIcon>
                    </Box>

                    <ButtonDrawer disableRipple variant="text" fullWidth>
                      <Text type={14} fontWeight={700} color="label" textAlign="right">
                        {profileData?.email}
                      </Text>
                    </ButtonDrawer>
                    {kycStatus === STATUS[3] ? (
                      <Button
                        startIcon={<Image src="/verified.svg" width={21} height={21} alt="" />}
                        variant="outlined_rounded"
                        fullWidth
                        disableRipple
                        borderColor={COLORS.GRAY}
                      >
                        <Text type={14} fontWeight={500} color="label" textAlign="center">
                          VERIFIED
                        </Text>
                      </Button>
                    ) : kycStatus === STATUS[-1] || kycStatus === STATUS[1] ? (
                      <>
                        <Text
                          onClick={() => {
                            setOpen(!open)
                            router.replace("/kyc")
                          }}
                          type={12}
                          fontWeight={500}
                          color="red200"
                          textAlign="center"
                          as="div"
                          sx={{ mb: 1 }}
                        >
                          NOT VERIFIED
                        </Text>
                        <Button variant="contained_rounded" fullWidth disableRipple bgColor={COLORS.RED}>
                          <Text type={14} fontWeight={500} color="white" textAlign="center">
                            VERIFY ACCOUNT
                          </Text>
                        </Button>
                      </>
                    ) : (
                      <Button
                        startIcon={<IconPending />}
                        variant="outlined_rounded"
                        fullWidth
                        disableRipple
                        borderColor={COLORS.ORANGE}
                      >
                        <Text type={14} fontWeight={500} color="orange" textAlign="center">
                          VERIFY PENDING
                        </Text>
                      </Button>
                    )}

                    {MenuAuthOptions.map(({ label, href }, index) => {
                      return (
                        <ButtonDrawer
                          disableRipple
                          variant="text"
                          key={index}
                          fullWidth
                          onClick={() => {
                            setOpen(!open)
                            return router.replace(href)
                          }}
                        >
                          <Text type={16} fontWeight={500} color="black" textAlign="right">
                            {label}
                          </Text>
                        </ButtonDrawer>
                      )
                    })}

                    <ButtonDrawer disableRipple variant="text" fullWidth onClick={() => signOut()}>
                      <Text type={16} fontWeight={500} color="black" textAlign="right">
                        sign-out
                      </Text>
                    </ButtonDrawer>
                  </Box>
                </DrawerStyled>
              </>
            ) : (
              <>
                <Image
                  src="/menu.svg"
                  alt="Picture of the author"
                  width={35}
                  height={22}
                  onClick={() => setOpen(!open)}
                />
                <DrawerStyled
                  anchor={"right"}
                  open={open}
                  onClose={() => setOpen(!open)}
                  PaperProps={{
                    sx: {
                      width: "85vw",
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
                  </Box>
                </DrawerStyled>
              </>
            )}
          </IconButton>
        </MenuStyled>
      </ContainMenuStyled>
    </HeaderStyled>
  )
}

export default DownloadAppHeader
