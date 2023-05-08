import { Box } from "@mui/material"
import Image from "next/image"
import React from "react"
import { Text } from "../components"
import GGImage from "../public/download-app/ggplay.png"
import AppstoreImage from "../public/download-app/appstore.png"

import GGMBImage from "../public/download-app/ggplaymb.png"
import AppstoreMBImage from "../public/download-app/appstoremb.png"

const DownloadAppPage = () => {
  return (
    <>
      <Box position="relative" sx={{ display: { xs: "none", md: "block" } }}>
        <Box mb="47px">
          <Text textAlign="center" type="20" fontWeight={700} color="yellow" as="div">
            DOWNLOAD APP
          </Text>
          <Text textAlign="center" opacity="0.75" type="32" fontWeight={700} color="white" as="div">
            LET YOU CONNECT TO CARBON COIN
          </Text>
          <Text textAlign="center" type="40" fontWeight={700} color="white" as="div">
            CARBON WALLET APP
          </Text>
        </Box>
        <Box display="flex" gap="40px" justifyContent="center">
          <Box sx={{ cursor: "pointer" }}>
            <Image
              src={GGImage}
              alt="ggplayqrcode"
              onClick={() =>
                window.location.assign("https://play.google.com/store/apps/details?id=com.vekin.carbon_wallet")
              }
            />
          </Box>
          <Box sx={{ cursor: "pointer" }}>
            <Image
              onClick={() => window.location.assign("https://apps.apple.com/th/app/carbon-wallet/id1614214805")}
              src={AppstoreImage}
              alt="ggplayqrcode"
            />
          </Box>
        </Box>
      </Box>

      <Box position="relative" sx={{ display: { xs: "block", md: "none" } }}>
        <Box mb="47px">
          <Text textAlign="center" type="20" fontWeight={700} color="yellow" as="div">
            DOWNLOAD APP
          </Text>
          <Text textAlign="center" opacity="0.75" type="32" fontWeight={700} color="white" as="div">
            LET YOU CONNECT TO CARBON COIN
          </Text>
          <Text textAlign="center" type="40" fontWeight={700} color="white" as="div">
            CARBON
          </Text>
          <Box position="relative" top="-12px">
            <Text textAlign="center" type="40" fontWeight={700} color="white" as="div">
              WALLET APP
            </Text>
          </Box>
        </Box>
        <Box display="flex" maxWidth={200} margin="auto" gap="34px" flexDirection="column">
          <Image
            src={GGMBImage}
            onClick={() =>
              window.location.assign("https://play.google.com/store/apps/details?id=com.vekin.carbon_wallet")
            }
            alt="ggplayqrcode"
          />
          <Image
            onClick={() => window.location.assign("https://apps.apple.com/th/app/carbon-wallet/id1614214805")}
            src={AppstoreMBImage}
            alt="ggplayqrcode"
          />
        </Box>
      </Box>
    </>
  )
}

export default DownloadAppPage
