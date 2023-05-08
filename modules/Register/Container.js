import { Box, styled, Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material"
import React, { useState,useEffect } from "react"
import {
  Button,
  Text,
  TextFieldInput,
  TextFieldInput_Password,
  Checkbox_Custom,
} from "../../components"
import useRegisterController from "./controller"
import { TermDialog, SuccessDialog } from "./View"
import bg from "../../public/water_mark_signup.png"

const Container = () => {
  const {
    control,
    formRules,
    termDialog,
    setTermDialog,
    termData,
    onSubmit,
    successDialog,
    setSuccessDialog,
    getValues,
    setValue,router
  } = useRegisterController()
  const check = getValues("rules1") && getValues("rules2") && getValues("rules3")


  //*********************Rules Co-op **********************/
  const [rules, setRules] = useState("Corporate")
  const handleChange = (event) => {
    setRules(event.target.value)
  }

  return (
    <>
      <TermDialog
        open={termDialog}
        term={<div dangerouslySetInnerHTML={{ __html: termData?.body }} />}
        handleClose={() => setTermDialog(false)}
        agree={()=>{setValue('rules3',true);setTermDialog(false)}}
        disagree={()=>{setValue('rules3',false);setTermDialog(false)}}
      />
      <SuccessDialog open={successDialog} handleClick={()=>router.push("/login")} handleClose={() => setSuccessDialog(false)} />
      <Main>
        <Main_Signup_Box>
          <Text type={32} fontWeight={700} color="white">
            Sign up
          </Text>
          {/* <FormControl>
            <RadioGroup row sx={{ width: "100%", gap: "150px" }} value={rules} onChange={handleChange}>
              <StyledFormControlLabel value="Personal" control={<StyledRadio />} label="Personal" />
              <StyledFormControlLabel value="Corporate" control={<StyledRadio />} label="Corporate" />
            </RadioGroup>
          </FormControl> */}
          <TextFieldInput name={"email"} control={control} label={"Email"} rules={formRules.email} />
          <TextFieldInput_Password name={"password"} control={control} label={"Password"} rules={formRules.password} />
          <TextFieldInput_Password
            name={"confirm_password"}
            control={control}
            label={"Re-enter password"}
            rules={formRules.confirm_password}
          />
          <Box padding={"6px"} display="flex" flexDirection="column" gap={"0px"}>
            <Checkbox_Custom
              name={"rules1"}
              control={control}
              label={"I agree to receive email updates from CERO Wallet"}
            />
            <Checkbox_Custom name={"rules2"} control={control} label={"I agree to share data for marketing purposes"} />
            <Checkbox_Custom
              name={"rules3"}
              control={control}
              label={"I agree to Terms & Conditions and Privacy Policy"}
              onClick={() => setTermDialog(true)}
            />
          </Box>
          <Button variant="contained_square_green" fullWidth onClick={onSubmit} disabled={!check}>
            {/* <Button variant="contained_square_green" fullWidth onClick={()=>setSuccessDialog(true)}> */}
            <Text type={16} fontWeight={600} color="white">
              Continue
            </Text>
          </Button>
        </Main_Signup_Box>
      </Main>
    </>
  )
}
export default Container

const Main = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "128px 0px 76px 0px",
  display: "flex",
  justifyContent: "center",
  background: "linear-gradient(167.96deg, #234157 0%, #387484 47.42%, #34A182 100%)",
  position: "relative",
})

const Main_Signup_Box = styled(Box)({
  width: "536px",
  display: "flex",
  flexDirection: "column",
  padding: "32px",
  gap: "16px",
  // justifyContent: "center",
  // alignItems: "center",
  position: "relative",
  background: "rgba(165, 218, 203, 0.1)",
  boxShadow: " 0px 16px 16px rgba(0, 0, 0, 0.16)",
  borderRadius: "4px",
})

const Main_bg = styled(Box)({
  backgroundImage: `url(${bg.src})`,
})

const StyledRadio = styled((props) => <Radio {...props} />)(({ theme }) => ({
  "&.Mui-checked": { color: "#1FA37C" },
  "&.MuiFormControlLabel-root ": {
    "& .MuiFormControlLabel-label": {
      color: "white",
    },
  },
}))

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(({ theme }) => ({
  ".MuiFormControlLabel-label": {
    color: "white",
    fontWeight: 700,
    fontSize: "16px",
  },
}))
