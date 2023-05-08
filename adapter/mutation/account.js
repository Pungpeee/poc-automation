import { useMutation } from "react-query"
import { accountApi, transactionApi } from "../../apis"

export const useMutationUpdateProfileKyc = (options) => {
  const mutate = useMutation("updateUser", accountApi.updateProfile, options)

  return mutate
}

export const useMutationUploadPhotoKyc = ({ options }) => {
  const mutate = useMutation("upload-photo-kyc", accountApi.uploadPhotoKyc, options)

  return mutate
}

export const useMutationTopupCoin = (options) => {
  const mutate = useMutation("topup-by-coin", transactionApi.topUpByCoin, options)

  return mutate
}

export const useMutationChangePWD = (options) => {
  const mutate = useMutation("change-PWD", accountApi.changePWD, options)
  return mutate
}

export const useMutationSendEmailPartner = (options) =>{
  const mutate = useMutation("send_email",accountApi.sendEmailPartner,options)
  return mutate
}
