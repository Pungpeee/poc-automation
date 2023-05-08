import { Box, IconButton } from "@mui/material"
import React, { useEffect } from "react"
import { Text, TextFieldInput_Password, Button } from "../../components"
import Image from "next/image"
import { Controller } from "react-hook-form"
import { EditController } from "./controller"
import { NumberDialogController } from "./View/controller"
import { NumberDialog, TermContainer, DelAccContainer,HelpSupContainer  } from "./View"
import ImageUploading from "react-images-uploading"
import { EditProfileStyled } from "./styled"
import clsx from "clsx"

const {
  Main,
  MainBox,
  KycDisplay,
  MainDisplay,
  ButtonBox,
  EditButton,
  DividerStyled,
  ProfileBox,
  NameIcon,
  InputTextField,
  InputTextFieldNumber,
  EmailAlert,
  ImageWrapper,
  FooterButton,
  Kyc_Check_Unverify,
  Kyc_Check_Verify,
  Kyc_Check_Inreview,
  Success_Label,
  Button_Display,
  TermBox,
  TermCard,
  HtmlTooltip,
} = EditProfileStyled()

const profileButton = [
  {
    label: "Profile setting",
    value: "profile",
  },
  {
    label: "Change password",
    value: "cPassword",
  },
  {
    label: "Change language",
    value: "cLanguage",
  },
  {
    label: "Help & Support",
    value: "helpAndSupport",
  },
  {
    label: "Term & Conditions",
    value: "termAndCondition",
  },
  {
    label: "Delete account",
    value: "deleteAccount",
  },
]

const PwdStrength = {
  0: "-",
  1: "Weak",
  2: "Medium",
  3: "Good",
  4: "Strong",
}

const Editprofile = () => {
  const {
    current,
    handlecurrent,
    profile,
    isSuccess,
    kyc_status,
    mutate,
    handlechange,
    ischange,
    kycNumber,
    handleGoToKycPage,
    number,
    handleChangeNumber,
    refetch,
    resetPic,
    handleResetPic,
    reset,
    onChange,
    image,
    profilePic,
    handleSubmitUser,
    clearall,
    setConfirmDeleteDialog,
    confirmDeleteDialog,
    handleConfirmDeleteDialogClose,
    //****** React Hook Form ******/
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    //*****************************/
    formRules,
    statePwdValue,
    handleChangePWD,
  } = EditController()

  const { handleopenNumber, handlecloseNumber, openNumber, OTPsuccess, handleOTPSuccessClose, handleOTPSuccessOpen } =
    NumberDialogController()

  //************************ change password control ******************************/
  const {
    password: { validate },
  } = formRules

  const isMin = validate.minimum(statePwdValue)
  const isUpperCase = validate.isUpperCase(statePwdValue)
  const isLowerCase = validate.isLowerCase(statePwdValue ?? "")
  const isNumber = validate.containNumber(statePwdValue)

  const sumCheck = () => {
    var minCheck = isMin ? 1 : 0
    var upperCheck = isUpperCase ? 1 : 0
    var lowerCheck = isLowerCase ? 1 : 0
    var numCheck = isNumber ? 1 : 0
    return minCheck + upperCheck + lowerCheck + numCheck
  }

  
  const submitChangePwd = handleSubmit((val) => {
    const payload = {
      new_password: val.new_password,
    }
    console.log(payload)
  })
  //******************************************************************************/
  const URL = process.env.NEXT_PUBLIC_MEDIA_ENDPOINT
  
  return (
    <>
      <ImageUploading value={image} onChange={onChange} dataURLKey="data_url" acceptType={["jpg", "png"]}>
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          <>
            <Main>
              {confirmDeleteDialog && (
                <Success_Label
                  handleclose={handleConfirmDeleteDialogClose}
                  label={`Delete account email confirmation has been sent, please check your email`}
                />
              )}
              {/* {OTPsuccess && <Success_Label handleclose={handleOTPSuccessClose}  label={`Your mobile number ${number} is verified`} />} */}
              <NumberDialog
                open={openNumber}
                handleclose={handlecloseNumber}
                handleOTPSuccessOpen={handleOTPSuccessOpen}
                number={number}
                handleChangeNumber={handleChangeNumber}
                refetch={refetch}
                currentNumber={profile?.phone}
                kycNumber={kycNumber}
              />
              {/* {kyc_status == 3 && <Kyc_Check_Verify />} */}
              {kyc_status == 2 && <Kyc_Check_Inreview />}
              {(kyc_status == 1 || kyc_status == -1) && <Kyc_Check_Unverify handleOnclick={handleGoToKycPage} />}
              <MainDisplay>
                <Button_Display current={current} handlecurrent={handlecurrent} profileButton={profileButton} />
                <DividerStyled light orientation="vertical" variant="middle" flexItem />
                {isSuccess && current == "profile" && (
                  <ProfileBox>
                    <Text type={20} fontWeight={700} color="white">
                      Profile setting
                    </Text>
                    <Box
                      sx={{
                        marginTop: "8px",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "flex-start",
                        gap: "24px",
                      }}
                    >
                      <Text type={14} fontWeight={400} color="green040">
                        Your profile will displayed on activities
                      </Text>
                      <Text type={14} fontWeight={400} color="green040">
                        Profile photo
                      </Text>
                      {profile?.image !== "" && profile?.image !== null && !resetPic && (
                        <Box position="relative">
                          <ImageWrapper>
                            <Image src={`${URL}${profilePic}`} width="100px" height="100px" />
                          </ImageWrapper>
                          <Box
                            sx={{
                              position: "absolute",
                              left: "60px",
                              bottom: "-10px",
                            }}
                          >
                            <IconButton onClick={onImageUpload}>
                              <Image src="/icon_edit_photo.svg" alt="" width="40px" height="40px" />
                            </IconButton>
                          </Box>
                        </Box>
                      )}
                      {(profilePic == null || resetPic) && (
                        <Box position="relative">
                          <NameIcon>
                            <Text type="25" fontWeight={700}>
                              {profile?.email.slice(0, 1)}
                            </Text>
                          </NameIcon>
                          <Box
                            sx={{
                              position: "absolute",
                              left: "60px",
                              bottom: "-10px",
                            }}
                          >
                            <IconButton onClick={onImageUpload}>
                              <Image src="/icon_edit_photo.svg" alt="" width="40px" height="40px" />
                            </IconButton>
                          </Box>
                        </Box>
                      )}
                      <Text type={14} fontWeight={400} color="green040">
                        Personal Detail
                      </Text>
                    </Box>
                    <Box
                      sx={{
                        marginTop: "24px",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "flex-start",
                        gap: "16px",
                      }}
                    >
                      <Controller
                        name={"first_name"}
                        control={control}
                        rules={{ pattern: { value: /[a-zA-Z]+/g, message: "error" } }}
                        render={({ field, fieldState: { error }, formState: { errors } }) => {
                          const test = (e) => {
                            const val = e.target.value
                            field.onChange(val)
                            handlechange(val, "first_name")
                          }
                          return <InputTextField {...field} onChange={test} label="Name" variant="filled" />
                        }}
                        defaultValue={profile?.first_name}
                      />
                      <Controller
                        name={"last_name"}
                        control={control}
                        render={({ field, fieldState: { error }, formState: { errors } }) => {
                          const test = (e) => {
                            const val = e.target.value
                            field.onChange(val)
                            handlechange(val, "last_name")
                          }
                          return (
                            <InputTextField {...field} onChange={test} label="Last Name" id="lname" variant="filled" />
                          )
                        }}
                        defaultValue={profile?.last_name}
                      />
                      <Controller
                        name={"number"}
                        control={control}
                        render={({ field, fieldState: { error }, formState: { errors } }) => {
                          const test = (e) => {
                            const val = e.target.value
                            field.onChange(val)
                          }
                          return (
                            <InputTextFieldNumber
                              {...field}
                              // disabled={true}
                              number_kyc={kycNumber}
                              onClick={handleopenNumber}
                              // onChange={test}
                              label="Mobile Number"
                              id="mobile"
                              variant="filled"
                            />
                          )
                        }}
                        defaultValue={profile.phone?.replace("66", "0") || '-'}
                        // defaultValue={profile?.phone !== null ? (profile?.phone).replace("66", "0") : '-'}
                        // defaultValue={(profile?.phone).replace("66", "0")}
                      />
                      <Controller
                        name={"email"}
                        control={control}
                        render={({ field, fieldState: { error }, formState: { errors } }) => {
                          const test = (e) => {
                            const val = e.target.value
                            field.onChange(val)
                          }
                          return <InputTextField {...field} onChange={test} label="Email" variant="filled" />
                        }}
                        defaultValue={profile?.email}
                      />
                      <EmailAlert>
                        <Text type={12} fontWeight={700} color="error050">
                          Email has already been registered
                        </Text>
                      </EmailAlert>
                    </Box>
                  </ProfileBox>
                )}
                {
                  {
                    termAndCondition: <TermContainer />,
                    deleteAccount: <DelAccContainer setConfirmDeleteDialog={setConfirmDeleteDialog} />,
                    helpAndSupport: <HelpSupContainer />,
                    cPassword: (
                      <TermBox>
                        <Box display="flex" flexDirection="column" gap="8px">
                          <Text type={20} fontWeight={700} color="white">
                            Change password
                          </Text>
                          <Text type={14} fontWeight={400} color="green040">
                            Your phone number will be used to receive verification message
                          </Text>
                        </Box>
                        <Box width="333px" display="flex" flexDirection="column" gap="16px">
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
                            rules={formRules.newPassword}
                          />
                          <Box display="flex" alignItems={"center"} gap="6px">
                            <Text type={12} fontWeight={500} color="white" sx={{ width: "193px" }}>
                              Password strength :&nbsp;
                              <Text type={12} fontWeight={700} color="white">
                                {PwdStrength[sumCheck()]}
                              </Text>
                            </Text>
                            <Box height="8px" width="108px" display="flex" gap="4px">
                              <Box
                                width="25%"
                                height="100%"
                                sx={{
                                  background: clsx(
                                    { "#00FFB7": sumCheck() >= 3 },
                                    { "#CAE072": sumCheck() == 2 },
                                    { "#DC5D5E": sumCheck() == 1 },
                                    { "rgba(165, 218, 203, 0.25)": sumCheck() == 0 }
                                  ),
                                }}
                              ></Box>
                              <Box
                                width="25%"
                                height="100%"
                                sx={{
                                  background: clsx(
                                    { "#00FFB7": sumCheck() >= 3 },
                                    { "#CAE072": sumCheck() == 2 },
                                    { "rgba(165, 218, 203, 0.25)": sumCheck() < 2 }
                                  ),
                                }}
                              ></Box>
                              <Box
                                width="25%"
                                height="100%"
                                sx={{
                                  background: clsx(
                                    { "#00FFB7": sumCheck() >= 3 },
                                    { "rgba(165, 218, 203, 0.25)": sumCheck() < 3 }
                                  ),
                                }}
                              ></Box>
                              <Box
                                width="25%"
                                height="100%"
                                sx={{
                                  background: clsx(
                                    { "#00FFB7": sumCheck() == 4 },
                                    { "rgba(165, 218, 203, 0.25)": sumCheck() < 4 }
                                  ),
                                }}
                              ></Box>
                            </Box>
                            <HtmlTooltip
                              arrow
                              title={
                                <Box display="flex" flexDirection="column" gap="8px">
                                  <Text type={12} fontWeight={500} color="black">
                                    Password must include:
                                  </Text>
                                  <Box display="flex" gap="8px" alignItems="center">
                                    <Image
                                      src={`/change_password_${isMin ? "check" : "false"}_icon.svg`}
                                      alt=""
                                      width="20px"
                                      height="20px"
                                    />
                                    <Text type={12} fontWeight={isMin ? 500 : 600} color="black">
                                      8-20 Characters
                                    </Text>
                                  </Box>
                                  <Box display="flex" gap="8px" alignItems="center">
                                    <Image
                                      src={`/change_password_${isUpperCase ? "check" : "false"}_icon.svg`}
                                      alt=""
                                      width="20px"
                                      height="20px"
                                    />
                                    <Text type={12} fontWeight={isUpperCase ? 500 : 600} color="black">
                                      At least one capital letter
                                    </Text>
                                  </Box>
                                  <Box display="flex" gap="8px" alignItems="center">
                                    <Image
                                      src={`/change_password_${isLowerCase ? "check" : "false"}_icon.svg`}
                                      alt=""
                                      width="20px"
                                      height="20px"
                                    />
                                    <Text type={12} fontWeight={isLowerCase ? 500 : 600} color="black">
                                      At least one small letter
                                    </Text>
                                  </Box>
                                  <Box display="flex" gap="8px" alignItems="center">
                                    <Image
                                      src={`/change_password_${isNumber ? "check" : "false"}_icon.svg`}
                                      alt=""
                                      width="20px"
                                      height="20px"
                                    />
                                    <Text type={12} fontWeight={isNumber ? 500 : 600} color="black">
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
                            rules={formRules.confirm_password}
                          />
                        </Box>
                        <Box display="flex" width="333px" gap="8px">
                          <Button variant="contained_square_green" sx={{ width: "50%" }} onClick={ handleChangePWD}>
                            <Text color="white" type="16" fontWeight={600}>
                              Save
                            </Text>
                          </Button>
                          {/* <Button variant="outlined_square" sx={{ width: "50%" }} >
                            <Text color="white" type="16" fontWeight={600}>
                              Reset
                            </Text>
                          </Button> */}
                        </Box>
                      </TermBox>
                    ),
                  }[current]
                }
                {/* {isSuccess && <Profile_Display profile={data} />} */}
              </MainDisplay>
            </Main>
            {current == "profile" && (
              <FooterButton>
                <Button
                  variant="contained_square_green"
                  sx={{ width: "244px" }}
                  disabled={!ischange}
                  onClick={handleSubmitUser}
                >
                  <Text color="white" type="16" fontWeight={600}>
                    Save changes
                  </Text>
                </Button>
                {/* <Button variant="outlined_square" sx={{ width: "244px" }} onClick={fetchagain}>
          <Text color="white" type="16" fontWeight={600}>
            Refetch
          </Text>
        </Button> */}
                <Button variant="outlined_square" sx={{ width: "244px" }} onClick={() => clearall()}>
                  <Text color="white" type="16" fontWeight={600}>
                    Reset
                  </Text>
                </Button>
              </FooterButton>
            )}
          </>
        )}
      </ImageUploading>
    </>
  )
}

export default Editprofile
