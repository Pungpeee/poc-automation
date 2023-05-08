import { Box, IconButton, Divider, styled,} from "@mui/material"
import React, { useEffect } from "react"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import { Text, Button, TextFieldInput_Password, TextFieldPassword } from "../../../components"
import { useQuery } from "react-query"
import { termApi } from "../../../apis"
import { EditProfileStyled } from "../styled"
import { formValidate } from "../../../utils/formValidate"
import { useForm, Controller } from "react-hook-form"
import Image from "next/image"

const ChangePasswordContainer = ({ watch, control, getValues, handleSubmit }) => {
  const { TermBox, TermCard, DividerStyled } = EditProfileStyled()
  // const { control, handleSubmit, getValues } = useForm()
  const formRules = formValidate(getValues)
  const test = getValues("current_password")

  const {
    password: { validate },
  } = formRules

  const handleSubmitUser = handleSubmit((val) => {
    const payload = {
      current_password: val.current_password,
    }
    console.log(payload)
  })

  return (
    <TermBox>
      <Box display="flex" flexDirection="column" gap="8px">
        <Text type={20} fontWeight={700} color="white">
          Change password {watch("current_password")}
        </Text>
        <Text type={14} fontWeight={400} color="green040">
          Your phone number will be used to receive verification message
        </Text>
      </Box>
      <Box width="333px" display="flex" flexDirection="column" gap="16px">
        {/* <Controller
          name={"test"}
          control={control}
          rules={formRules.gender}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Box>
              <input onChange={onChange} value={value} autoFocus/>
            </Box>
          )}
        /> */}
        <TextFieldInput_Password
          name={"current_password"}
          control={control}
          label={"Current Password"}
          rules={formRules.currentPassword}
        />
        <DividerStyled light flexItem />
        <TextFieldInput_Password
          name={"new_password"}
          control={control}
          label={"New password"}
          rules={formValidate.password}
        />
        <Box display="flex" alignItems={"center"} gap="6px">
          <Text type={12} fontWeight={500} color="white" sx={{ width: "193px" }}>
            Password strength :&nbsp;
            <Text type={12} fontWeight={700} color="white">
              {"Normal"}
            </Text>
          </Text>
          <Box height="8px" width="108px" display="flex" gap="4px">
            <Box width="25%" height="100%" sx={{ background: "#00FFB7" }}></Box>
            <Box width="25%" height="100%" sx={{ background: "#00FFB7" }}></Box>
            <Box width="25%" height="100%" sx={{ background: "#00FFB7" }}></Box>
            <Box width="25%" height="100%" sx={{ background: "#00FFB7" }}></Box>
          </Box>
          <HtmlTooltip
            arrow
            title={
              <Box display="flex" flexDirection="column" gap="8px">
                <Text type={12} fontWeight={500} color="black">
                  Password must include:
                </Text>
                <Box display="flex" gap="8px" alignItems="center">
                  <Image src="/change_password_check_icon.svg" alt="" width="20px" height="20px" />
                  <Text type={12} fontWeight={500} color="black">
                    8-20 Characters {test ? "555" : "666"}
                  </Text>
                </Box>
                <Box display="flex" gap="8px" alignItems="center">
                  <Image src="/change_password_false_icon.svg" alt="" width="20px" height="20px" />
                  <Text type={12} fontWeight={600} color="black">
                    At least one capital letter
                  </Text>
                </Box>
                <Box display="flex" gap="8px" alignItems="center">
                  <Image src="/change_password_check_icon.svg" alt="" width="20px" height="20px" />
                  <Text type={12} fontWeight={500} color="black">
                    At least one capital letter
                  </Text>
                </Box>
                <Box display="flex" gap="8px" alignItems="center">
                  <Image src="/change_password_false_icon.svg" alt="" width="20px" height="20px" />
                  <Text type={12} fontWeight={600} color="black">
                    At least one number
                  </Text>
                </Box>
              </Box>
            }
            placement="top"
          >
            <IconButton>
              <Image src="/change_password_tip_icon.svg" alt="" width="20px" height="20px" />
            </IconButton>
          </HtmlTooltip>
        </Box>
        <TextFieldInput_Password
          name={"confirm_new_password"}
          control={control}
          label={"Re-enter Password"}
          rules={formValidate.password}
        />
      </Box>
      <Box display="flex" width="333px" gap="8px">
        <Button variant="contained_square_green" sx={{ width: "50%" }} onClick={handleSubmitUser}>
          <Text color="white" type="16" fontWeight={600}>
            Save
          </Text>
        </Button>
        <Button variant="outlined_square" sx={{ width: "50%" }}>
          <Text color="white" type="16" fontWeight={600}>
            Reset
          </Text>
        </Button>
      </Box>
    </TermBox>
  )
}

export default ChangePasswordContainer

const PasswordStrength = ({ newPassword, validate }) => {
  return (
    <Box display="flex" alignItems={"center"} gap="6px">
      <Text type={12} fontWeight={500} color="white" sx={{ width: "193px" }}>
        Password strength :&nbsp;
        <Text type={12} fontWeight={700} color="white">
          {"Normal"}
        </Text>
      </Text>
      <Box height="8px" width="108px" display="flex" gap="4px">
        <Box width="25%" height="100%" sx={{ background: "#00FFB7" }}></Box>
        <Box width="25%" height="100%" sx={{ background: "#00FFB7" }}></Box>
        <Box width="25%" height="100%" sx={{ background: "#00FFB7" }}></Box>
        <Box width="25%" height="100%" sx={{ background: "#00FFB7" }}></Box>
      </Box>
      <HtmlTooltip
        arrow
        title={
          <Box display="flex" flexDirection="column" gap="8px">
            <Text type={12} fontWeight={500} color="black">
              Password must include:
            </Text>
            <Box display="flex" gap="8px" alignItems="center">
              <Image src="/change_password_check_icon.svg" alt="" width="20px" height="20px" />
              <Text type={12} fontWeight={500} color="black">
                8-20 Characters {validate.minimum(newPassword) ? "1" : "2"}
              </Text>
            </Box>
            <Box display="flex" gap="8px" alignItems="center">
              <Image src="/change_password_false_icon.svg" alt="" width="20px" height="20px" />
              <Text type={12} fontWeight={600} color="black">
                At least one capital letter
              </Text>
            </Box>
            <Box display="flex" gap="8px" alignItems="center">
              <Image src="/change_password_check_icon.svg" alt="" width="20px" height="20px" />
              <Text type={12} fontWeight={500} color="black">
                At least one capital letter
              </Text>
            </Box>
            <Box display="flex" gap="8px" alignItems="center">
              <Image src="/change_password_false_icon.svg" alt="" width="20px" height="20px" />
              <Text type={12} fontWeight={600} color="black">
                At least one number
              </Text>
            </Box>
          </Box>
        }
        placement="top"
      >
        <IconButton>
          <Image src="/change_password_tip_icon.svg" alt="" width="20px" height="20px" />
        </IconButton>
      </HtmlTooltip>
    </Box>
  )
}

const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      padding: "16px",
      borderRadius: "16px",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: "white",
    },
  })
)
