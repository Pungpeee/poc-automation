import { Container, Grid, styled, Box, useTheme } from "@mui/material"
import React, { Component, useState, useEffect } from "react"
import { Text, Button, Select } from "../../../components"
import Image from "next/image"

const Banner = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundImage: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
      }}
    >
      <Box
        display="flex"
        height="546px"
        sx={{
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            height: "auto",
          },
        }}
      >
        <Box
          width="100%"
          height="546px"
          flex="0 0 55%"
          display="flex"
          justifyContent="flex-end"
          sx={{
            [theme.breakpoints.down("md")]: {
              justifyContent: "center",
            },
          }}
        >
          <Image src="/Group_NFT_2.png" width="753px" height="546px" />
        </Box>
        <Box
          width="100%"
          height="546px"
          display="flex"
          alignItems="center"
          alignContent="center"
          justifyContent="flex-start"
          flex="0 0 45%"
          sx={{
            [theme.breakpoints.down("md")]: {
              justifyContent: "center",
            },
          }}
        >
          <Box
            width="536px"
            height="283px"
            display="flex"
            justifyContent="flex-start"
            alignContent="center"
            alignItems="center"
            // sx={{background:'red'}}
            sx={{
              [theme.breakpoints.down("md")]: {
                justifyContent: "center",
                width:'auto'
              },
            }}
          >
            <Box width="350px" height="254px" display="flex" flexDirection="column" sx={{
            [theme.breakpoints.down("ex_sm")]: {
             width:'230px'
            },
          }}>
              <Text type={28} fontWeight={700} color="white">
                Explore NFTs <br /> world with us
              </Text>
              <Text type={14} fontWeight={500} margin="2px" color="white">
                Empower to play to earn carbon saving in different aspects of daily lives and reward users for taking
                green activity.
              </Text>
              <Button variant="outlined_square" fullWidth sx={{ marginTop: "20px" }}>
                <Text type="20" fontWeight={700} color="primary">
                  Explore Now
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Banner
