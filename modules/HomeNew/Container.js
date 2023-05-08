import { Container, Grid, styled, Box, Stack } from "@mui/material"
import React, { Component, useState, useEffect, useMemo } from "react"
import { useAuthContext } from "../../contexts/auth/consume"
import {
  useQueryCarbonAcitivity,
  useQueryCarbonBalance,
  useQueryRank,
  useQueryprofile,
  useQueryMyRank,
} from "../../adapter/query"
import { Text, Button, Select } from "../../components"
import { rankType } from "../../utils/rank_type"
import { COLORS } from "../../theme"
import { CardItem } from "./View"
import Image from "next/image"
import { useRouter } from "next/router"
import Shopping_Logo from "../../public/Shopping_Logo"
import ProfileRank from "../../public/frame-top3/ProfileRank"
import HeroAnimation from "../../components/HeroAnimation"

const HomeContainer = (props) => {
  return <LeaderboardWrapper></LeaderboardWrapper>
}

export default HomeContainer

export const RankDisplay = ({ rank, name, email, img, carbon,isme}) => {
  return (
    <RankWrapper isme={isme}>
      <RankWrapper_1>
        {rank < 4 ? (
          <BadgeWrapper>
            <Image src={`/new_home/leaderboard/badge_${rank}.svg`} layout="fill" />
          </BadgeWrapper>
        ) : (
          <RankDisplayWrapper>
            <Text type={20} mobileType={12} mobileFontWeight={700} fontWeight={900} color="#00664E">
              {rank}
            </Text>
          </RankDisplayWrapper>
        )}
        {img !== "" ? (
          <ImgWrapper>
            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/media/${img}`} alt="" layout="fill" />
          </ImgWrapper>
        ) : (
          <NameIcon>
            <Text type={20} mobileType={12} mobileFontWeight={700} fontWeight={900} color="#00664E">
              {name == "" ? email?.slice(0, 1) : name?.slice(0, 1)} 
            </Text>
          </NameIcon>
        )}
        <RankWrapper_1_TextWrapper>
          <Text type={20} mobileType={12} mobileFontWeight={700} fontWeight={900} color="#00664E">
            {name =="" ? email : name?.length > 15 ? `${name?.slice(0,14)}..`: name}  
          </Text>
        </RankWrapper_1_TextWrapper>
      </RankWrapper_1>
      <RankWrapper_2>
        <CompanyWrapper>
          <Shopping_Logo />
        </CompanyWrapper>
        <Text
          as={"div"}
          width={175}
          mobileWidth={100}
          textAlign={"right"}
          type={20}
          mobileType={12}
          mobileFontWeight={700}
          fontWeight={900}
          color=" #59B29F"
        >
          {carbon?.toFixed(3)} KGCO2
        </Text>
      </RankWrapper_2>
    </RankWrapper>
  )
}

const LeaderboardWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "960px",
  display: "flex",
  flexDirection: "column",
  padding: "32px",
  gap: " 16px",
  [theme.breakpoints.down("sm")]: {
    padding: "8px",
    gap: "8px",
  },
}))

const RankWrapper = styled(Box)(({ theme ,isme}) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px",
  background: isme ? 'rgba(0, 0, 0, 0.3)':''
}))

const RankWrapper_1 = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  [theme.breakpoints.down("sm")]: {
    gap: "4px",
  },
}))

const RankWrapper_2 = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  [theme.breakpoints.down("sm")]: {
    gap: "8px",
  },
}))

const RankWrapper_1_TextWrapper = styled(Box)(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  [theme.breakpoints.down("ex_sm")]: {
    display:'none'
  },
}))

const BadgeWrapper = styled(Box)(({ theme }) => ({
  height: "40px",
  width: "40px",
  position: "relative",
  filter: "drop-shadow(0px 16px 24px rgba(0, 102, 78, 1))",
  [theme.breakpoints.down("sm")]: {
    height: "20px",
    width: "20px",
  },
}))

const RankDisplayWrapper = styled(Box)(({ theme }) => ({
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  position: "relative",
  filter: "drop-shadow(0px 16px 24px rgba(0, 102, 78, 1))",
  [theme.breakpoints.down("sm")]: {
    height: "20px",
    width: "20px",
  },
}))

const ImgWrapper = styled(Box)(({ theme }) => ({
  height: "60px",
  width: "60px",
  border: "5px solid #59B29F",
  overflow: "hidden",
  position: "relative",
  borderRadius: "100%",
  [theme.breakpoints.down("sm")]: {
    height: "30px",
    border: "2px solid #59B29F",
    width: "30px",
  },
}))

const NameIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "60px",
  width: "60px",
  background: "#59B29F",
  border: "5px solid #59B29F",
  overflow: "hidden",
  position: "relative",
  borderRadius: "100%",
  [theme.breakpoints.down("sm")]: {
    height: "30px",
    border: "2px solid #59B29F",
    width: "30px",
  },
}))

const CompanyLogoWrapper = styled(Box)(() => {})

const CompanyWrapper = styled(Box)(({ theme }) => ({
  // background:"rgba(51, 51, 51, 0.5)",
  [theme.breakpoints.down("sm")]: {
    // height: "22px",
    scale: "60%",
    // width: "22px",
  },
}))
