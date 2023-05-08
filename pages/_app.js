import { ThemeProvider } from "@mui/material"
import { carbonTheme } from "../theme/mui-theme"
import "../theme/font/font.css"
import "../styles/globals.css"
import "../styles/custom.css"
import "../styles/heroAnimation.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { AccountProvider } from "../contexts/account"
import App from "next/app"
import { Cookie } from "next-cookie"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AuthProvider } from "../contexts/auth"
import { getCheckIsAuthen } from "../apis/auth"
import { Layout } from "../layout"
import { MenuProvider } from "../contexts/menu"
import { useRouter } from "next/router"
import DownloadAppLayout from "../layout/DownloadAppLayout"
import DelLayout from "../layout/DelLayout"
import HomeLayout from "../layout/HomeLayout"
import PartnerLayout from "../layout/PartnerLayout"

const SPECIAL_LAYOUT = ["/download-app"]
const DEL_LAYOUT = ["/del_acc/[token]"]
const HOME_LAYOUT = ["/"]
const WALLET_LAYOUT = ["/wallet"]

const PARTNER_LAYOUT = ["/partner_with_us"]
const PROMOTION_LAYOUT = ["/app-landing"]
const REDEEM_GIFT_LAYOUT = ["/nft-redeem"]
const NFT_MARKET_LAYOUT = ["/nft-market"]
const NFT_BUY_LAYOUT = ["/nft-buy"]
const NFT_CLAIM_LAYOUT = ["/nft-claim"]
const NFT_PREMIUM_LAYOUT = ["/nft-premium/[store]"]

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
})
function MyApp({ Component, pageProps, cookie }) {
  const { pathname } = useRouter()
  const checkIsForMobile =
    REDEEM_GIFT_LAYOUT.includes(pathname) ||
    NFT_MARKET_LAYOUT.includes(pathname) ||
    PROMOTION_LAYOUT.includes(pathname) ||
    NFT_BUY_LAYOUT.includes(pathname) ||
    NFT_CLAIM_LAYOUT.includes(pathname) ||
    NFT_PREMIUM_LAYOUT.includes(pathname)
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={client}>
          <ThemeProvider theme={carbonTheme}>
            {checkIsForMobile ? (
              <MenuProvider>
                <Component {...pageProps} />
                {/* {REDEEM_GIFT_LAYOUT.includes(pathname) && <Component {...pageProps} />}
                {NFT_MARKET_LAYOUT.includes(pathname) && <Component {...pageProps} />}
                {PROMOTION_LAYOUT.includes(pathname) && <Component {...pageProps} />}
                {NFT_BUY_LAYOUT.includes(pathname) && <Component {...pageProps} />}
                {NFT_CLAIM_LAYOUT.includes(pathname) && <Component {...pageProps} />} */}
              </MenuProvider>
            ) : (
              <AuthProvider>
                <AccountProvider cookies={{ cookie }}>
                  <MenuProvider>
                    {SPECIAL_LAYOUT.includes(pathname) && (
                      <DownloadAppLayout>
                        <Component {...pageProps} />
                      </DownloadAppLayout>
                    )}
                    {DEL_LAYOUT.includes(pathname) && (
                      <DelLayout>
                        <Component {...pageProps} />
                      </DelLayout>
                    )}
                    {PARTNER_LAYOUT.includes(pathname) && (
                      <PartnerLayout>
                        <Component {...pageProps} />
                      </PartnerLayout>
                    )}
                    {/* {(WALLET_LAYOUT.includes(pathname)) && (
                  <HomeLayout>
                    <Component {...pageProps} />
                  </HomeLayout>
                )} */}
                    {!PARTNER_LAYOUT.includes(pathname) &&
                      !SPECIAL_LAYOUT.includes(pathname) &&
                      !DEL_LAYOUT.includes(pathname) && (
                        <Layout>
                          <Component {...pageProps} />
                        </Layout>
                      )}

                    {/* {(HOME_LAYOUT.includes(pathname) ||  WALLET_LAYOUT.includes(pathname)) && (
                  <HomeLayout>
                    <Component {...pageProps} />
                  </HomeLayout>
                )}
                {((!SPECIAL_LAYOUT.includes(pathname)) && (!WALLET_LAYOUT.includes(pathname)) && (!DEL_LAYOUT.includes(pathname)) && (!HOME_LAYOUT.includes(pathname))) && (
                   <Layout>
                   <Component {...pageProps} />
                 </Layout>
                )} */}

                    {/* {SPECIAL_LAYOUT.includes(pathname) ? (
                  <DownloadAppLayout>
                    <Component {...pageProps} />
                  </DownloadAppLayout>
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )} */}
                    {/* {DEL_LAYOUT.includes(pathname) ?(
                  <DelLayout>
                    <Component {...pageProps} />
                  </DelLayout>
                ):null
                } */}
                  </MenuProvider>
                </AccountProvider>
              </AuthProvider>
            )}
          </ThemeProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const cookies = new Cookie(appContext.ctx)
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const data = await getCheckIsAuthen()
  return { ...appProps, cookie: cookies.cookie.getAll() }
}

export default MyApp
