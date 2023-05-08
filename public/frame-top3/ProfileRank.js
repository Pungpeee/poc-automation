import Image from "next/image"
import { Container, Grid, styled, Box, useTheme } from "@mui/material"

export default function ProfileRank({ frame, profile, children }) {
  const theme = useTheme()
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      height="112px"
      sx={{
        [theme.breakpoints.down("md")]: {
          scale: "60%",
        },
        [theme.breakpoints.down("sm")]: {
          scale: "35%",
        },
        [theme.breakpoints.down("ex_sm")]: {
          scale: "25%",
        },
        scale: "70%",
      }}
    >
      <Box
        display="flex"
        justifyContent="center "
        // width='112px' height='112px'
      >
        <img
          src={`/frame-top3/frame_${frame}_rank.svg`}
          alt=""
          width="340px"
          height="auto"
          style={{
            [theme.breakpoints.down("sm")]: {
              top: "-50px",
            },
            position: "absolute",
            top: "-160px",
            paddingRight: frame === 1 ? "0" : "5px",
            paddingLeft: frame === 1 ? "37.5px" : "0",
          }}
        />
        {profile ? (
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/media/${profile}`}
            alt=""
            width="117"
            height="117"
            style={{
              top: "-65px",
              position: "absolute",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          children
        )}
      </Box>
    </Box>
  )
}
