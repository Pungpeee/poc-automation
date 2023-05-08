import { useQuery } from "react-query"
import { accountApi } from "../../apis"

export const useQueryBalance = ({ options }) => {
  const query = useQuery("balance-user", accountApi.getAccountBalance, options)

  return query
}

export const useQueryprofile = ({ options }) => {
  try {
    const query = useQuery("user-profile", accountApi.getAccountProfile, options)

    return query
  } catch (error) {
    return false
  }
}
export const useQueryCarbonAcitivity = ({ options }) => {
  const query = useQuery("carbon-acivity", accountApi.getCarbonActivity, options)
  return query
}

export const useQueryCarbonBalance = ({ options }) => {
  const query = useQuery('carbon-balance', accountApi.getCarbonBalance, options)
  return query
}

export const useQueryRank = ({ payload, options }) => {
  const query = useQuery(
    ["ranking", payload],
    () => {
      return accountApi.getRank(payload.type)
    },
    options
  )
  return query
}
export const useQueryMyRank = ({ options }) => {
  const query = useQuery("myRanking", accountApi.getMyRank, options)
  return query
}

export const useVerifyOtp = ({ payload, options }) => {
  const query = useQuery(
    ["Verify OTP", payload],
    () => {
      return accountApi.verifyOTP(payload.otp)
    },
    options
  )
  return query
}

export const useQueryCarbonOverall = (options) =>{
  const query = useQuery("get_carbon_overall",accountApi.getActivityCarbonOverall,options)
  return query
}
