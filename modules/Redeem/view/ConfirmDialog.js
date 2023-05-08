import {
  Box,
  Container,
  styled,
  Divider,
  TextField,
  InputAdornment,
  MenuItem,
  Menu,
  ButtonBase,
  Dialog,
} from "@mui/material"
// import { Box } from "@mui/system"
import { Button, Text } from "../../../components"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { toCurrecyFormat } from "../../../utils/number"
import toUpper from "lodash/toUpper"
import { useMutationSwap } from "../../../adapter/mutation"

const ConfirmDialog = (props) => {
  const {push} = useRouter()
  const { opendialog, handleCloseConfirm, ceroAmount, tokenAmount } = props
  const { mutate } = useMutationSwap({
    onSuccess: (success) => {
      console.log(success)
      push('/wallet')
    },
  })

  const handlesubmit = () => {
    const payload = {
      sol_amount: parseFloat(ceroAmount),
    }
    mutate(payload)
  }

  return (
    <Dialog
      fullWidth
      onClose={handleCloseConfirm}
      // maxWidth={"sm"}
      open={opendialog}
      PaperProps={{ sx: { padding: "16px", maxWidth: "327px" } }}
    >
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="16px">
        <Text type="18" color="darkgreen" fontWeight={700}>
          Confirm Top-Up
        </Text>
        <Text type="14" color="gray666" fontWeight={500} textAlign="center">
          Confirm to redeem <br />
          from {ceroAmount} CERO <br />
          to {tokenAmount} GREEN?
        </Text>
        <Box display="flex" gap="12px" mt="8px" justifyContent="center" width="100%">
          <Button variant="contained_square_green" autoFocus sx={{ flex: "0 0 50%" }} onClick={handlesubmit}>
            <Text type="16" fontWeight={600} color="white">
              Yes
            </Text>
          </Button>
          <Button onClick={handleCloseConfirm} variant="outlined_square_2" sx={{ flex: "0 0 50%" }}>
            <Text type="16" fontWeight={600} color="primary">
              Cancel
            </Text>
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
export default ConfirmDialog
