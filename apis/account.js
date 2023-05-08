import { requestWithCredential, requestAnonymous } from "./client"

export const getAccountBalance = async () => {
  const response = await requestWithCredential.get("/api/account/balance/")
  return response.data
}

export const getAccountProfile = async () => {
  const response = await requestWithCredential.get("/api/account/profile/")
  return response.data
}

export const updateProfile = async (data) => {
  const response = await requestWithCredential.patch("/api/account/profile/", data)
  return response
}

export const uploadPhotoKyc = async (data) => {
  const response = await requestWithCredential.post("/api/account/profile/photo_KYC/", data)
  return response
}

export const getCarbonActivity = async () => {
  const response = await requestWithCredential.get("/api/activity/summary/")
  return response.data
}

export const getCarbonBalance = async () => {
  const response = await requestWithCredential.get("/api/activity/carbonBalance/")
  return response.data
}

export const getRank = async (type) => {
  const response = await requestWithCredential.get(`/api/activity/rank/?type=${type}&coin=`)
  return response.data
}

export const getMyRank = async () => {
  const response = await requestWithCredential.get("/api/activity/rank/myRank/")
  return response.data
}

export const verifyOTP = async (otp) => {
  const response = await requestWithCredential.get(`/api/account/verify-mobile-OTP/OTPVerification/${otp}/`)
  return response.data
}

export const changePWD = async (data) => {
  const response = await requestWithCredential.post("/api/account/change/password/", data)
  return response.data
}

export const sendEmailPartner = async (data) => {
  const response = await requestAnonymous.post("/api/mailer/contact/", data)
  return response.data
}

export const getActivityCarbonOverall = async (data)=>{
  const response = await requestAnonymous.get("/api/activity/overall/carbon/")
  return response.data
}