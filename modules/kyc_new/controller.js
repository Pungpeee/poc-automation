import { Controller, useForm } from "react-hook-form"
import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import thaiIdCard from 'thai-id-card'

export const step1Controller = () => {
  //******************* State *******************************/
  const [activeStep, setActiveStep] = useState(0)

  //******************* Function ****************************/
  const { control, handleSubmit, reset, setValue, watch, getValues, setError } = useForm()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const AgeCalc = (dateString) => {
    var today = new Date()
    var birthDate = new Date(dateString)
    var age = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const DateFormat = (val) => {
    let Year = JSON.stringify(val).slice(1, 5)
    let Month = JSON.stringify(val).slice(6, 8)
    let Day = JSON.stringify(val).slice(9, 11)
    return `${Year}/${Month}/${Day}`
  }
  const handleSubmitUser = handleSubmit((val) => {
    const Month_format = (val) => {
      switch (val) {
        case "1":
          return "Jan"
          break
        case "2":
          return "Feb"
          break
        case "3":
          return "Mar"
          break
        case "4":
          return "Apr"
          break
        case "5":
          return "May"
          break
        case "6":
          return "Jun"
          break
        case "7":
          return "Jul"
          break
        case "8":
          return "Aug"
          break
        case "9":
          return "Sep"
          break
        case "10":
          return "Oct"
          break
        case "11":
          return "Nov"
          break
        case "12":
          return "Dec"
          break
      }
    }
    const Year = JSON.stringify(val.date_birth).slice(1, 5)
    const Month = JSON.stringify(val.date_birth).slice(6, 8)
    const Day = JSON.stringify(val.date_birth).slice(9, 11)
    const Hour = JSON.stringify(val.date_birth).slice(12, 14)
    const Minute = JSON.stringify(val.date_birth).slice(15, 17)
    const Date_format = `${Day} ${Month_format(Month)} ${Year}, ${Hour}:${Minute}`
    const payload = {
      ...val,
      date_birth: Date_format,
      id_card: val.id_card,
      laser_code: val.laser_code?.replaceAll("-", ""),
      is_accepted_kyc_consent: true,
    }
    console.log(payload)
    // mutate(payload)
  })

  const MinDate = dayjs(dayjs().subtract(99, "year"))
  const MaxDate = dayjs(MinDate.add(99, "year"))

  //***********************Form Rules ********************************************/

  const formRules = {
    title: {
      required: {
        value: true,
        message: "This field is required.",
      },
    },
    ["first_name"]: {
      required: {
        value: true,
        message: "This field is required.",
      },
    },
    ["last_name"]: {
      required: {
        value: true,
        message: "This field is required.",
      },
    },
    ["first_name"]: {
      required: {
        value: true,
        message: "This field is required.",
      },
    },
    ["first_name_thai"]: {
      required: {
        value: true,
        message: "This field is required.",
      },
    },
    ["last_name_thai"]: {
      required: {
        value: true,
        message: "This field is required.",
      },
    },

    ["date_birth"]: {
      required: {
        value: true,
        message: "This field is required.",
      },
      validate: {
        verify_more_than_20yrs: (v) => AgeCalc(DateFormat(v)) >= 20 || "You must be over 20 years old",
      },
    },

    ["id_card"]: {
      required: {
        value: true,
        message: "This field is required.",
      },
      minLength: {
        value: 17,
        message: "This field is invalid.",
      },
      validate: {
        verify_idcard: (v) => thaiIdCard.verify(v.replaceAll("-", "")) || "ID card did not correct",
      },
    },
    ["laser_code"]: {
      required: {
        value: true,
        message: "This field is required.",
      },
      minLength: {
        value: 13,
        message: "This field is invalid.",
      },
    },
  }
  return {
    //************* State **************/
    activeStep,
    //******************************** */
    control,
    MinDate,
    MaxDate,
    getValues,
    handleNext,
    handleBack,
    handleSubmitUser,
    formRules
  }
}
