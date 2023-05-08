import { Container, Grid, styled, Box } from "@mui/material"
import React, { Component, useState, useEffect, useMemo } from "react"
import { useAuthContext } from "../../contexts/auth/consume"
import { useQueryCarbonAcitivity, useQueryRank, useQueryprofile, useQueryMyRank } from "../../adapter/query"
import { Text, Button, Select } from "../../components"
import { rankType } from "../../utils/rank_type"
import { COLORS } from "../../theme"
import { CardItem } from "./View"
import Image from "next/image"
import { useRouter } from "next/router"
import { borderRadius, margin } from "@mui/system"
import Shopping_Logo from "../../public/Shopping_Logo"
import ProfileRank from "../../public/frame-top3/ProfileRank"
import HeroAnimation from "../../components/HeroAnimation"

const HomeController = () => {
  const { isAuth } = useAuthContext()
  const router = useRouter()
  const [Category, setCategory] = useState("all")
  const [seeVerified, setseeVerified] = useState()
  const [rankCurrent, setRankCurrent] = useState("main")
  const { data: activity } = useQueryCarbonAcitivity({})
  const [test, settest] = useState(3)

  const { data: rank } = useQueryRank({
    payload: {
      type: rankType[Category],
    },
  })

  const { data: myRank } = useQueryMyRank({})

  const { data: profile } = useQueryprofile({})

  const count = rank?.count

  const handleChangeCategory = (e) => {
    setCategory(e.target.value)
  }

  const handleChangeCurrent = (e) => {
    setRankCurrent(e.target.value)
  }

  const handleGoToKycPage = () => {
    router.push("/kyc")
  }

  return {
    isAuth,rank,myRank,profile,count
  }
}
