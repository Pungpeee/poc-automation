import { styled } from "@mui/system"
import React from "react"
import { COLORS } from "../theme"
import {
  PRIMARY_COLOR,
  GRAY666,
  GRAY600,
  GRAY90,
  GRAY400,
  VEKIN_CORAL,
  ERROR050,
  GREEN100,
  ERROR100,
} from "../theme/color"

const COLOR = {
  primary: COLORS.PRIMARY_COLOR,
  primary25: COLORS.PRIMARY_COLOR25,
  primaryopacity: COLORS.PRIMARY_OPACITY,
  active: "#26464B",
  gray900: "#292726",
  gray666: GRAY666,
  gray600: GRAY600,
  gray400: GRAY400,
  gray90: GRAY90,
  gray800: "#585251",
  black: "#000000",
  white: "#fff",
  label: "#00B299",
  label2: "#1FA37C",
  red: "#921C1E",
  meta: "#888888",
  yellow: "#FAD51C",
  red100: "#FF0000",
  red200: "#FF1515",
  orange: "#E89F1E",
  coral: VEKIN_CORAL,
  error050: ERROR050,
  green100: GREEN100,
  gray9797: "#979797",
  grayc6c6: "#C6C6C6",
  black3333: "#333333",
  error100: ERROR100,
  green_neon: "#00FFB7",
  green040: "#A5DACB",
  green080: "#4CB596",
  darkgreen: "#22523E",
  forestgreen: "#59B29F",
  gray: "#F1F3F5",
  darkgreen: "#10523E",
  redEF2: "#EF2C2D",
}

const TextStyled = styled("div")(
  ({
    type,
    mobileType,
    mobileFontWeight,
    fontWeight,
    opacity,
    theme,
    $color,
    textAlign,
    fontFamily,
    pointer,
    width,
    mobileWidth,
    breakpoints,
  }) => ({
    fontFamily: fontFamily ?? "Prompt",
    fontSize: `${type}px`,
    color: COLOR[$color] || $color,
    fontWeight: fontWeight,
    width: width,
    lineHeight: 1.5,
    opacity: opacity,
    textAlign: textAlign,
    cursor: pointer ? "pointer" : "",
    [theme.breakpoints.down(breakpoints ?? "md")]: {
      fontSize: `${mobileType ?? type}px`,
      fontWeight: mobileFontWeight ?? fontWeight,
      width: mobileWidth ?? width,
    },
    
  })
)

const Text = (props) => {
  return (
    <TextStyled
      as={props.as ?? "span"}
      type={props.type}
      onClick={props.onClick}
      sx={props.sx}
      fontFamily={props.fontFamily}
      opacity={props.opacity}
      $color={props.color}
      fontWeight={props.fontWeight}
      pointer={props.pointer}
      mobileFontWeight={props.mobileFontWeight}
      mobileType={props.mobileType}
      textAlign={props.textAlign}
      width={props.width}
      mobileWidth={props.mobileWidth}
      breakpoints={props.breakpoints}
    >
      {props.children}
    </TextStyled>
  )
}

Text.defaultProps = {
  type: "16",
  fontWeight: 400,
  color: "black",
  opacity: "1",
  textAlign: "left",
}

export default Text
