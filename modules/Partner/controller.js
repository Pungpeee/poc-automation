import { Container as ContainerMUI, Grid, styled, Box, TextField, Checkbox, useTheme } from "@mui/material"
import ButtonBase from "@mui/material/ButtonBase"
import React, { Component, useState, useEffect, useCallback } from "react"
import { Text, Button, Select } from "../../components"
import { useForm, Controller } from "react-hook-form"
import { useMutationSendEmailPartner } from "./../../adapter/mutation"
import isEmpty from "lodash/isEmpty"
// import { formValidate } from "../../utils/formValidate"

const PartnerController = () => {
  const [state, setState] = useState(1)
  const [number, setNumber] = useState()
  const theme = useTheme()
  const { control, handleSubmit, getValues } = useForm()

  const { mutate } = useMutationSendEmailPartner({
    onSuccess: (s) => {
      setState(2)
    },
  })

  const handleSend = handleSubmit((formValues) => {
    const payload = {
      subject: "Partner with us",
      body: `จาก: email: ${formValues.email} \n name: ${formValues.name} \n tel: ${number} \n company: ${formValues.company} \n detail: ${formValues.details} ขอเข้าร่วมโครงการ cero`,
    }
    mutate(payload)
  })

  const handleChangeNumber = (val) => {
    const isMatchedRegex = new RegExp(/^(\d*|(\d)+([.]\d))?$/g).test(val)
    const isMatchedHaveNumber = new RegExp(/[0-9]/g).test(val)
    if (!isMatchedRegex) {
      return setNumber("")
    }
    if (!isMatchedHaveNumber || isEmpty(val)) {
      return setNumber("")
    }
    if (val.length > 10) return
    setNumber(val)
  }

  return {
    state,
    formRules: PartnerFormValidate(getValues, number),
    setState,
    control,
    handleSend,
    theme,
    number,
    handleChangeNumber,
  }
}

export default PartnerController

export const PartnerFormValidate = (getValues, number) => {
  return {
    email: {
      required: {
        value: true,
        message: "This field is required",
      },
      pattern: {
        value: /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        message: "This field is invalid",
      },
    },
    name: {
      required: {
        value: true,
        message: "This field is required",
      },
    },
    company: {
      required: {
        value: true,
        message: "This field is required",
      },
    },
    number: {
      // required: {
      //   value: true,
      //   message: "This field is reddddddquired",
      // },
      validate: (value) => {
        if (number) {
          return true
        }
        return "This field is required"
      },
    },
  }
}
