import { Box, styled } from "@mui/system"
import React from "react"
import { FormProvider } from "react-hook-form"
import { Button, Card, Text } from "../../components"
import { COLORS } from "../../theme"
import { toCurrecyFormat } from "../../utils/number"
import { useTopupPendingContainer } from "./controller"
import UploadForm from "./UploadForm"
import { useRouter } from "next/router"

const TopupPendingContainer = () => {
  const {
    data,
    isSuccess,
    isPaymentMode,
    uploadForm,
    profileData,
    profileIsSuccess,
    submitUpload,
    handleClickOpenPaymentMode,
    onCancelUploadSlipMode,
  } = useTopupPendingContainer()

  const router = useRouter()

  return isSuccess && profileIsSuccess ? (
    <>
      {!isPaymentMode ? (
        <>
          <Card sx={{ padding: { md: "60px", xs: "16px" } }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box pb="10px">
                <img width={200} src={process.env.NEXT_PUBLIC_MEDIA_ENDPOINT + data?.payment?.qrcode} alt="qrcode" />
              </Box>
              <Box pb="16px">
                <Text type="12" color="gray600">
                  User only bank account named
                </Text>
              </Box>

              <Box pb="16px">
                <Text type="18" fontWeight={700} color="primary">
                  {profileData.first_name} {profileData.last_name}
                </Text>
              </Box>
              <Box pb="38px">
                <Text type="18" fontWeight={700} color="black">
                  {profileData.first_name_thai} {profileData.last_name_thai}
                </Text>
              </Box>
            </Box>
            <Divider />
            <Content>
              <Box pb="18px" pt={"18px"} justifyContent="space-between" display="flex">
                <Text type="18" fontWeight={700} color="black">
                  AMOUNT
                </Text>
                <Box display="flex" gap="10px">
                  <Text type="18" fontWeight={700} color="primary">
                    {toCurrecyFormat(data?.thb_values ?? 0)}
                  </Text>
                  <Text type="18" color="black">
                    THB
                  </Text>
                </Box>
              </Box>
            </Content>
            <Divider />
            <Content>
              <Box pb="18px" pt="6px" justifyContent="space-between" display="flex">
                <Text type="14" color="gray600">
                  TRANSFER TO
                </Text>
                <Text type="14" color="gray600">
                  VEKIN (THAILAND) CO.,LTD
                </Text>
              </Box>
            </Content>
            <Box display={{ md: "flex", xs: "none" }} justifyContent="center" pt="60px" gap="32px">
              <Button variant="outlined_rounded" fullWidth onClick={() => router.push('/history')} sx={{ maxWidth: "250px" }}>
                <Text type={20} fontWeight={700} color="primary">
                  Back
                </Text>
              </Button>
              {/* <Button
                variant="contained_rounded"
                fullWidth
                onClick={handleClickOpenPaymentMode}
                sx={{ maxWidth: "250px" }}
              >
                <Text type={20} fontWeight={700} color="white">
                  Upload Slip
                </Text>
              </Button> */}
            </Box>
          </Card>
          <Box display={{ xs: "flex", md: "none" }} flexDirection="column" pt="28px" gap="18px">
            <Button variant="outlined_rounded" fullWidth onClick={() => router.push('/history')} >
              <Text type={20} fontWeight={700} color="primary">
                Back
              </Text>
            </Button>
            {/* <Button variant="contained_rounded" fullWidth onClick={handleClickOpenPaymentMode}>
              <Text type={20} fontWeight={700} color="white">
                Upload Slip
              </Text>
            </Button> */}
          </Box>
        </>
      ) : (
        <FormProvider {...uploadForm}>
          <form onSubmit={submitUpload}>
            <Card sx={{ padding: { md: "60px", xs: "16px" } }}>
              <Box pb="40px">
                <UploadForm thbAmount={data?.thb_values} />
              </Box>
              <Box display={{ md: "flex", xs: "none" }} justifyContent="center" pt="60px" gap="32px">
                <Button
                  variant="outlined_rounded"
                  fullWidth
                  onClick={onCancelUploadSlipMode}
                  sx={{ maxWidth: "250px" }}
                >
                  <Text type={20} fontWeight={700} color="primary">
                    CANCEL
                  </Text>
                </Button>
                <Button type="submit" variant="contained_rounded" fullWidth sx={{ maxWidth: "250px" }}>
                  <Text type={20} fontWeight={700} color="white">
                    Inform Payment
                  </Text>
                </Button>
              </Box>
            </Card>
            <Box display={{ xs: "flex", md: "none" }} flexDirection="column" pt="28px" gap="18px">
              <Button variant="outlined_rounded" fullWidth onClick={onCancelUploadSlipMode}>
                <Text type={20} fontWeight={700} color="primary">
                  CANCEL
                </Text>
              </Button>
              <Button type="submit" variant="contained_rounded" fullWidth>
                <Text type={20} fontWeight={700} color="white">
                  Inform Payment
                </Text>
              </Button>
            </Box>
          </form>
        </FormProvider>
      )}
    </>
  ) : null
}

export default TopupPendingContainer

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  background: COLORS.GRAY200,
})

const Content = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    padding: "0px 40px",
  },
}))
