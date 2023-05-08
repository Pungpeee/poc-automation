import { Box, IconButton, Divider } from "@mui/material"
import React, { useEffect } from "react"
import { Text, Button } from "../../../components"
import { useQuery } from "react-query"
import { termApi } from "../../../apis"
import { EditProfileStyled } from "../styled"

const TermContainer = () => {
  const { TermBox, TermCard, DividerStyled } = EditProfileStyled()

  //*********************** GET Term and Policy ************************/

  const { data: termData } = useQuery("term-condition", () => {
    return termApi.getTermCondition({ page: 0 })
  })

  //********************************************************************/
  return (
    <TermBox>
      <Text type={20} fontWeight={700} color="white">
        Terms and Conditions
      </Text>
      <TermCard>{<div dangerouslySetInnerHTML={{ __html: termData?.body }} />}</TermCard>
      <DividerStyled light flexItem />
      <Text type={20} fontWeight={700} color="white">
        Privacy and Policy
      </Text>
      <TermCard>{<div dangerouslySetInnerHTML={{ __html: termData?.body }} />}</TermCard>
    </TermBox>
  )
}

export default TermContainer
