import { requestWithCredential } from "./client"

export const getCheckIsAuthen = async () => {
  const response = await requestWithCredential.get("/api/account/is-authenticated/")

  return response.data
}
