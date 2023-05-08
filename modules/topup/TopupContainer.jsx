import { Box, Container, styled } from "@mui/material"
import toUpper from "lodash/toUpper"
import { useRouter } from "next/router"
import { Button, FieldSet, Text } from "../../components"
import Card from "../../components/Card"
import { COLORS } from "../../theme"
import { useTopupContainer } from "./controller"
import { ConfirmTopupDialog, NotVerifyDialog, PendingVerifyDialog } from "./view"

const TopupContainer = () => {
  const {
    tokenForm,
    rateToken,
    rateThb,
    feeAmount,
    open,
    isAmountError,
    profileData,
    isError,
    feePercent,
    openNotVerify,
    openPendingVerify,
    handleOpenConfirm,
    handleCloseConfirm,
    handleChangeThb,
    handleChangeToken,
  } = useTopupContainer()

  const isDisabledConfirm = Number(tokenForm.thbAmount) < 1 || Number(tokenForm.tokenAmount) <= 0
  const router = useRouter()

  if (isError) {
    return null
  }
  return (
    <Wrapper>
      <NotVerifyDialog open={openNotVerify} />
      <PendingVerifyDialog open={openPendingVerify} />
      <ConfirmTopupDialog
        thbAmount={tokenForm.thbAmount}
        tokenAmount={tokenForm.tokenAmount}
        open={open}
        handleCloseConfirm={handleCloseConfirm}
      />
      <Box pb="16px">
        <Text
          color="primary"
          type="18"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            wordBreak: "break-all",
            "-webkit-line-clamp": "1",
            "text-overflow": "ellipsis",
            "-webkit-box-orient": "vertical",
          }}
          fontWeight={700}
        >
          {profileData?.public_key}
        </Text>
      </Box>
      <Box pb="12px">
        <Text color="black" type="48" fontWeight={700}>
          TOP-UP
        </Text>
      </Box>
      <Box pb="16px">
        <Text color="primary" type="14" fontWeight={700}>
          Mobile Banking (QR Code) Top-Up process will be completed within 24 hours
        </Text>
      </Box>
      <Card
        sx={{
          padding: {
            xs: "16px",
            md: "32px 80px",
          },
        }}
      >
        <Box pb="10px">
          <Text type="14" color="black" fontWeight={500}>
            TOP UP YOUR WALLET
          </Text>
        </Box>

        <Box display="flex" position="relative" gap="32px" pb="32px" flexDirection="column" width="100%">
          <Box
            position="relative"
            width={{
              xs: "100%",
              md: "calc(100% - 40px)",
            }}
          >
            <FieldSet
              sx={{
                "& input": {
                  textAlign: "right",
                  paddingRight: "64px !important",
                },
                "&.Mui-error": {
                  "& .MuiInput-root": {
                    "& .MuiInput-input": {
                      color: COLORS.SECONDARY_DANGER,
                    },
                  },
                },
              }}
              error={isAmountError}
              endAdornment={
                <Box position="absolute" right={{ xs: "18px" }} top="34px">
                  <Text color={isAmountError ? "red" : "black"}> BAHT</Text>
                </Box>
              }
              onChange={(e) => handleChangeThb(e.target.value)}
              value={tokenForm.thbAmount}
              label="AMOUNT SPEND"
              fullWidth
            />
            {isAmountError && (
              <Text type="12" color="red">
                Maximum 1 Million Baht
              </Text>
            )}
          </Box>
          <Box position="absolute" right="0px" bottom="calc(50% - 24px)">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_370_3313)">
                <rect x="2" width="40" height="40" rx="16" fill="#1FA37C" />
                <path
                  d="M10.7311 15.3667C10.6083 15.4811 10.5098 15.6191 10.4415 15.7724C10.3731 15.9258 10.3364 16.0913 10.3334 16.2591C10.3305 16.427 10.3614 16.5937 10.4242 16.7493C10.4871 16.905 10.5807 17.0464 10.6994 17.1651C10.8181 17.2838 10.9595 17.3773 11.1151 17.4402C11.2707 17.5031 11.4375 17.5339 11.6053 17.531C11.7731 17.528 11.9387 17.4913 12.092 17.423C12.2453 17.3546 12.3833 17.2561 12.4978 17.1333L15.3644 14.2667L15.3644 28.75C15.3644 29.0815 15.4961 29.3995 15.7305 29.6339C15.965 29.8683 16.2829 30 16.6144 30C16.946 30 17.2639 29.8683 17.4983 29.6339C17.7327 29.3995 17.8644 29.0815 17.8644 28.75L17.8644 14.2667L20.7311 17.1333C20.8455 17.2561 20.9835 17.3546 21.1369 17.423C21.2902 17.4913 21.4557 17.528 21.6236 17.531C21.7914 17.5339 21.9581 17.5031 22.1138 17.4402C22.2694 17.3773 22.4108 17.2838 22.5295 17.1651C22.6482 17.0464 22.7418 16.905 22.8046 16.7493C22.8675 16.5937 22.8984 16.427 22.8954 16.2591C22.8925 16.0913 22.8557 15.9258 22.7874 15.7724C22.7191 15.6191 22.6206 15.4811 22.4978 15.3667L17.4978 10.3667C17.2634 10.1326 16.9457 10.0011 16.6144 10.0011C16.2832 10.0011 15.9655 10.1326 15.7311 10.3667L10.7311 15.3667Z"
                  fill="white"
                />
                <path
                  d="M25.06 22.8658C24.9456 22.743 24.8076 22.6445 24.6543 22.5762C24.5009 22.5079 24.3354 22.4711 24.1676 22.4682C23.9997 22.4652 23.833 22.4961 23.6774 22.5589C23.5217 22.6218 23.3803 22.7154 23.2616 22.8341C23.1429 22.9528 23.0494 23.0942 22.9865 23.2498C22.9236 23.4055 22.8927 23.5722 22.8957 23.74C22.8987 23.9079 22.9354 24.0734 23.0037 24.2267C23.072 24.38 23.1705 24.518 23.2934 24.6325L28.2934 29.6325C28.5277 29.8666 28.8454 29.998 29.1767 29.998C29.5079 29.998 29.8256 29.8666 30.06 29.6325L35.06 24.6325C35.2808 24.3955 35.401 24.0821 35.3953 23.7583C35.3896 23.4344 35.2584 23.1255 35.0294 22.8964C34.8004 22.6674 34.4914 22.5362 34.1676 22.5305C33.8437 22.5248 33.5303 22.645 33.2934 22.8658L30.4267 25.7325L30.4267 11.2491C30.4267 10.9176 30.295 10.5997 30.0606 10.3653C29.8262 10.1308 29.5082 9.99915 29.1767 9.99915C28.8452 9.99915 28.5272 10.1308 28.2928 10.3653C28.0584 10.5997 27.9267 10.9176 27.9267 11.2491L27.9267 25.7325L25.06 22.8658Z"
                  fill="white"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_370_3313"
                  x="0"
                  y="0"
                  width="48"
                  height="48"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="2" dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_370_3313" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_370_3313" result="shape" />
                </filter>
              </defs>
            </svg>
          </Box>

          <Box
            position="relative"
            width={{
              xs: "100%",
              md: "calc(100% - 40px)",
            }}
          >
            <FieldSet
              sx={{
                "& input": {
                  textAlign: "right",
                  paddingRight: "64px !important",
                },
                "&.Mui-error": {
                  "& .MuiInput-root": {
                    "& .MuiInput-input": {
                      color: COLORS.SECONDARY_DANGER,
                    },
                  },
                },
              }}
              endAdornment={
                <Box position="absolute" right={{ xs: "18px" }} top="34px">
                  <Text color={isAmountError ? "red" : "black"}> {toUpper(router.query.coinId)}</Text>
                </Box>
              }
              onChange={(e) => handleChangeToken(e.target.value)}
              value={tokenForm.tokenAmount}
              label={`TOTAL RECIEVED`}
              fullWidth
            />
          </Box>
        </Box>
        <Box pb="48px">
          <Card
            sx={{
              background: "#E8E8E8",
              borderRadius: "10px",
              padding: {
                xs: "16px 24px",
                md: "10px 42px",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Text type="14" color="gray666" fontWeight={500}>
              {rateToken} {toUpper(router.query.coinId)} = {rateThb} THB
            </Text>
            <Text type="14" color="primary" fontWeight={500} as="div">
              {feePercent > 0 ? `Fee = ${feePercent}%` : "Minimum Fee = 0.10 THB"}
            </Text>
          </Card>
        </Box>
      </Card>

      <Text type="16" color="primary" fontWeight={500}>
        Please read and follow the top-up rules:
      </Text>
      <OrderRule>
        <li>Use your own bank account (TrueMoney, Paotang, and E-wallet are NOT supported)</li>
        <li>DON’T re-use this QR Code</li>
        <li>DON’T transfer during 23:30 - 00.10 (GMT +7)</li>
      </OrderRule>
      <Box maxWidth="276px" margin="auto">
        <Button disabled={isDisabledConfirm || isAmountError} onClick={handleOpenConfirm} fullWidth variant="contained">
          Confirm
        </Button>
      </Box>
    </Wrapper>
  )
}

export default TopupContainer

const Wrapper = styled(Container)(({ theme }) => ({
  paddingTop: "60px",
  [theme.breakpoints.down("md")]: {
    padding: "30px",
  },

  maxWidth: "700px",
  margin: "auto",
}))

const OrderRule = styled("ol")({
  "& li": {
    fontSize: "16px",
    fontFamily: "Prompt",
    fontWeight: 400,
    lineHeight: "24px",
  },
})
