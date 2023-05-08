import { Box, IconButton, Divider, Dialog } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Text, Button, Test } from "../../../components"
import { useMutation } from "react-query"
import { requestWithCredential } from "../../../apis/client"
import { useQueryBalance } from "../../../adapter/query"
import { EditProfileStyled } from "../styled"
import { useForm, Controller } from "react-hook-form"
import Image from "next/image"

const DelAccContainer = ({ setConfirmDeleteDialog }) => {
  const { TermBox, BoxWrapper, PasswordTextField, InputTextField } = EditProfileStyled()
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const { control, handleSubmit } = useForm()
  //===============================================
  const { data: profile } = useQueryBalance({})
  //===============================================
  const { mutate } = useMutation(
    () => {
      return requestWithCredential.post("/api/account/delete/request/")
    },
    {
      onSuccess: (success) => {
        setConfirmDeleteDialog(true)
        window.location.href = "/"
      },
    }
  )
  //===============================================
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleSubmitUser = handleSubmit((val) => {
    // console.log(val.password)
    handleOpen()
  })

  return (
    <>
      <DeleteConfirmDialog profile={profile} deleteReq={mutate} handleClose={handleClose} open={open} />
      <TermBox>
        <BoxWrapper>
          <Text type={20} fontWeight={700} color="white">
            Delete Account
          </Text>
          <Text type={14} fontWeight={400} color="green040">
            Enter your current password to delete your account and account data. Your request will be sent to your
            registered email for re-verification delete.
          </Text>
        </BoxWrapper>
        <Controller
          name={"password"}
          defaultValue={""}
          control={control}
          // rules={{ pattern: { value: /[a-zA-Z]+/g, message: "error" } }}
          render={({ field, fieldState: { error }, formState: { errors } }) => {
            const test = (e) => {
              const val = e.target.value
              field.onChange(val)
            }
            return (
              <PasswordTextField
                {...field}
                onChange={test}
                toggleVisible={toggleVisible}
                visible={visible}
                label="Current password"
                variant="filled"
                sx={{visibility: 'hidden'}}
              />
            )
          }}
        />

        <Button variant="contained_square_green" sx={{ width: "211.5px" }} onClick={handleSubmitUser}>
          <Text type={16} fontWeight={600} color="white">
            Continue
          </Text>
        </Button>
      </TermBox>
    </>
  )
}

export default DelAccContainer

const DeleteConfirmDialog = ({ profile, handleClose, open, deleteReq }) => {
  const solBalance = profile?.wallet.sol.balance
  const bscBalance = profile?.wallet.sol.balance
  const sum = solBalance + bscBalance
  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      // maxWidth={"md"}
      open={open}
      PaperProps={{
        sx: {
          width: "419px",
          height: "353px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "8px",
          background: "#ffffff",
          boxShadow: "0px 16px 16px rgba(0, 0, 0, 0.16)",
          borderRadius: "8px",
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        padding="24px 16px"
        gap="16px"
        justifyContent="center"
        alignItems="center"
      >
        <Image src="/DelAccIcon.svg" alt="" width="60px" height="60px" />
        <Box display="flex" flexDirection="column" padding="0px" gap="8px" alignItems="center">
          <Text type={18} fontWeight={700} color="error100">
            Delete an account?
          </Text>
          <Text type={14} fontWeight={700} color="gray666" textAlign="center">
            You have&nbsp;
            <Text type={14} fontWeight={600} color="green100">
              {sum} CERO
            </Text>
            &nbsp;in your wallet. If you delete the account, you will be unable to restore your coin in the future.
          </Text>
          <Text type={14} fontWeight={700} color="gray666" textAlign="center">
            Please confirm at&nbsp;
            {/* {profile?.email}  */}
            <Text type={14} fontWeight={600} color="gray666">
              {profile?.email}
            </Text>
            &nbsp;to delete this account
          </Text>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" padding="0px 8px 8px" gap="8px">
        <Button variant="contained_square_red" sx={{ width: "50%" }} onClick={deleteReq}>
          <Text type={16} fontWeight={600} color="white">
            Delete
          </Text>
        </Button>
        <Button variant="outlined_square_2" sx={{ width: "50%" }} onClick={handleClose}>
          <Text type={16} fontWeight={600} color="green100">
            Discard
          </Text>
        </Button>
      </Box>
    </Dialog>
  )
}
