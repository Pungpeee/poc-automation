import axios from "axios"
import Cookies from "js-cookie"

var token = Cookies.get("csrftoken")

export const requestWithCredential = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  headers: {
    "X-CSRFToken": token ?? null,
  },
})

export const requestAnonymous = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false,
})

export const requestNFTMobile = (access_token) =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_NFT_API_LOCAL_ENDPOINT,
    // baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${access_token}`,
    },
  })

export const requestNFTMobileAnnonymous = axios.create({
  baseURL:  process.env.NEXT_PUBLIC_NFT_API_LOCAL_ENDPOINT,
  // baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
})

export const requestNFTMobileBearer = (access_token) =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_NFT_API_LOCAL_ENDPOINT,
    // baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  })

// export const SSO_CheckAuth = (SSOKey) => {
//   return axios.create({
//     baseURL: 'https://sso-api-dev.vekin.co.th/api/access_key/sso/',
//     headers: {
//       accept: "application/json",
//       "Content-Type": "application/json",

//     },
//     withCredentials: false,
//   })
// }
