import { requestWithCredential } from "./client"

export const getTransactions = async () => {
  const response = await requestWithCredential.get("/api/transaction")

  return response.data
}

// {
//   "token_name": "string",
//   "thb_amount": 0,
//   "coin_amount": 0,
//   "is_own_account": true,
//   "is_not_reuse": true,
//   "is_not_overtime": true
// }
export const topUpByCoin = async (data) => {
  const response = await requestWithCredential.post("/api/transaction/top-up/", data)

  return response.data
}

export const getTopupDetail = async (id) => {
  const response = await requestWithCredential.get(`/api/transaction/top-up/${id}/`)

  return response.data
}

export const getTopupID = async (id) => {
  const response = await requestWithCredential.get(`/api/transaction/?account=${id}`)

  return response.data
}

export const cancelTopup = async (id, data) => {
  const response = await requestWithCredential.patch(`/api/transaction/${id}/`, data)

  return response.data
}
export const swapCoin = async (data) => {
  const response = await requestWithCredential.post(`/api/transaction/swap/`, data)

  return response.data
}
