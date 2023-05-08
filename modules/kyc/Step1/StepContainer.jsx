import { Box, Grid, styled } from "@mui/material"
import { TextField, Select, LaserInput, DatePickerForm } from "../../../components/Form"
import { Button } from "../../../components"
import React, { useEffect, useState } from "react"
import Text from "../../../components/Text"
import { useMutationUpdateProfileKyc } from "../../../adapter/mutation/account"
import { Controller, useForm } from "react-hook-form"
import { IDNumberInput } from "../../../components"
import dayjs from "dayjs"
import { TOCContent } from "./views"
import thaiIdCard from "thai-id-card"

const titleEng = [
  {
    key: "0",
    value: 0,
    display: "Mr.",
  },
  {
    key: "1",
    value: 1,
    display: "Ms.",
  },
  {
    key: "2",
    value: 2,
    display: "Mrs.",
  },
]

const titleTh = [
  {
    key: "0",
    value: 0,
    display: "นาย",
  },
  {
    key: "1",
    value: 1,
    display: "นางสาว",
  },
  {
    key: "2",
    value: 2,
    display: "นาง",
  },
]

const Step1 = (props) => {
  const { onNext } = props
  const [isShowToc, setIsShowToc] = useState(false)
  const [isAcceptToc, setIsAcceptToc] = useState(false)

  const { mutate } = useMutationUpdateProfileKyc({ onSuccess: () => onNext() })
  const { control, handleSubmit } = useForm()

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

  const formRules = {
    gender: {
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
  const handleSubmitUser = handleSubmit((val) => {
    if (!isShowToc) {
      setIsShowToc(true)
      return null
    }
    const Month_format = (val) => {
      switch (val) {
        case "01":
          return "Jan"
          break
        case "02":
          return "Feb"
          break
        case "03":
          return "Mar"
          break
        case "04":
          return "Apr"
          break
        case "05":
          return "May"
          break
        case "06":
          return "Jun"
          break
        case "07":
          return "Jul"
          break
        case "08":
          return "Aug"
          break
        case "09":
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
      // date_birth: val.date_birth?.format("YYYY-MM-DD"),
      // test: JSON.stringify(val.date_birth).slice(1, 11),
      // test2: JSON.stringify(dayjs().format()).slice(1, 11),
      // test3: DateFormat(val.date_birth),
      // test4: AgeCalc(DateFormat(val.date_birth)) ,
      id_card: val.id_card?.replaceAll("-", ""),
      laser_code: val.laser_code?.replaceAll("-", ""),
      is_accepted_kyc_consent: isAcceptToc,
    }
    mutate(payload)
  })

  const handleCancel = () => {
    window.history.back()
  }

  const MinDate = dayjs(dayjs().subtract(99, "year"))
  const MaxDate = dayjs(MinDate.add(99, "year"))

  const onClickCheckbox = () => {
    setIsAcceptToc(!isAcceptToc)
  }

  return isShowToc ? (
    <TOCContent
      isAcceptToc={isAcceptToc}
      handleCancel={() => {
        setIsShowToc(false)
      }}
      onClickCheckbox={onClickCheckbox}
      handleSubmitUser={handleSubmitUser}
    />
  ) : (
    <Box pt={4}>
      <Box pb={"10px"}>
        <Text color="gray900" type="14" fontWeight={500}>
          ENGLISH INFORMATION
        </Text>
      </Box>
      <Box pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={2}>
            <Controller
              name={"gender"}
              control={control}
              rules={formRules.gender}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Box>
                  <Select
                    isRequired
                    onChange={onChange}
                    value={value}
                    label="Name Title"
                    menus={titleEng}
                    placeholder="Title"
                    fullWidth
                    error={error}
                  />
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <TextField
              name={"first_name"}
              isRequired
              control={control}
              rules={formRules.first_name}
              label="English First Name  (As shown on ID)"
              placeholder="First Name"
              normalize={(val = "") => {
                return new RegExp(/^[a-zA-Z]*$/g).test(val)
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <TextField
              isRequired
              name={"last_name"}
              rules={formRules.last_name}
              control={control}
              normalize={(val = "") => {
                return new RegExp(/^[a-zA-Z]*$/g).test(val)
              }}
              label="English Last Name  (As shown on ID)"
              placeholder="Last Name"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
      <Box pb={"10px"}>
        <Text color="gray900" type="14" fontWeight={500}>
          THAI INFORMATION
        </Text>
      </Box>
      <Box pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={2}>
            <Box>
              <Controller
                name={"gender"}
                rules={formRules.gender}
                control={control}
                render={({ field: { value } }) => (
                  <Select
                    isRequired
                    menus={titleTh}
                    disabled
                    label="Name Title"
                    placeholder={titleTh.find((menu) => menu.value === value)?.display ?? "Title"}
                    fullWidth
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={5}>
            <TextField
              isRequired
              name={"first_name_thai"}
              rules={formRules.first_name_thai}
              control={control}
              label="Thai First Name  (As shown on ID) *"
              placeholder="First Name"
              fullWidth
              normalize={(val = "") => {
                return new RegExp(/^[ก-๙]+$/).test(val)
              }}
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <TextField
              isRequired
              label="Thai Last Name  (As shown on ID)*"
              placeholder="Last Name"
              rules={formRules.last_name_thai}
              fullWidth
              name={"last_name_thai"}
              control={control}
              normalize={(val = "") => {
                return new RegExp(/^[ก-๙]+$/).test(val)
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <DatePickerForm
              isRequired
              minDate={MinDate}
              maxDate={MaxDate}
              name="date_birth"
              placeholder="DD/MM/YYYY"
              label="Date of Birth"
              rules={formRules.date_birth}
              control={control}
            />
          </Grid>
        </Grid>
      </Box>
      <Box pb={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Controller
              name={"id_card"}
              control={control}
              rules={formRules.id_card}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <IDNumberInput isRequired error={error} onChange={onChange} value={value} label="ID Number" />
              )}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Controller
              name={"laser_code"}
              rules={formRules.laser_code}
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <LaserInput isRequired onChange={onChange} error={error} value={value} label="Laser Number" />
              )}
            />
          </Grid>
        </Grid>
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
          <Button fullWidth variant="contained" onClick={handleSubmitUser}>
            <Text color="white" type="20" fontWeight={700}>
              NEXT
            </Text>
          </Button>
        </ButtonFormWrapper>
      </Box>
    </Box>
  )
}

export default Step1

const ButtonFormWrapper = styled("div")({
  maxWidth: 173,
  width: "100%",
})
