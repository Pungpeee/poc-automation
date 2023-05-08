import React from "react"
import SelectUnstyled from "@mui/base/SelectUnstyled"
// import OptionUnstyled from "@mui/base/OptionUnstyled"
import PopperUnstyled from "@mui/base/PopperUnstyled"
import OptionGroupUnstyled from "@mui/base/OptionGroupUnstyled"
import { styled } from "@mui/system"
import { Box } from "@mui/material"
import { Button, Text } from "../components"
import { COLORS } from "../theme"
import { MENUS } from "../contexts/menu/Provider"
import { useRouter } from "next/router"
import useSignout from "../hooks/useSignout"
import { STATUS } from "./Header"
import Image from "next/image"
import { StylesCustom } from "../components/Button"
import { useState } from "react"

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
}

const grey = {
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
}

const StyledButton = styled("button")(
  ({ theme }) => `
    border: 0;
    border-radius: 8px;
    padding: 4px 10px 4px 4px;
    background: rgba(76, 181, 150, 0.25);
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    cursor: pointer;
    span {
        color: ${COLORS.WHITE};
    }
  `
)

const StyledListbox = styled("ul")(
  ({ theme }) => `
    border-radius: 4px;
    padding: 8px 16px 16px 16px;
    min-width: 220px;
    background: #006A76;
    margin-top: 0px;
    box-sizing: border-box;
    overflow: auto;
  `
)

const StyledOption = styled("div")(
  ({ theme, error }) => `
    // list-style: none;
    padding: 10px 0px;
    text-align: start;
    // border-radius: 4px;
    // background: ${COLORS.RED};
    // span {
    //     color: ${error && COLORS.WHITE};
    // }
    display: ${error ? "none" : "block"};
  `
)

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1000;
`

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  }

  return <SelectUnstyled {...props} ref={ref} components={components} />
})

const StyledGroupRoot = styled("li")`
  list-style: none;
`

const StyledGroupOptions = styled("ul")`
  list-style: none;
  margin-left: 0;
  padding: 0;

  //   > li {
  //     padding-left: 20px;
  //   }
`

// eslint-disable-next-line react/display-name
const withAttrs = (Component, attrs) => (props) =>
  (
    <Box sx={{ mb: 1 }}>
      <Component {...attrs} {...props} />
    </Box>
  )

const CustomOptionGroup = React.forwardRef(function CustomOptionGroup(props, ref) {
  const StyledGroupHeader = withAttrs(Text, {
    type: 12,
    fontWeight: 500,
    textAlign: "center",
    color: "red200",
    as: "div",
    sx: {
      cursor: "pointer",
    },
  })

  const components = {
    Root: StyledGroupRoot,
    Label: StyledGroupHeader,
    List: StyledGroupOptions,
    ...props.components,
  }

  return <OptionGroupUnstyled {...props} ref={ref} components={components} />
})

export const NameIcon = styled("div")(({ theme }) => ({
  textTransform: "uppercase",
  width: "32px",
  height: "32px",
  background: COLORS.GREEN040,
  borderRadius: "4px",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
}))

const ImageWrapper = styled(Box)({
  width: "32px",
  height: "32px",
  borderRadius: "4px",
  overflow: "hidden",
})

const TextWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}))

export const WrapperStatus = ({ children, variant, borderColor, bgColor }) => {
  return (
    <Box
      sx={{
        ...StylesCustom({ borderColor, bgColor })[variant],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 24px",
        gap: "5px",
        cursor: "default",
      }}
    >
      {children}
    </Box>
  )
}

const Menus = ({ profileData, kycStatus }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { signOut } = useSignout()

  const onSelect = (path) => {
    setOpen(!open)
    if (typeof path === "function") {
      return path()
    }
    return router.push(path ?? "/")
  }

  const URL = process.env.NEXT_PUBLIC_MEDIA_ENDPOINT

  return (
    <CustomSelect
      renderValue={() => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: 1,
              //   textTransform: "uppercase",
            }}
          >
            {profileData?.image !== undefined && profileData?.image !== null ? (
              <ImageWrapper>
                <Image src={`${URL}${profileData?.image}`} alt="" width="100%" height="100%" />
              </ImageWrapper>
            ) : (
              <NameIcon>
                <Text type="14" fontWeight={700}>
                  {profileData?.email?.slice(0, 1)}
                </Text>
              </NameIcon>
            )}
            <TextWrapper>
              <Text type="14" fontWeight={700} color="black">
                {profileData?.email}
              </Text>
            </TextWrapper>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "6px", width: "12px" }}>
              <Image src="/Vector.svg" alt="" width="100%" height="100%" />
            </Box>
          </Box>
        )
      }}
      onListboxOpenChange={() => setOpen(!open)}
      listboxOpen={open}
    >
      <CustomOptionGroup>
        <StyledOption onClick={() => onSelect("/edit_profile")}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text type="12" fontWeight={600} color="white">
              Edit Profile
            </Text>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "12px", width: "12px" }}>
              <Image src="/Next_icon.svg" alt="" width="100%" height="100%" />
            </Box>
          </Box>
        </StyledOption>
        <StyledOption>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text type="12" fontWeight={600} color="gray600">
              Tips & Trick
            </Text>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "12px", width: "12px" }}>
              <Image src="/Next_icon.svg" alt="" width="100%" height="100%" />
            </Box>
          </Box>
        </StyledOption>
        <StyledOption>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text type="12" fontWeight={600} color="gray600">
              Tax Invoice
            </Text>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "12px", width: "12px" }}>
              <Image src="/Next_icon.svg" alt="" width="100%" height="100%" />
            </Box>
          </Box>
        </StyledOption>
        <hr />
        <StyledOption onClick={() => onSelect(signOut)}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text type="12" fontWeight={600} color="error050">
              Sign Out
            </Text>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "12px", width: "12px" }}>
              <Image src="/Next_icon.svg" alt="" width="100%" height="100%" />
            </Box>
          </Box>
        </StyledOption>
      </CustomOptionGroup>
    </CustomSelect>
  )
}

export default Menus
