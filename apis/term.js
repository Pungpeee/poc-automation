import { requestAnonymous } from "./client"

export const getTermCondition = async (params) => {
  const response = await requestAnonymous.get("/api/term/", { params })

  return response.data
}
