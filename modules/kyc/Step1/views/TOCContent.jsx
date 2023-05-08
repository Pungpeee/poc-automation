import styled from "@emotion/styled"
import { Checkbox, FormControlLabel } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { Button, Card, Text } from "../../../../components"
import { COLORS } from "../../../../theme"
import { useQuery } from "react-query"
import { termApi } from "../../../../apis"

const TOCContent = (props) => {
  const { isAcceptToc, handleCancel, handleSubmitUser, onClickCheckbox } = props
  const { data: termData } = useQuery("term-condition", () => {
    return termApi.getTermCondition({ page: 0 })
  })

  return (
    <>
      <Box pb="29px">
        <Card
          sx={{
            borderRadius: "30px",
            border: `solid 1px ${COLORS.GRAY200}`,
            padding: "24px",
            height: "500px",
            marginTop: "24px",
            overflowY:'scroll'
          }}
        >{<div dangerouslySetInnerHTML={{ __html: termData?.body }} />}</Card>
      </Box>
      <Box display="flex" alignItems="center" mb="27px">
        <FormControlLabel
          onChange={onClickCheckbox}
          control={
            <Checkbox
              sx={{
                color: COLORS.GRAY200,
                "&.Mui-checked": {
                  color: COLORS.PRIMARY_COLOR,
                },
              }}
              checked={isAcceptToc}
            />
          }
          label={
            <Text type="16" color="black">
              I accept term and conditions
            </Text>
          }
        />
      </Box>
      <Box display="flex" gap={2} justifyContent="center">
        <ButtonFormWrapper>
          <Button fullWidth variant="outlined" onClick={handleCancel}>
            <Text color="primary" type="20" fontWeight={700}>
              CANCEL
            </Text>
          </Button>
        </ButtonFormWrapper>
        <ButtonFormWrapper>
          <Button disabled={!isAcceptToc} fullWidth variant="contained" onClick={handleSubmitUser}>
            <Text color="white" type="20" fontWeight={700}>
              NEXT
            </Text>
          </Button>
        </ButtonFormWrapper>
      </Box>
    </>
  )
}

export default TOCContent

const ButtonFormWrapper = styled("div")({
  maxWidth: 173,
  width: "100%",
})
