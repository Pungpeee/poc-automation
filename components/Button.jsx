import { Button as ButtonMui, styled } from "@mui/material"
import { COLORS } from "../theme"
import { PRIMARY_COLOR, SECONDARY_HOVER } from "../theme/color"

const BtnSize = {
  medium: {
    padding: "10px 24px",
    height: "48px",
  },
  small: {
    padding: "8.33px 24px",
    height: "40px",
  },
}

export const StylesCustom = ({ bgColor, borderColor } = {}) => ({
  contained_rounded: {
    borderRadius: "30px",
    backgroundColor: bgColor ?? COLORS.PRIMARY_COLOR,
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: bgColor ?? COLORS.SECONDARY_HOVER,
    },
    "&:disabled": {
      backgroundColor: bgColor ?? COLORS.GRAY400,
    },
  },

  contained_square_green: {
    borderRadius: "8px",
    backgroundColor: bgColor ?? COLORS.GREEN100,
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: bgColor ?? COLORS.GREEN_PROFILE,
    },
    "&:disabled": {
      backgroundColor: bgColor ?? COLORS.GRAY400,
    },
  },

  contained_square_red: {
    borderRadius: "8px",
    backgroundColor: bgColor ?? COLORS.RED,
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: bgColor ?? COLORS.RED_HOVER,
    },
    "&:disabled": {
      backgroundColor: bgColor ?? COLORS.GRAY400,
    },
  },

  contained_square: {
    borderRadius: "8px",
    backgroundColor: bgColor ?? COLORS.PRIMARY_COLOR,
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: bgColor ?? COLORS.SECONDARY_HOVER,
    },
    "&:disabled": {
      backgroundColor: bgColor ?? COLORS.GRAY400,
    },
  },
  outlined_rounded: {
    borderRadius: "30px",
    border: `2px solid ${borderColor ?? COLORS.PRIMARY_COLOR}`,
    boxSizing: "border-box",
    "&:hover": {
      borderColor: borderColor ?? COLORS.SECONDARY_HOVER,
    },
    "&:disabled": {
      borderColor: borderColor ?? COLORS.GRAY400,
    },
  },
  outlined_pay_rounded: {
    borderRadius: "30px",
    padding: "2px",
    height: 20,
    border: `1px solid ${borderColor ?? COLORS.ORANGE}`,
    boxSizing: "border-box",
    "&:disabled": {
      borderColor: borderColor ?? COLORS.GRAY400,
    },
  },
  outlined_square: {
    borderRadius: "4px",
    border: `2px solid ${borderColor ?? COLORS.PRIMARY_COLOR}`,
    boxSizing: "border-box",
    "&:hover": {
      borderColor: borderColor ?? COLORS.SECONDARY_HOVER,
    },
    "&:disabled": {
      borderColor: borderColor ?? COLORS.GRAY400,
    },
  },
  outlined_square_2: {
    borderRadius: "8px",
    padding: "0px",
    minWidth: "10px",
    border: `2px solid ${borderColor ?? COLORS.PRIMARY_COLOR}`,
    boxSizing: "border-box",
    "&:hover": {
      borderColor: borderColor ?? COLORS.SECONDARY_HOVER,
    },
    "&:disabled": {
      borderColor: borderColor ?? COLORS.GRAY400,
    },
  },
  outlined_square_white: {
    borderRadius: "8px",
    border: `2px solid ${borderColor ?? COLORS.WHITE}`,
    boxSizing: "border-box",
    "&:hover": {
      borderColor: borderColor ?? COLORS.SECONDARY_HOVER,
    },
    "&:disabled": {
      borderColor: borderColor ?? COLORS.GRAY400,
    },
  },
  contained_square_green: {
    borderRadius: "8px",
    backgroundColor: bgColor ?? COLORS.PRIMARY_COLOR,
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: bgColor ?? COLORS.SECONDARY_HOVER,
    },
    "&:disabled": {
      backgroundColor: bgColor ?? COLORS.GRAY400,
    },
  },

  contained_square_green_partner: {
    borderRadius: "8px",
    textTransform:'none',
    width: "160px",
    height: "48px",
    backgroundColor: "#1FA37C",
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: "#1FA37C",
    },
    "&:disabled": {
      backgroundColor: bgColor ?? COLORS.GRAY400,
    },
  },

  contained_square_green_partner_2: {
    borderRadius: "8px",
    marginTop:'16px',
    textTransform:'none',
    width: "314px",
    height: "48px",
    backgroundColor: "#1FA37C",
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: "#1FA37C",
    },
    "&:disabled": {
      backgroundColor: bgColor ?? COLORS.GRAY400,
    },
  },
  contained_square_redeem: {
    borderRadius: "8px",
    textTransform:'none',
    width: "279px",
    height: "48px",
    backgroundColor: "#1FA37C",
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: "#1FA37C",
    },
    "&:disabled": {
      backgroundColor: bgColor ?? COLORS.GRAY400,
    },
  },
})

const ButtonStyled = styled(ButtonMui)(({ size, variant, ...rest }) => ({
  ...BtnSize[size],
  borderRadius: "30px",
  backgroundColor: variant === "contained" && PRIMARY_COLOR,
  border: variant === "outlined" && `1px solid ${PRIMARY_COLOR}`,
  "&:hover": {
    backgroundColor: variant === "contained" && SECONDARY_HOVER,
    border: variant === "outlined" && `1px solid ${PRIMARY_COLOR}`,
  },
  "&:disabled": {
    backgroundColor: variant === "contained" && COLORS.GRAY400,
  },
  ...BtnSize[size],
  ...StylesCustom(rest)[variant],
}))

ButtonStyled.defaultProps = {
  size: "medium",
}

export default ButtonStyled
