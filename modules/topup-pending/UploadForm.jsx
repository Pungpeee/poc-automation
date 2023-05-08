import React, { useEffect } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { DatePickerForm, TimePickerForm } from "../../components/Form"
import { Box } from "@mui/system"
import { COLORS } from "../../theme"
import { Text } from "../../components"
import styled from "@emotion/styled"
import { toCurrecyFormat } from "../../utils/number"
import { Avatar } from "@mui/material"

const formRules = {
  time: {
    required: {
      value: true,
      message: "This field is required.",
    },
    minLength: {
      value: 5,
      message: "This field is invalid.",
    },
  },
  date: {
    required: {
      value: true,
      message: "This field is required.",
    },
  },
  payment_slip: {
    required: {
      value: true,
      message: "This field is required.",
    },
  },
}

const UploadForm = (props) => {
  const { thbAmount } = props
  const uploadForm = useFormContext()

  // useEffect(() => {
  //   uploadForm.register("payment_slip")
  // }, [uploadForm])

  const isHaveImage = uploadForm.watch("payment_slip")

  const handleChange = (e) => {
    const reader = new FileReader()

    reader.onload = (result) => {
      uploadForm.setValue("payment_slip", result.target.result)
    }

    reader.onabort = () => {}

    if (e.target.value) {
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <>
      <Box pb="24px">
        <Text color="primary" type="12">
          Receipt
        </Text>
        <Box
          gap="13px"
          alignItems="center"
          display="flex"
          borderRadius="15px"
          padding="12px 0px 12px 16px"
          border={`solid 1px ${COLORS.GRAY200}`}
        >
          <Avatar />
          <Box display="flex" flexDirection="column">
            <Text color="gray600" type="14">
              VEKIN (THAILAND) CO.,LTD
            </Text>
            <Text color="gray600" type="14">
              12347859050
            </Text>
          </Box>
        </Box>
      </Box>
      <Box pb="30px">
        <Divider />
        <Content>
          <Box pb="18px" pt={"18px"} justifyContent="space-between" display="flex">
            <Text type="18" fontWeight={700} color="black">
              AMOUNT
            </Text>
            <Box display="flex" gap="10px">
              <Text type="18" fontWeight={700} color="primary">
                {toCurrecyFormat(thbAmount ?? 0)}
              </Text>
              <Text type="18" color="black">
                THB
              </Text>
            </Box>
          </Box>
        </Content>
        <Divider />
      </Box>
      <Box display="flex" gap="18px" flexDirection="column">
        <DatePickerForm
          rules={formRules.date}
          name="date"
          placeholder="DD/MM/YYYY"
          label="Date"
          control={uploadForm.control}
        />
        <Controller
          name={"time"}
          rules={formRules.time}
          control={uploadForm.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TimePickerForm error={error} onChange={onChange} value={value} label="Time" />
          )}
        />
        <input
          accept="image/*"
          name="payment_slip"
          ref={{ ...uploadForm.register("payment_slip", formRules.payment_slip) }}
          onChange={handleChange}
          style={{ display: "none" }}
          id="image_slip"
          type="file"
          onClick={(event) => {
            event.target.value = null
          }}
        />
        {!isHaveImage ? (
          <label htmlFor="image_slip">
            <Text color="primary" type="12">
              Receipt
            </Text>
            <Box
              gap="4px"
              alignItems="center"
              flexDirection="column"
              display="flex"
              borderRadius="15px"
              padding="12px 0px 12px 16px"
              border={`solid 1px ${COLORS.GRAY200}`}
            >
              <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 0L9 17" stroke="#BFBBBA" />
                <path d="M0.5 8.5L17.5 8.5" stroke="#BFBBBA" />
              </svg>

              <Text type="14" color="gray400">
                Attach Slip
              </Text>
            </Box>
            {uploadForm.formState.errors?.payment_slip ? (
              <Text type="12" color={"red"} as="div">
                {uploadForm.formState.errors?.payment_slip?.message}
              </Text>
            ) : null}
          </label>
        ) : (
          <Box
            gap="4px"
            alignItems="center"
            flexDirection="column"
            display="flex"
            borderRadius="15px"
            padding="12px 0px 12px 16px"
            border={`solid 1px ${COLORS.GRAY200}`}
          >
            <img src={uploadForm.watch("payment_slip")} />
            <label htmlFor="image_slip" style={{ textAlign: "center" }}>
              <Text sx={{ textDecorationLine: "underline" }} type="16" color="gray600" textAlign="center">
                Reupload
              </Text>
            </label>
          </Box>
        )}
      </Box>
    </>
  )
}

export default UploadForm

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  background: COLORS.GRAY200,
})

const Content = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    padding: "0px 40px",
  },
}))
